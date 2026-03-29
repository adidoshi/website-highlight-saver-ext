const fs = require("fs");
const path = require("path");

const svgTemplate = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.1875}" fill="url(#grad${size})"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.5}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">H</text>
</svg>`;

const publicDir = path.join(__dirname, "..", "public");
const sizes = [16, 48, 128];

sizes.forEach((size) => {
  const svg = svgTemplate(size);
  fs.writeFileSync(path.join(publicDir, `icon${size}.svg`), svg);
  console.log(`Generated icon${size}.svg`);
});

console.log(
  "\nNote: SVG icons created. For production, convert these to PNG using an SVG to PNG converter.",
);
console.log(
  "For now, you can update manifest.json to use .svg extensions instead of .png",
);
