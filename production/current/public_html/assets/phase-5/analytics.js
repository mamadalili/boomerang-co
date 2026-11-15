(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  const locale = root.lang || "und";
  const pageType = body?.dataset.pageKind || "page";
  const productId = body?.dataset.productId || undefined;
  const runtime = window.BoomerangAnalyticsConfig || { environment: "development", enabled: false, debug: false, measurementId: null };
  const deliveryEnabled = runtime.enabled === true && /^G-[A-Z0-9]{6,}$/.test(runtime.measurementId || "");
  const safeBase = { locale, page_type: pageType };

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  if (deliveryEnabled) {
    gtag("js", new Date());
    gtag("config", runtime.measurementId, { send_page_view: false, debug_mode: runtime.debug === true });
    const loader = document.createElement("script");
    loader.async = true;
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(runtime.measurementId)}`;
    document.head.appendChild(loader);
  }

  function track(event, fields) {
    const payload = Object.assign({ event }, safeBase, fields || {});
    Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);
    window.dataLayer.push(payload);
    if (deliveryEnabled) {
      const eventFields = Object.assign({}, safeBase, fields || {});
      Object.keys(eventFields).forEach((key) => eventFields[key] === undefined && delete eventFields[key]);
      gtag("event", event, eventFields);
    }
    document.dispatchEvent(new CustomEvent("boomerang:analytics", { detail: payload }));
  }

  function productCategory() {
    try { return JSON.parse(document.querySelector("[data-product-facts]")?.textContent || "{}").category; }
    catch { return undefined; }
  }
  if (pageType === "product") track("product_view", { product_id: productId, category: productCategory() });
  if (pageType === "category") track("category_view", { category_id: location.pathname.split("/").filter(Boolean).at(-1) });

  const searchTimers = new WeakMap();
  document.addEventListener("input", (event) => {
    const control = event.target.closest('[data-filter="search"], [data-catalogue-search], [data-search]');
    if (!control) return;
    clearTimeout(searchTimers.get(control));
    searchTimers.set(control, setTimeout(() => {
      const catalogue = control.closest("[data-catalogue], .catalogue") || document;
      const visible = [...catalogue.querySelectorAll("[data-product-card]")].filter((card) => !card.hidden).length;
      track("internal_search", { query_length: String(control.value || "").trim().length, result_count: visible, zero_results: visible === 0 });
    }, 250));
  });

  document.addEventListener("change", (event) => {
    const filter = event.target.closest("[data-filter]");
    if (!filter || filter.dataset.filter === "search") return;
    const catalogue = filter.closest("[data-catalogue], .catalogue") || document;
    track("filter_use", { filter_name: filter.dataset.filter, result_count: [...catalogue.querySelectorAll("[data-product-card]")].filter((card) => !card.hidden).length });
  });

  document.addEventListener("click", (event) => {
    const compare = event.target.closest("[data-compare-open]");
    if (compare) {
      const scope = compare.closest("[data-comparison-scope]") || document;
      const products = [...scope.querySelectorAll("[data-compare-toggle]:checked")].map((item) => { try { return JSON.parse(item.dataset.compare).id; } catch { return undefined; } }).filter(Boolean);
      track("compare_product", { comparison_count: products.length, product_ids: products });
    }
    const link = event.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (/\.pdf(?:$|[?#])/i.test(href)) track("catalog_download", { document_id: href.split("/").pop().split(/[?#]/)[0] || "catalogue" });
    if (/^(?:mailto:|tel:)/i.test(href) || /\/contact\/?(?:$|[?#])/i.test(href)) track("contact_click", { contact_method: href.startsWith("tel:") ? "phone" : href.startsWith("mailto:") ? "email_link" : "contact_page" });
  });

  document.querySelectorAll("[data-inquiry-form]").forEach((form) => {
    let started = false;
    form.addEventListener("focusin", () => {
      if (started) return;
      started = true;
      track("inquiry_start", { product_id: form.elements.product_id?.value || productId, request_type: form.elements.request_type?.value || undefined });
    });
    // A static mailto/summary form never emits this. A future real backend must
    // dispatch this event only after a successful persistent API response.
    form.addEventListener("boomerang:inquiry-success", (event) => {
      const detail = event.detail || {};
      if (detail.success !== true) return;
      track("inquiry_submit", { product_id: detail.product_id || form.elements.product_id?.value || productId, request_type: detail.request_type, success: true });
    });
  });

  window.BoomerangAnalytics = Object.freeze({ track, deliveryEnabled, environment: runtime.environment });
})();