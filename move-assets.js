import { existsSync, mkdirSync, copyFileSync, readdirSync } from 'fs';
import { join } from 'path';

// Create necessary directories
const directories = [
  'public/assets',
  'public/assets/team',
  'public/assets/logos',
  'public/assets/backgrounds',
  'public/assets/icons'
];

directories.forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Define assets to move/copy
const assets = [
  {
    src: 'src/public-site/public/AssistHealth _page-0001.jpg',
    dest: 'public/assets/backgrounds/hero-bg.jpg'
  },
  {
    src: 'src/public-site/public/doctor-bg.jpg',
    dest: 'public/assets/backgrounds/doctor-bg.jpg'
  },
  {
    src: 'src/public-site/public/doctor-team.jpg',
    dest: 'public/assets/backgrounds/doctor-team.jpg'
  },
  {
    src: 'public/assets/assist-health-logo-bg.png',
    dest: 'public/assets/logos/assist-health-logo-bg.png'
  },
  {
    src: 'public/assets/assist-health-logo.png',
    dest: 'public/assets/logos/assist-health-logo.png'
  }
];

// Copy assets to their new locations
assets.forEach(asset => {
  try {
    if (existsSync(asset.src)) {
      copyFileSync(asset.src, asset.dest);
      console.log(`Copied ${asset.src} to ${asset.dest}`);
    } else {
      console.log(`Source file not found: ${asset.src}`);
    }
  } catch (err) {
    console.error(`Error copying ${asset.src}:`, err);
  }
});

console.log('Asset organization complete'); 