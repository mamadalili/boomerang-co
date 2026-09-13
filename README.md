# Boomerang Presentation Catalogue

A static multilingual presentation and catalogue website for Boomerang sanitary ware products.

## Pages

- `index.html` - home page
- `washbasins.html` - wash basins category
- `faucets.html` - faucets category
- `mirrors.html` - mirrors category
- `vanity.html` - vanity units category
- `shelves.html` - shelves category
- `accessories.html` - accessories category
- `about.html` - about us
- `contact.html` - contact us
- `blogs.html` - blog listing

`basin.html` and `wallhung.html` are legacy redirects (to `washbasins.html` and `index.html#categories`) kept for old links.

## Languages

The site supports:

- Farsi
- English
- Arabic
- Russian

Language text is managed in `js/main.js`.

## Assets

Put catalogue images in:

- `assets/images`

Put the logo in:

- `assets/logo`

The current files use placeholder SVG assets so the website works immediately. Replace those files with your final product photos, banners, project images, and logo when ready.

## Run

Open `index.html` directly in a browser.

For a local server, run:

```bash
npm run serve
```

Then open the local address shown in the terminal.
