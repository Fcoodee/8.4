/* ============================================================
   UPDATE BANNER — صندوق إشعار "آخر التحديثات"
   يظهر فقط في index.html، لمدة أسبوع واحد بدءًا من 2026-07-11 22:14 (بتوقيت السعودية)
   بعدها يتوقف عن الظهور تلقائيًا دون أي تدخل يدوي.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- نافذة الظهور: أسبوع واحد من لحظة إضافة هذا التحديث ---------- */
  var SHOW_FROM = new Date('2026-07-11T22:14:19+03:00').getTime();
  var SHOW_UNTIL = SHOW_FROM + 7 * 24 * 60 * 60 * 1000; // +7 أيام

  var now = Date.now();
  if (now < SHOW_FROM || now > SHOW_UNTIL) return; // خارج نافذة الأسبوع — لا نعرض شيئًا

  /* ---------- الأنماط ---------- */
  var css = ''
    + '.ubnr-wrap{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:100000;'
    + 'width:min(420px,calc(100vw - 32px));background:linear-gradient(135deg,#0B2A4A,#163B60);'
    + 'border:1px solid #C69A46;border-radius:14px;box-shadow:0 10px 34px rgba(0,0,0,.32);'
    + 'font-family:\'Cairo\',sans-serif;direction:rtl;overflow:hidden;'
    + 'animation:ubnr-drop .5s ease;}'
    + '@keyframes ubnr-drop{from{opacity:0;transform:translate(-50%,-16px);}to{opacity:1;transform:translate(-50%,0);}}'
    + '.ubnr-inner{display:flex;align-items:flex-start;gap:12px;padding:14px 16px 12px;}'
    + '.ubnr-icon{flex-shrink:0;width:36px;height:36px;border-radius:50%;background:rgba(198,154,70,.18);'
    + 'display:flex;align-items:center;justify-content:center;font-size:18px;}'
    + '.ubnr-text{flex:1;min-width:0;}'
    + '.ubnr-title{font-size:12.5px;font-weight:800;color:#E7CD8E;margin-bottom:3px;}'
    + '.ubnr-msg{font-size:12px;color:#D9E0E6;line-height:1.7;}'
    + '.ubnr-close{flex-shrink:0;background:rgba(255,255,255,.1);border:none;color:#E7CD8E;'
    + 'width:22px;height:22px;border-radius:50%;cursor:pointer;font-size:12px;line-height:1;}'
    + '.ubnr-bar-track{height:4px;background:rgba(255,255,255,.12);}'
    + '.ubnr-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,#C69A46,#E7CD8E);'
    + 'transition:width 3.2s linear;}'
    + '.ubnr-wrap.ubnr-hide{animation:ubnr-lift .35s ease forwards;}'
    + '@keyframes ubnr-lift{to{opacity:0;transform:translate(-50%,-14px);}}'
    + '@media print{.ubnr-wrap{display:none !important;}}';

  var styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  /* ---------- البنية ---------- */
  var wrap = document.createElement('div');
  wrap.className = 'ubnr-wrap';
  wrap.innerHTML =
    '<div class="ubnr-inner">' +
      '<div class="ubnr-icon">🎉</div>' +
      '<div class="ubnr-text">' +
        '<div class="ubnr-title">تحديث جديد — النسخة v8.3</div>' +
        '<div class="ubnr-msg">تم تحديث المشروع للنسخة v8.3 الجديدة، حيث تم إضافة شات بوت محادثة 🤖. شكرًا لكم.</div>' +
      '</div>' +
      '<button class="ubnr-close" aria-label="إغلاق">✕</button>' +
    '</div>' +
    '<div class="ubnr-bar-track"><div class="ubnr-bar-fill" id="ubnrBarFill"></div></div>';

  document.body.appendChild(wrap);

  function dismiss() {
    wrap.classList.add('ubnr-hide');
    setTimeout(function () { wrap.remove(); }, 380);
  }

  wrap.querySelector('.ubnr-close').addEventListener('click', dismiss);

  // تشغيل شريط التقدّم فور الإدراج، ثم إخفاء تلقائي بعده بلحظة
  requestAnimationFrame(function () {
    var fill = document.getElementById('ubnrBarFill');
    if (fill) fill.style.width = '100%';
  });
  setTimeout(dismiss, 7000); // إخفاء تلقائي بعد 7 ثوانٍ (يبقى بإمكان الزائر إغلاقه يدويًا قبل ذلك)
})();
