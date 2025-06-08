# Nong Geng Ji - English Landing Site

This is the English landing page for Nong Geng Ji, a Hunan cuisine restaurant in Vancouver. The site is built with Next.js and Tailwind CSS.

## Features

- Responsive design for all devices
- Modern UI with smooth animations
- Video and audio content
- Integration with the main Chinese website
- Background music player
- Image optimization with Next.js Image component

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Plyr (for video player)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nonggengji-english/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── MenuHighlights.tsx
│   │   │   ├── Media.tsx
│   │   │   └── Footer.tsx
│   │   ├── page.tsx
│   │   └── layout.tsx
├── public/
│   ├── images/
│   ├── videos/
│   └── music/
└── package.json
```

## Required Media Files

Place the following files in their respective directories:

### Images
- `/public/images/hero-bg.jpg` - Hero section background
- `/public/images/restaurant-interior.jpg` - Restaurant interior photo
- `/public/images/dish-1.jpg` through `/public/images/dish-4.jpg` - Dish photos
- `/public/images/video-poster.jpg` - Video thumbnail

### Videos
- `/public/videos/restaurant-tour.mp4` - Restaurant tour video

### Music
- `/public/music/background.mp3` - Background music

## Deployment

The site is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel for automatic deployments.

## License

All rights reserved © Nong Geng Ji
