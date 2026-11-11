# CaptionCraft

I got tired of staring at a photo for ten minutes trying to think of something to write underneath it. So I built myself a shortcut: pick a category and a tone, type a keyword, and get six captions with hashtags attached, ready to copy.

## What it does

- **9 categories** — travel, food, selfie, festival, mood, fitness, birthday, motivation and work — each with 10 hand-written caption templates.
- **6 tones** — witty, inspirational, minimal, bold, romantic and funny. The tone genuinely changes the caption: most tones add a closing line in that voice, minimal trims it down to the first sentence.
- **Your keyword, woven in** — type "Goa" or "leg day" and it lands inside every caption naturally. Leave it blank and a sensible default per category is used.
- **Hashtag banks per niche** — pick 5, 10, 15, 20 or 30 hashtags. Platform presets set a sensible default: 20 for Instagram, 3 for X, 5 for LinkedIn.
- **Copy your way** — copy the caption alone, the hashtags alone, or the whole set (caption + hashtags) in one tap. "Copy all sets" grabs everything on screen.
- **Save the good ones** — star a caption and it lives in your saved list, kept in localStorage on your device.
- **Search and shuffle** — filter the captions on screen by any word, or hit Shuffle for a fresh set.
- **Character counts** — every caption shows its length, with a warning when it runs past X's 280 characters.
- **Recent generations** — your last few generations are listed so you can grab a caption again without regenerating.

## How to use it

Open the site, pick a category, pick a tone, type a keyword if you have one, press Generate. Click "Copy set" on the caption you like and paste it straight into Instagram, X or LinkedIn. That is the whole workflow.

## Privacy

There is no server, no account and no tracking. Everything runs in your browser. Your keyword, saved captions and history stay in your browser's localStorage and are never sent anywhere.

## What it is not

The captions come from a library of templates I wrote, not from a writer or a model — so treat them as a starting point. A template will never know the joke behind your photo, and some will sound better than others depending on your keyword. Read the caption once before you post, and tweak the wording until it sounds like you. The hashtag banks are curated starting points too; double-check a tag is still relevant before relying on it.

## Running it locally

No build step, no dependencies. Serve the folder with any static server:

```bash
python3 -m http.server
```

Then open `http://localhost:8000`.

## Tech

Vanilla HTML, CSS and JavaScript (ES modules). `js/engine.js` holds the template libraries and all the generation logic, `js/main.js` wires it to the page. Tests live outside the repo in the tool-sites notes folder and run with plain `node:test` plus jsdom.

## License

MIT — do what you like with it, just keep the license file attached.
