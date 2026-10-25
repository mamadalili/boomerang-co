<?php
declare(strict_types=1);

/* PHP 8.4 / local POSIX filesystem. No public environment/query test switches. */
function bi_json(mixed $value): string
{
    return json_encode($value, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function bi_inside(string $path, string $root): bool
{
    return $path === $root || str_starts_with($path, rtrim($root, '/\\') . DIRECTORY_SEPARATOR);
}

function bi_config(array $server): array
{
    $fixture = PHP_SAPI === 'cli' && getenv('BOOMERANG_INQUIRY_TEST') === '1';
    $path = $fixture ? getenv('BOOMERANG_INQUIRY_CONFIG') : '/home3/jjluemsp/boomerang-private/config.json';
    $documentRoot = $server['DOCUMENT_ROOT'] ?? null;
    $root = is_string($documentRoot) && $documentRoot !== '' ? realpath($documentRoot) : false;
    $file = is_string($path) ? realpath($path) : false;
    if (!$root || !$file || bi_inside($file, $root) || is_link($path) || !is_file($file)
        || filesize($file) > 1048576) { throw new RuntimeException('configuration'); }
    $cfg = json_decode((string)file_get_contents($file), true, 32, JSON_THROW_ON_ERROR);
    if (!is_array($cfg) || ($cfg['mode'] ?? '') !== ($fixture ? 'test' : 'production')) {
        throw new RuntimeException('configuration');
    }
    $storage = is_string($cfg['storage_dir'] ?? null) ? realpath($cfg['storage_dir']) : false;
    if (!$storage || !is_dir($storage) || !is_writable($storage) || bi_inside($storage, $root)
        || is_link($cfg['storage_dir']) || bi_inside($root, $storage)) { throw new RuntimeException('storage'); }
    if (!is_string($cfg['hash_key'] ?? null) || strlen($cfg['hash_key']) < 32
        || !is_array($cfg['locales'] ?? null) || !array_is_list($cfg['locales']) || !$cfg['locales']
        || array_diff($cfg['locales'], ['fa','en','ar','ru'])
        || !is_array($cfg['products'] ?? null) || !array_is_list($cfg['products']) || !$cfg['products']) {
        throw new RuntimeException('configuration');
    }
    $notification = $cfg['notification'] ?? [];
    if (!is_array($notification) || !is_bool($notification['enabled'] ?? null)
        || ($notification['recipient'] ?? '') !== 'info@boomerang-co.com'
        || ($fixture && $notification['enabled'])) { throw new RuntimeException('notification'); }
    $defaults = ['message_chars'=>1200, 'components'=>20, 'field_chars'=>200,
        'requests_per_window'=>5, 'rate_window_seconds'=>600, 'duplicate_window_seconds'=>60,
        'daily_bytes'=>2097152, 'storage_bytes'=>33554432, 'daily_events'=>10000,
        'min_free_bytes'=>16777216];
    $bounds = ['message_chars'=>[1,1200], 'components'=>[1,20], 'field_chars'=>[1,200],
        'requests_per_window'=>[1,20], 'rate_window_seconds'=>[1,86400], 'duplicate_window_seconds'=>[1,86400],
        'daily_bytes'=>[32768,2097152], 'storage_bytes'=>[32768,33554432], 'daily_events'=>[1,10000],
        'min_free_bytes'=>[16777216,1073741824]];
    $limits = $cfg['limits'] ?? [];
    if (!is_array($limits) || array_diff(array_keys($limits), array_keys($defaults))) { throw new RuntimeException('limits'); }
    foreach ($defaults as $key=>$default) {
        $v = $limits[$key] ?? $default;
        if (!is_int($v) || $v < $bounds[$key][0] || $v > $bounds[$key][1]) { throw new RuntimeException('limits'); }
        $limits[$key] = $v;
    }
    $products = [];
    foreach ($cfg['products'] as $p) {
        if (!is_array($p) || !is_string($p['id'] ?? null) || !preg_match('/^[A-Za-z0-9_-]{1,200}$/D', $p['id'])
            || isset($products[$p['id']]) || !is_string($p['slug'] ?? null)
            || !preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/D', $p['slug']) || strlen($p['slug']) > 200
            || !is_array($p['names'] ?? null) || !$p['names'] || !is_array($p['components'] ?? null)
            || !array_is_list($p['components'])) { throw new RuntimeException('products'); }
        foreach ($p['names'] as $locale=>$name) {
            if (!in_array($locale, ['fa','en','ar','ru'], true) || !is_string($name) || $name === ''
                || !bi_text($name, 200)) { throw new RuntimeException('products'); }
        }
        foreach ($p['components'] as $id) {
            if (!is_string($id) || $id === '' || !bi_text($id, 200)) { throw new RuntimeException('products'); }
        }
        foreach ($products as $previous) {
            if ($p['slug'] === $previous['slug']) { throw new RuntimeException('products'); }
        }
        $products[$p['id']] = $p;
    }
    $cfg['storage_dir'] = $storage;
    $cfg['limits'] = $limits;
    $cfg['product_map'] = $products;
    return $cfg;
}

function bi_text(string $value, int $max): bool
{
    // Count Unicode characters without requiring mbstring; reject controls rather than truncate.
    return preg_match('//u', $value) === 1 && !preg_match('/[\x00-\x1f\x7f]/', $value)
        && preg_match_all('/./us', $value) <= $max;
}

function bi_phone(string $value): ?string
{
    $value = strtr(trim($value), array_combine(
        preg_split('//u', '۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩', -1, PREG_SPLIT_NO_EMPTY),
        str_split('01234567890123456789')));
    if ($value === '' || strlen($value) > 32 || !preg_match('/^\+?[0-9 ().-]+$/D', $value)) { return null; }
    $value = str_replace([' ', '(', ')', '.', '-'], '', $value);
    return preg_match('/^\+?[0-9]{7,15}$/D', $value) ? $value : null;
}

function bi_validate(array $p, array $cfg): array
{
    $allowed = ['product_id','product_name','language','selected_components','quantity','variant_color',
        'page_url','request_type','reply_email','reply_phone','message','company_website', 'components'];
    if (array_diff(array_keys($p), $allowed)) { throw new InvalidArgumentException('unknown_fields'); }
    $l = $cfg['limits'];
    foreach ($p as $key=>$value) {
        if (in_array($key, ['quantity','selected_components'], true)) { continue; }
        $max = match ($key) { 'message'=> $l['message_chars'], 'page_url'=>500, 'reply_email'=>254,
            'reply_phone'=>32, default=>$l['field_chars'] };
        // Message may contain line breaks; all other text forbids header/control injection.
        $checked = $key === 'message' && is_string($value) ? str_replace(["\r", "\n", "\t"], ' ', $value) : $value;
        if (!is_string($checked) || !bi_text($checked, $max)) { throw new InvalidArgumentException('invalid_field'); }
    }
    $locale = $p['language'] ?? '';
    $id = $p['product_id'] ?? '';
    $product = $cfg['product_map'][$id] ?? null;
    $quantity = $p['quantity'] ?? null;
    if (!in_array($locale, $cfg['locales'], true) || ($id !== '' && !$product)
        || !(is_int($quantity) || is_float($quantity)) || $quantity < 1 || $quantity > 1000 || floor($quantity) !== (float)$quantity
        || !in_array($p['request_type'] ?? '', ['price_availability','project','export','technical'], true)
        || trim($p['company_website'] ?? '') !== '') { throw new InvalidArgumentException('invalid_fields'); }
    $url = $p['page_url'] ?? '';
    $path = $product ? '/'.$locale.'/products/'.$product['slug'].'/' : '/'.$locale.'/contact/';
    if (!in_array($url, ['https://www.boomerang-co.com'.$path, 'https://boomerang-co.com'.$path], true)) {
        throw new InvalidArgumentException('invalid_page_url');
    }
    $email = strtolower(trim($p['reply_email'] ?? ''));
    $rawPhone = trim($p['reply_phone'] ?? '');
    $phone = bi_phone($rawPhone);
    if (($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) || ($rawPhone !== '' && $phone === null)
        || ($email === '' && $phone === null)) { throw new InvalidArgumentException('invalid_contact'); }
    $components = $p['selected_components'] ?? [];
    if (!is_array($components) || !array_is_list($components) || count($components) > $l['components']) {
        throw new InvalidArgumentException('invalid_components');
    }
    foreach ($components as $component) {
        if (!is_string($component) || !bi_text($component, $l['field_chars'])
            || !in_array($component, $product['components'] ?? [], true)) { throw new InvalidArgumentException('invalid_component'); }
    }
    // FormData retains the last checked checkbox named "components"; validate but do not store it.
    if (isset($p['components']) && !in_array($p['components'], $components, true)) { throw new InvalidArgumentException('invalid_component'); }
    if (count(array_unique($components)) !== count($components)) { throw new InvalidArgumentException('invalid_components'); }
    $color = trim($p['variant_color'] ?? '');
    return ['product_id'=>$product['id'] ?? null,
        'product_name'=>$product ? ($product['names'][$locale] ?? $product['names']['en'] ?? $product['names']['fa'] ?? $product['id']) : 'General catalogue inquiry',
        'locale'=>$locale, 'selected_components'=>$components, 'quantity'=>(int)$quantity,
        'variant_color'=>$color === '' ? null : $color,
        'page_url'=>'https://www.boomerang-co.com'.$path, 'request_type'=>$p['request_type'],
        'reply_email'=>$email === '' ? null : $email, 'reply_phone'=>$phone,
        'message'=>trim($p['message'] ?? '') ?: null, 'status'=>'new', 'spam_flag'=>false];
}

function bi_failure(int $status, string $error): array
{
    return [$status, ['success'=>false, 'inquiry_id'=>null, 'message'=>'Inquiry could not be recorded.', 'error'=>$error]];
}

function bi_atomic(string $file, string $bytes): void
{
    if (is_link($file)) { throw new RuntimeException('storage'); }
    $temp = $file.'.'.bin2hex(random_bytes(8)).'.tmp';
    $h = fopen($temp, 'xb');
    if (!$h) { throw new RuntimeException('storage'); }
    try {
        if (!chmod($temp, 0600)) { throw new RuntimeException('storage'); }
        $offset = 0;
        while ($offset < strlen($bytes)) {
            $n = fwrite($h, substr($bytes, $offset));
            if ($n === false || $n === 0) { throw new RuntimeException('storage'); }
            $offset += $n;
        }
        if (!fflush($h) || !fsync($h)) { throw new RuntimeException('storage'); }
        fclose($h); $h = null;
        if (!rename($temp, $file)) { throw new RuntimeException('storage'); }
    } finally {
        if (is_resource($h)) { fclose($h); }
        if (is_file($temp)) { unlink($temp); }
    }
}

function bi_quota(array $cfg, int $oldSize, int $newSize): void
{
    $l = $cfg['limits']; $total = 0; $count = 0;
    foreach (new DirectoryIterator($cfg['storage_dir']) as $file) {
        if ($file->isDot()) { continue; }
        if (++$count > 512 || $file->isLink() || !$file->isFile()) { throw new RuntimeException('storage'); }
        $total += $file->getSize();
    }
    // Some shared hosts disable disk_free_space. Keep the hard journal quota
    // and atomic checked writes; only the optional free-space reserve is unavailable.
    $free = function_exists('disk_free_space') ? disk_free_space($cfg['storage_dir']) : null;
    if ($newSize > $l['daily_bytes'] || $total - $oldSize + $newSize + 4096 > $l['storage_bytes']
        || $free === false || ($free !== null && $free < $l['min_free_bytes'] + $newSize + 4096)) { throw new RuntimeException('quota'); }
}

function bi_submit(array $p, array $server, array $cfg): array
{
    $dir = $cfg['storage_dir']; $lockPath = $dir.'/inquiry.lock';
    if (is_link($lockPath)) { throw new RuntimeException('storage'); }
    $lock = fopen($lockPath, 'c+b');
    if (!$lock) { throw new RuntimeException('storage'); }
    try {
        if (!chmod($lockPath, 0600)) { throw new RuntimeException('storage'); }
        $deadline = hrtime(true) + 2000000000;
        while (!flock($lock, LOCK_EX | LOCK_NB)) {
            if (hrtime(true) >= $deadline) { throw new RuntimeException('busy'); }
            usleep(20000);
        }
        $now = time(); $l = $cfg['limits']; $today = gmdate('Y-m-d', $now);
        $path = $dir.'/'.$today.'.ndjson'; $daily = []; $recent = []; $bytes = '';
        // Both windows are <= one day: scanning today and yesterday covers UTC rollover.
        foreach ([$today, gmdate('Y-m-d', $now-86400)] as $day) {
            $file = $dir.'/'.$day.'.ndjson';
            if (!file_exists($file)) { continue; }
            if (is_link($file) || !is_file($file) || filesize($file) > $l['daily_bytes']) { throw new RuntimeException('storage'); }
            $raw = file_get_contents($file);
            if ($raw === false || strlen($raw) > $l['daily_bytes'] || ($raw !== '' && !str_ends_with($raw, "\n"))) { throw new RuntimeException('storage'); }
            $events = [];
            foreach (explode("\n", rtrim($raw, "\n")) as $line) {
                if ($line === '') { continue; }
                $e = json_decode($line, true, 32, JSON_THROW_ON_ERROR);
                if (!is_array($e) || ($e['kind'] ?? '') !== 'attempt' || !is_int($e['ts'] ?? null)
                    || !is_string($e['client'] ?? null)) { throw new RuntimeException('storage'); }
                $events[] = $e;
                if (count($events) > $l['daily_events']) { throw new RuntimeException('quota'); }
                if ($e['ts'] > $now - max($l['rate_window_seconds'], $l['duplicate_window_seconds'])) { $recent[] = $e; }
            }
            if ($day === $today) { $daily = $events; $bytes = $raw; }
        }
        $ip = $server['REMOTE_ADDR'] ?? '';
        if (!is_string($ip) || !filter_var($ip, FILTER_VALIDATE_IP)) { throw new RuntimeException('client'); }
        $client = hash_hmac('sha256', $ip, $cfg['hash_key']);
        $attempts = 0;
        foreach ($recent as $e) {
            if ($e['client'] === $client && $e['ts'] > $now-$l['rate_window_seconds']) { $attempts++; }
        }
        if ($attempts >= $l['requests_per_window']) { return bi_failure(429, 'rate_limited'); }
        if (count($daily) >= $l['daily_events']) { throw new RuntimeException('quota'); }
        $event = ['kind'=>'attempt', 'ts'=>$now, 'client'=>$client];
        try {
            $value = bi_validate($p, $cfg);
            $fingerprint = hash_hmac('sha256', bi_json([$client, $value['reply_email'] ?? $value['reply_phone'],
                $value['product_id'], $value['variant_color'], $value['request_type']]), $cfg['hash_key']);
            $duplicate = false;
            foreach ($recent as $e) {
                if (($e['fingerprint'] ?? '') === $fingerprint && $e['ts'] > $now-$l['duplicate_window_seconds']) { $duplicate = true; break; }
            }
            if ($duplicate) { $response = bi_failure(409, 'duplicate_submission'); }
            else {
                $ids = [];
                foreach ($daily as $e) {
                    if (isset($e['record']['inquiry_id'])) { $ids[$e['record']['inquiry_id']] = true; }
                }
                do { $id = 'INQ-'.gmdate('Ymd',$now).'-'.strtoupper(bin2hex(random_bytes(4))); }
                while (isset($ids[$id]));
                $status = !$cfg['notification']['enabled'] ? 'not-configured' : (is_callable('mail') ? 'attempting' : 'unavailable');
                $event['fingerprint'] = $fingerprint;
                $event['record'] = ['inquiry_id'=>$id, 'created_at'=>gmdate('Y-m-d\TH:i:s\Z',$now)] + $value + ['notification_status'=>$status];
                $response = [201, ['success'=>true, 'inquiry_id'=>$id, 'message'=>'Inquiry recorded.']];
            }
        } catch (InvalidArgumentException) { $response = bi_failure(422, 'validation_failed'); }
        $oldSize = strlen($bytes);
        $updated = $bytes.bi_json($event)."\n";
        // Reserve space for the final notification status, before accepting a lead or sending mail.
        bi_quota($cfg, $oldSize, strlen($updated)+256);
        bi_atomic($path, $updated);
        if (($event['record']['notification_status'] ?? '') === 'attempting') {
            $record = $event['record'];
            // No user-controlled header or envelope parameter. UTF-8 body is MIME base64 encoded.
            $subject = '=?UTF-8?B?'.base64_encode('Boomerang catalogue inquiry').'?=';
            $headers = "From: Boomerang <info@boomerang-co.com>\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64";
            try {
                $accepted = mail($cfg['notification']['recipient'], $subject, chunk_split(base64_encode(bi_json($record))), $headers);
                $event['record']['notification_status'] = $accepted ? 'accepted_by_local_mail' : 'failed';
            } catch (Throwable) { $event['record']['notification_status'] = 'failed'; }
            $event['record']['notification_updated_at'] = gmdate('Y-m-d\TH:i:s\Z');
            try { bi_atomic($path, $bytes.bi_json($event)."\n"); }
            catch (Throwable) {
                // The accepted lead is already durable. Its earlier "attempting"
                // status truthfully remains unknown; do not ask the visitor to resubmit.
            }
        }
        return $response;
    } finally { flock($lock, LOCK_UN); fclose($lock); }
}

function bi_handle(array $server, string $raw, array $cfg): array
{
    try {
        $method = $server['REQUEST_METHOD'] ?? '';
        if ($method === 'GET') {
            bi_quota($cfg, 0, 0);
            return [200, ['success'=>true, 'message'=>'Ready.']];
        }
        if ($method !== 'POST') { return bi_failure(405, 'method_not_allowed'); }
        $host = $server['HTTP_HOST'] ?? '';
        if (!in_array($host, ['www.boomerang-co.com','boomerang-co.com'], true)
            || !in_array(strtolower((string)($server['HTTPS'] ?? '')), ['on','1'], true)
            || ($server['HTTP_ORIGIN'] ?? '') !== 'https://'.$host
            || (isset($server['HTTP_SEC_FETCH_SITE']) && $server['HTTP_SEC_FETCH_SITE'] !== 'same-origin')
            || !preg_match('/^application\/json(?:\s*;\s*charset=utf-8)?$/iD', trim($server['CONTENT_TYPE'] ?? ''))
            || strlen($raw) > 16384
            || (isset($server['CONTENT_LENGTH']) && (!preg_match('/^[0-9]+$/D', (string)$server['CONTENT_LENGTH']) || (float)$server['CONTENT_LENGTH'] > 16384))) {
            return bi_failure(422, 'validation_failed');
        }
        try { $object = json_decode($raw, false, 16, JSON_THROW_ON_ERROR); }
        catch (JsonException) { return bi_failure(422, 'validation_failed'); }
        if (!$object instanceof stdClass) { return bi_failure(422, 'validation_failed'); }
        return bi_submit(get_object_vars($object), $server, $cfg);
    } catch (Throwable) { return bi_failure(503, 'storage_or_server_error'); }
}

if (PHP_SAPI !== 'cli' && !defined('BOOMERANG_INQUIRY_LIBRARY_ONLY')) {
    // Never emit PHP diagnostics, paths, input or configuration into a public response.
    ini_set('display_errors', '0');
    set_error_handler(static function (int $severity, string $message): never { throw new RuntimeException('operation_failed'); });
    try {
        $cfg = bi_config($_SERVER);
        $raw = '';
        if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
            $input = fopen('php://input', 'rb');
            if (!$input) { throw new RuntimeException('input'); }
            try { $raw = stream_get_contents($input, 16385); }
            finally { fclose($input); }
            if ($raw === false) { throw new RuntimeException('input'); }
        }
        [$status, $body] = bi_handle($_SERVER, $raw, $cfg);
    } catch (Throwable) { [$status, $body] = bi_failure(503, 'storage_or_server_error'); }
    restore_error_handler();
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    if ($status === 405) { header('Allow: GET, POST'); }
    if ($status === 429) { header('Retry-After: '.(string)($cfg['limits']['rate_window_seconds'] ?? 600)); }
    http_response_code($status);
    echo bi_json($body);
}
