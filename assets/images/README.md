# Boomerang image names

Put your finished `.webp` files directly in these folders with these exact names.
No npm step is required if you make the WebP files yourself.

## Home banners

Folder: `assets/images/banners/`

- `home-banner-01.webp`
- `home-banner-02.webp`
- `home-banner-03.webp`

## Category thumbnails on home page

Folder: `assets/images/categories/`

- `vanity-category-thumbnail.webp`
- `faucets-category-thumbnail.webp`
- `mirrors-category-thumbnail.webp`
- `washbasins-category-thumbnail.webp`
- `shelves-category-thumbnail.webp`
- `accessories-category-thumbnail.webp`

## Category page banners

Folder: `assets/images/banners/`

- `vanity-category-banner.webp`
- `faucets-category-banner.webp`
- `mirrors-category-banner.webp`
- `washbasins-category-banner.webp`
- `shelves-category-banner.webp`
- `accessories-category-banner.webp`

## Other page banners

Folder: `assets/images/banners/`

- `about-banner.webp`
- `contact-banner.webp`
- `blog-banner.webp`

## Project and blog images

Project folder: `assets/images/projects/`

- `project-feature.webp`
- `project-detail-01.webp`
- `project-detail-02.webp`

Blog folder: `assets/images/blog/`

- `blog-vanity-guide.webp`
- `blog-mirror-guide.webp`
- `blog-project-guide.webp`

## Product images

Folder pattern:

`assets/images/products/product-folder-name/`

Inside each product folder:

- `main-01.webp` for the product card
- `main-02.webp`, `main-03.webp` for more main images
- `gallery-01.webp`, `gallery-02.webp` for gallery images

The website reads product image paths from the Google Sheet:

- Column L: `Web Main Image`, example `assets/images/products/andre-47-wall-mounted/main-01.webp`
- Column M: `Web Gallery Folder`, example `assets/images/products/andre-47-wall-mounted/`

If columns L and M are empty, the website still tries the standard path:

`assets/images/products/product-name-slug/main-01.webp`

Examples:

- `assets/images/products/andre-47-wall-mounted/main-01.webp`
- `assets/images/products/amanda-65-wall-mounted/main-01.webp`
- `assets/images/products/mirror-flora-40/main-01.webp`
- `assets/images/products/aster-50-washbasin/main-01.webp`

If the file is not there yet, the website shows the "Image coming soon" placeholder.
