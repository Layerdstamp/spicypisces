let vantaEffect = null;

function startVanta(){
  if (!window.VANTA || !window.VANTA.WAVES) return;

  if (vantaEffect) vantaEffect.destroy();

  vantaEffect = window.VANTA.WAVES({
    el: "#bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    shininess: 35.0,
    waveHeight: 18.0,
    waveSpeed: 0.85,
    zoom: 0.95
  });
}

window.addEventListener("load", startVanta);
window.addEventListener("resize", () => {
  // simple refresh on resize
  if (vantaEffect) { vantaEffect.destroy(); vantaEffect = null; }
  startVanta();
});
