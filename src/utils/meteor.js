import * as THREE from "three";

// A rocky surface painted once into a canvas and shared by every sphere.
// Drawn rather than shipped as an image: it is a few hundred circles, it costs
// nothing to download, and it tiles without a seam because nothing touches the
// edges hard enough to show one.
let cached = null;

const build = () => {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#9a93a8";
  ctx.fillRect(0, 0, size, size);

  // Mottling: light and dark patches to break up the flat fill.
  for (let i = 0; i < 1600; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 2 + Math.random() * 28;
    const dark = Math.random() > 0.5;
    ctx.fillStyle = dark
      ? `rgba(58, 50, 76, ${0.04 + Math.random() * 0.12})`
      : `rgba(238, 234, 246, ${0.03 + Math.random() * 0.1})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Craters: a dark floor with a lit rim on the opposite side.
  for (let i = 0; i < 46; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 7 + Math.random() * 26;
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.08, x, y, r);
    g.addColorStop(0, "rgba(44, 37, 60, 0.42)");
    g.addColorStop(0.65, "rgba(44, 37, 60, 0.16)");
    g.addColorStop(1, "rgba(255, 255, 255, 0.12)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
};

export const meteorTexture = () => {
  if (!cached) cached = build();
  return cached;
};

export default meteorTexture;
