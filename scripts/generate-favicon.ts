import { createCanvas, loadImage } from "canvas";
import * as fs from "fs";
import * as path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function generateFavicon() {
  // Load the logo
  const logo = await loadImage(path.join(PUBLIC_DIR, "logo.png"));
  
  // Create 48x48 canvas for favicon base
  const canvas = createCanvas(48, 48);
  const ctx = canvas.getContext("2d");
  
  // Draw logo scaled to fit
  ctx.drawImage(logo, 0, 0, 48, 48);
  
  // Save as PNG (browsers support PNG favicons)
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.png"), buffer);
  
  console.log("Generated: favicon.png (48x48)");
}

async function generatePWAIcons() {
  const logo = await loadImage(path.join(PUBLIC_DIR, "logo.png"));
  
  // Generate 192x192 icon
  const canvas192 = createCanvas(192, 192);
  const ctx192 = canvas192.getContext("2d");
  ctx192.drawImage(logo, 0, 0, 192, 192);
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "icons", "icon-192.png"),
    canvas192.toBuffer("image/png")
  );
  console.log("Generated: icons/icon-192.png");
  
  // Generate 512x512 icon
  const canvas512 = createCanvas(512, 512);
  const ctx512 = canvas512.getContext("2d");
  ctx512.drawImage(logo, 0, 0, 512, 512);
  fs.writeFileSync(
    path.join(PUBLIC_DIR, "icons", "icon-512.png"),
    canvas512.toBuffer("image/png")
  );
  console.log("Generated: icons/icon-512.png");
}

async function main() {
  try {
    await generateFavicon();
    await generatePWAIcons();
    console.log("\n✅ All icons generated successfully!");
  } catch (error) {
    console.error("Error generating icons:", error);
    process.exit(1);
  }
}

main();
