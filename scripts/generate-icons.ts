import { createCanvas } from "canvas";
import * as fs from "fs";
import * as path from "path";

const ICONS_DIR = path.join(process.cwd(), "public", "icons");

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

function generateIcon(size: number, outputPath: string): void {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // Maroon background
  ctx.fillStyle = "#800000";
  ctx.fillRect(0, 0, size, size);

  // White house emoji centered
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  // Scale emoji based on icon size
  const fontSize = Math.floor(size * 0.5);
  ctx.font = `${fontSize}px Arial`;
  ctx.fillText("🏠", size / 2, size / 2);

  // Save as PNG
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated: ${outputPath}`);
}

// Generate 192x192 icon
generateIcon(192, path.join(ICONS_DIR, "icon-192.png"));

// Generate 512x512 icon
generateIcon(512, path.join(ICONS_DIR, "icon-512.png"));

console.log("All icons generated successfully!");
