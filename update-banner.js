/* ============================================================
   UPDATE BANNER — صندوق إشعار "آخر التحديثات" (نسخة ديناميكية)
   + أيقونة ثابتة لعرض كامل سجل التحديثات في أي وقت
   يظهر فقط في index.html، ويقرأ سجل CHANGELOG أدناه ليُركّب
   رسالته تلقائيًا — بما في ذلك القدرة على الحديث عن تحديث طرأ
   على مستوى مكوّن، طرف مشارك، أو مرحلة تنفيذ محدّدة، لا نص ثابت.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- سجل التحديثات — أضف عنصرًا جديدًا أعلى القائمة مع كل إصدار ----------
     level: 'عام' (مستوى المشروع كله) | 'مكوّن' | 'طرف' | 'مرحلة'
     scope: اسم المكوّن/الطرف/المرحلة المتأثرة (اتركه null إن كان "عام")
     showFrom / showUntil: بصيغة ISO مع المنطقة الزمنية — نافذة ظهور الصندوق المنبثق فقط
     (السجل الكامل يبقى متاحًا دائمًا عبر أيقونة العرض الثابتة، بصرف النظر عن هذه النافذة)
  ---------------------------------------------------------------------------- */
  var CHANGELOG = [
    {
      version: 'v8.8',
      level: 'عام',
      scope: null,
      items: [
        'شارة العنوان الرئيسي أصبحت رابطًا مباشرًا لصفحة الرؤية الشاملة',
        'إتاحة كل ذكر لهاشتاق المبادرة كرابط للرؤية الشاملة عبر الموقع',
        'إضافة خطوة "القبول النهائي" لمسار الحل السريع + إشادة بالأستاذ محمد القحطاني',
        'إضافة صفحة "حجر الأساس" — نقطة انطلاق المبادرة الأولى'
      ],
      showFrom: '2026-07-13T00:00:00+03:00',
      showUntil: '2026-07-20T00:00:00+03:00'
    },
    {
      version: 'v8.7',
      level: 'عام',
      scope: null,
      items: [
        'إضافة شريط تبويبات علوي (عناوين أولية، المحتوى قيد الإعداد)',
        'أيقونة ثابتة لعرض كامل سجل التحديثات في أي وقت',
        'iDar Chatbot أصبح يحمل فقاعة تفكير متحركة أعلى أيقونته'
      ],
      showFrom: '2026-07-12T00:00:00+03:00',
      showUntil: '2026-07-19T00:00:00+03:00'
    },
    {
      version: 'v8.6',
      level: 'عام',
      scope: null,
      items: [
        'إضافة تحسينات إلى شات المحادثة الذكي — أصبح الآن iDar Chatbot',
        'إتاحة مراسلة المطوّر من على الصفحة',
        'صندوق تحديثات ديناميكي جديد',
        'صفحة جديدة: الرؤية الشاملة الكاملة للمبادرة'
      ],
      showFrom: '2026-07-12T00:00:00+03:00',
      showUntil: '2026-07-19T00:00:00+03:00'
    }
  ];

  var levelIcon = { 'عام': '🎉', 'مكوّن': '🧩', 'طرف': '🤝', 'مرحلة': '🚧' };

  /* ---------- الأنماط المشتركة (البانر المنبثق + أيقونة السجل الكامل) ---------- */
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
    + '.ubnr-title{font-size:12.5px;font-weight:800;color:#E7CD8E;margin-bottom:5px;}'
    + '.ubnr-scope{font-size:10.5px;font-weight:800;color:#9FDCF5;margin-bottom:5px;}'
    + '.ubnr-msg{font-size:12px;color:#D9E0E6;line-height:1.7;}'
    + '.ubnr-list{margin:6px 0 0;padding-right:16px;font-size:11.5px;color:#D9E0E6;line-height:1.9;}'
    + '.ubnr-list li{margin-bottom:2px;}'
    + '.ubnr-close{flex-shrink:0;background:rgba(255,255,255,.1);border:none;color:#E7CD8E;'
    + 'width:22px;height:22px;border-radius:50%;cursor:pointer;font-size:12px;line-height:1;}'
    + '.ubnr-bar-track{height:4px;background:rgba(255,255,255,.12);}'
    + '.ubnr-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,#C69A46,#E7CD8E);'
    + 'transition:width 3.2s linear;}'
    + '.ubnr-wrap.ubnr-hide{animation:ubnr-lift .35s ease forwards;}'
    + '@keyframes ubnr-lift{to{opacity:0;transform:translate(-50%,-14px);}}'
    /* أيقونة عرض السجل الكامل — في تدفّق الصفحة، بمنتصفها فوق شارة العنوان */
    + '.ubnr-history-anchor-wrap{display:flex;justify-content:center;margin-bottom:14px;position:relative;}'
    + '.ubnr-history-btn{position:relative;width:40px;height:40px;'
    + 'border-radius:50%;background:linear-gradient(135deg,#0B2A4A,#163B60);border:1px solid #C69A46;'
    + 'color:#E7CD8E;font-size:17px;display:flex;align-items:center;justify-content:center;'
    + 'cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.3);}'
    + '.ubnr-history-btn:hover{transform:scale(1.06);}'
    + '.ubnr-history-overlay{display:none;position:fixed;inset:0;z-index:99998;'
    + 'background:rgba(7,27,47,.7);backdrop-filter:blur(3px);align-items:center;justify-content:center;padding:20px;}'
    + '.ubnr-history-overlay.open{display:flex;}'
    + '.ubnr-history-box{background:#F7F4EC;border-radius:14px;max-width:480px;width:100%;'
    + 'max-height:80vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.4);font-family:\'Cairo\',sans-serif;direction:rtl;}'
    + '.ubnr-history-head{position:sticky;top:0;background:linear-gradient(135deg,#0B2A4A,#163B60);'
    + 'color:#fff;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;}'
    + '.ubnr-history-head-title{font-size:14px;font-weight:800;color:#E7CD8E;}'
    + '.ubnr-history-close{background:rgba(255,255,255,.1);border:none;color:#E7CD8E;'
    + 'width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:13px;}'
    + '.ubnr-history-entry{padding:14px 18px;border-bottom:1px solid #E1DBC9;}'
    + '.ubnr-history-entry:last-child{border-bottom:none;}'
    + '.ubnr-history-version{font-size:13px;font-weight:800;color:#0B2A4A;margin-bottom:6px;}'
    + '.ubnr-history-scope{font-size:10.5px;font-weight:700;color:#1EA1E0;margin-bottom:6px;}'
    + '.ubnr-history-items{margin:0;padding-right:16px;font-size:12px;color:#5C6B7A;line-height:1.85;}'
    + '@media print{.ubnr-wrap,.ubnr-history-btn,.ubnr-history-overlay{display:none !important;}}';

  var styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  /* ============================================================
     1) الصندوق المنبثق — يظهر فقط للتحديث الواقع ضمن نافذته الزمنية
     ============================================================ */
  (function renderActiveBanner() {
    var now = Date.now();
    var current = null;
    for (var i = 0; i < CHANGELOG.length; i++) {
      var entry = CHANGELOG[i];
      var from = new Date(entry.showFrom).getTime();
      var until = new Date(entry.showUntil).getTime();
      if (now >= from && now <= until) { current = entry; break; }
    }
    if (!current) return;

    var icon = levelIcon[current.level] || '🎉';
    var titleText = 'تحديث جديد — النسخة ' + current.version;
    var scopeLine = current.scope
      ? '<div class="ubnr-scope">' + icon + ' على مستوى ' + current.level + ': ' + current.scope + '</div>'
      : '';
    var itemsHtml = current.items.map(function (t) { return '<li>' + t + '</li>'; }).join('');

    var wrap = document.createElement('div');
    wrap.className = 'ubnr-wrap';
    wrap.innerHTML =
      '<div class="ubnr-inner">' +
        '<div class="ubnr-icon">' + icon + '</div>' +
        '<div class="ubnr-text">' +
          '<div class="ubnr-title">' + titleText + '</div>' +
          scopeLine +
          '<div class="ubnr-msg">تم تحديث النسخة إلى ' + current.version + ':' +
            '<ul class="ubnr-list">' + itemsHtml + '</ul>' +
          '</div>' +
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

    requestAnimationFrame(function () {
      var fill = document.getElementById('ubnrBarFill');
      if (fill) fill.style.width = '100%';
    });
    setTimeout(dismiss, 9000);
  })();

  /* ============================================================
     2) أيقونة السجل الكامل — ثابتة دائمًا، تعرض كل عناصر CHANGELOG
        بصرف النظر عن نافذة الظهور الزمنية لكل عنصر
     ============================================================ */
  (function renderHistoryIcon() {
    var btn = document.createElement('div');
    btn.className = 'ubnr-history-btn';
    btn.innerHTML = '🕓';
    btn.setAttribute('title', 'عرض كل التحديثات');

    var entriesHtml = CHANGELOG.map(function (entry) {
      var icon = levelIcon[entry.level] || '🎉';
      var scopeLine = entry.scope
        ? '<div class="ubnr-history-scope">' + icon + ' على مستوى ' + entry.level + ': ' + entry.scope + '</div>'
        : '<div class="ubnr-history-scope">' + icon + ' تحديث عام</div>';
      var itemsHtml = entry.items.map(function (t) { return '<li>' + t + '</li>'; }).join('');
      return '<div class="ubnr-history-entry">' +
        '<div class="ubnr-history-version">النسخة ' + entry.version + '</div>' +
        scopeLine +
        '<ul class="ubnr-history-items">' + itemsHtml + '</ul>' +
      '</div>';
    }).join('');

    var overlay = document.createElement('div');
    overlay.className = 'ubnr-history-overlay';
    overlay.innerHTML =
      '<div class="ubnr-history-box">' +
        '<div class="ubnr-history-head">' +
          '<div class="ubnr-history-head-title">🕓 كل التحديثات</div>' +
          '<button class="ubnr-history-close" aria-label="إغلاق">✕</button>' +
        '</div>' +
        entriesHtml +
      '</div>';

    document.body.appendChild(overlay);

    var anchor = document.getElementById('ubnrHistoryAnchor');
    if (anchor) {
      var wrap = document.createElement('div');
      wrap.className = 'ubnr-history-anchor-wrap';
      wrap.appendChild(btn);
      anchor.appendChild(wrap);
    } else {
      // احتياطًا إن لم توجد نقطة الإدراج، نُبقيها ظاهرة أعلى الصفحة بدل فقدانها
      document.body.appendChild(btn);
    }

    btn.addEventListener('click', function () { overlay.classList.add('open'); });
    overlay.querySelector('.ubnr-history-close').addEventListener('click', function () {
      overlay.classList.remove('open');
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  })();
})();
