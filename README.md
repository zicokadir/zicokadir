# The Foul & One — Website

A static single-page website for **The Foul And One Podcast** (@the_foul_and_one) — the Kenyan basketball podcast & highlight page.

## Run locally
```bash
cd /workspace
python3 -m http.server 8000   # then open http://localhost:8000
```
Or simply open `index.html` in a browser (no build step, no dependencies).

## Structure
- `index.html` — landing page (hero, about, hosts, episodes, reel wall, platforms, contact)
- `css/style.css` — full styling (dark "court" theme, responsive, animations)
- `js/data.js` — reel-wall content (captions modeled on real public posts; edit freely)
- `js/main.js` — nav toggle, scroll reveal, counters, form validation

## Customize
- Swap gradient placeholders in `js/data.js` / episode cards for real photos/videos.
- All links point to the official Instagram (`instagram.com/the_foul_and_one`) and YouTube (`youtube.com/foulandone`).
- Contact form is front-end only — wire it to Formspree/Netlify Forms or your backend to receive messages.
