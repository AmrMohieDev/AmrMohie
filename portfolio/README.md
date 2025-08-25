# Senior Software Engineer — Portfolio

A professional, creative, and performant portfolio site built with vanilla HTML/CSS/JS.

## Features
- Responsive layout with sticky header and smooth scrolling
- Dark/light theme with persistence
- Creative visuals: parallax gradient blobs, scroll-reveals, card tilt, cursor spotlight
- Accessible markup (skip link, semantic sections, labels)
- SEO: meta tags, Open Graph, Twitter card, JSON-LD `Person` schema

## Structure
```
portfolio/
  index.html
  styles.css
  script.js
  site.webmanifest
  assets/
    icons/
      favicon.svg
    images/
    fonts/
```

## Local preview
```
cd portfolio
python3 -m http.server 4000
# open http://localhost:4000
```

## Customize
- Update `index.html`:
  - Replace "Your Name" and social links in footer and JSON-LD
  - Update `og:url`, `og:image`, and `twitter:image`
  - Edit copy in hero, work cards, about stats, and posts
- Add your images to `assets/images/` and update the `src` paths
- Optionally add `assets/Resume.pdf` and profile image

## Deploy
- GitHub Pages: push the folder to a repo and enable Pages (root)
- Netlify: drag-and-drop the folder or connect the repo
- Vercel: import the repo as a static project

## Notes
- Icons referenced (`favicon.png`, `apple-touch-icon.png`) are optional. A vector `favicon.svg` is included.
- The parallax and spotlight effects are lightweight and disabled gracefully on unsupported devices.

## License
MIT