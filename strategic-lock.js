/* ============================================================
   STRATEGIC LOCK — قفل موحّد للتقرير الشامل والإنفوجرافيك
   مبادرة #التحول_الرقمي_لمدارس_دار_الفرسان_2027 — مدارس دار الفرسان الأهلية
   يعتمد نفس بيانات الدخول في dev-access.txt (3 مستويات).
   وضعان: initFullPage() لصفحة كاملة (report-v7.html / infographic.html)،
          initSectionLocks([...]) لتغطية عنصر محدد داخل index.html.
   ============================================================ */
(function (global) {
  'use strict';

  var UNLOCK_KEY = 'strategicContentUnlock';
  var LOG_KEY = 'devAccessLog';
  var LOCK_MESSAGE = 'تم حجب المحتوى المطلوب لأسباب استراتيجية جاري العمل عليها';

  function isUnlocked() {
    try {
      var raw = localStorage.getItem(UNLOCK_KEY);
      if (!raw) return false;
      var data = JSON.parse(raw);
      return !!(data && data.user);
    } catch (e) { return false; }
  }

  function persistUnlock(user, label) {
    try {
      localStorage.setItem(UNLOCK_KEY, JSON.stringify({ user: user, label: label, ts: new Date().toISOString() }));
    } catch (e) { /* localStorage غير متاح — نتجاهل بصمت */ }
  }

  function logAccessAttempt(username, success) {
    try {
      var log = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
      log.push({
        ts: new Date().toISOString(),
        user: username || '(فارغ)',
        success: !!success,
        page: window.location.pathname.split('/').pop() || 'index.html'
      });
      while (log.length > 50) log.shift();
      localStorage.setItem(LOG_KEY, JSON.stringify(log));
    } catch (e) { /* نتجاهل بصمت */ }
  }

  function verifyCredentials(user, pass) {
    return fetch('dev-access.txt', { cache: 'no-store' })
      .then(function (res) { return res.text(); })
      .then(function (text) {
        var lines = text.trim().split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
        for (var i = 0; i < lines.length; i++) {
          var parts = lines[i].split(':').map(function (s) { return s.trim(); });
          if (user === parts[0] && pass === parts[1]) return parts[2] || 'المطور';
        }
        return null;
      })
      .catch(function () { return null; });
  }

  function injectStylesOnce() {
    if (document.getElementById('strategicLockStyles')) return;
    var style = document.createElement('style');
    style.id = 'strategicLockStyles';
    style.textContent =
      '.strategic-lock-overlay{position:fixed;inset:0;z-index:99999;background:linear-gradient(135deg,#0b1c2f,#1a0d2e);' +
      'display:flex;align-items:center;justify-content:center;padding:20px;font-family:"Cairo",sans-serif;direction:rtl;}' +
      '.strategic-lock-overlay.section-mode{position:absolute;z-index:60;border-radius:10px;}' +
      '.strategic-lock-box{max-width:380px;width:100%;text-align:center;background:#0B2A4A;border:1px solid #7C3AED;' +
      'border-radius:14px;padding:28px 26px;box-shadow:0 25px 70px rgba(0,0,0,.5);}' +
      '.strategic-lock-icon-big{font-size:42px;margin-bottom:12px;}' +
      '.strategic-lock-title{color:#fff;font-size:16px;font-weight:800;margin-bottom:6px;}' +
      '.strategic-lock-msg{color:#C7B8E8;font-size:12.5px;line-height:1.8;margin-bottom:18px;font-weight:600;}' +
      '.strategic-lock-teaser{cursor:pointer;}' +
      '.strategic-lock-teaser-text{color:#C7B8E8;font-size:12px;font-weight:700;}' +
      '.strategic-lock-form.hidden{display:none;}' +
      '.strategic-lock-box .modal-field{margin-bottom:12px;text-align:right;}' +
      '.strategic-lock-box .modal-field label{display:block;color:#8a9bb0;font-size:10.5px;font-weight:700;' +
      'margin-bottom:5px;font-family:"JetBrains Mono",monospace;}' +
      '.strategic-lock-box .modal-field input{width:100%;background:#131f30;border:1px solid #24384f;color:#fff;' +
      'padding:10px 12px;border-radius:7px;font-family:"JetBrains Mono",monospace;font-size:12.5px;direction:ltr;' +
      'text-align:left;box-sizing:border-box;}' +
      '.strategic-lock-box .modal-field input:focus{border-color:#7C3AED;outline:none;}' +
      '.strategic-lock-box .modal-error{color:#ff8a80;font-size:11.5px;font-weight:600;margin-bottom:12px;display:none;}' +
      '.strategic-lock-box .modal-error.show{display:block;}' +
      '.strategic-lock-btn{width:100%;background:#C69A46;color:#0B2A4A;border:none;border-radius:8px;padding:10px 14px;' +
      'font-size:13px;font-weight:800;cursor:pointer;font-family:"Cairo",sans-serif;}' +
      '.strategic-lock-btn:hover{box-shadow:0 6px 16px rgba(198,154,70,.4);}';
    document.head.appendChild(style);
  }

  function buildBox(sectionMode) {
    var box = document.createElement('div');
    box.className = 'strategic-lock-box';
    var teaserHtml = sectionMode
      ? '<div class="strategic-lock-teaser">' +
          '<div class="strategic-lock-icon-big">🔒</div>' +
          '<div class="strategic-lock-teaser-text">محتوى مقفل — انقر لعرض التفاصيل</div>' +
        '</div>'
      : '';
    box.innerHTML = teaserHtml +
      '<div class="strategic-lock-form' + (sectionMode ? ' hidden' : '') + '">' +
        '<div class="strategic-lock-icon-big">🔒</div>' +
        '<div class="strategic-lock-title">تم حجب المحتوى المطلوب</div>' +
        '<div class="strategic-lock-msg">' + LOCK_MESSAGE.replace('تم حجب المحتوى المطلوب ', '') + '</div>' +
        '<div class="modal-field"><label>USERNAME</label><input type="text" class="strat-user" autocomplete="off"></div>' +
        '<div class="modal-field"><label>PASSWORD</label><input type="password" class="strat-pass" autocomplete="off" placeholder="••••"></div>' +
        '<div class="modal-error strat-error">بيانات الدخول غير صحيحة</div>' +
        '<button type="button" class="strategic-lock-btn">فتح المحتوى</button>' +
      '</div>';
    return box;
  }

  var pendingActions = [];

  function runPendingActions() {
    var actions = pendingActions.slice();
    pendingActions = [];
    actions.forEach(function (fn) { try { fn(); } catch (e) { /* تجاهل */ } });
  }

  function wireBox(box, overlay, onUnlock) {
    var teaser = box.querySelector('.strategic-lock-teaser');
    var form = box.querySelector('.strategic-lock-form');
    if (teaser) {
      teaser.addEventListener('click', function () {
        teaser.style.display = 'none';
        form.classList.remove('hidden');
      });
    }
    var userInput = box.querySelector('.strat-user');
    var passInput = box.querySelector('.strat-pass');
    var errorBox = box.querySelector('.strat-error');
    var btn = box.querySelector('.strategic-lock-btn');

    function attempt() {
      var u = userInput.value.trim();
      var p = passInput.value.trim();
      verifyCredentials(u, p).then(function (label) {
        logAccessAttempt(u, !!label);
        if (label) {
          persistUnlock(u, label);
          document.querySelectorAll('.strategic-lock-overlay').forEach(function (el) { el.remove(); });
          if (onUnlock) onUnlock(label);
          runPendingActions();
        } else {
          errorBox.classList.add('show');
        }
      });
    }
    btn.addEventListener('click', attempt);
    [userInput, passInput].forEach(function (inp) {
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') attempt(); });
    });
  }

  function initFullPage() {
    injectStylesOnce();
    if (isUnlocked()) return;
    var overlay = document.createElement('div');
    overlay.className = 'strategic-lock-overlay';
    overlay.id = 'strategicLockOverlayFull';
    var box = buildBox(false);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    wireBox(box, overlay);
  }

  function initSectionLocks(selectors) {
    injectStylesOnce();
    if (isUnlocked()) return;
    (selectors || []).forEach(function (sel) {
      var container = document.querySelector(sel);
      if (!container) return;
      if (window.getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
      }
      var overlay = document.createElement('div');
      overlay.className = 'strategic-lock-overlay section-mode';
      var box = buildBox(true);
      overlay.appendChild(box);
      container.appendChild(overlay);
      wireBox(box, overlay);
    });
  }

  function requestAccess(sectionSelector, callback) {
    if (isUnlocked()) { callback(); return; }
    pendingActions.push(callback);
    var container = sectionSelector ? document.querySelector(sectionSelector) : null;
    var overlay = container ? container.querySelector('.strategic-lock-overlay') : null;
    if (overlay) {
      var teaser = overlay.querySelector('.strategic-lock-teaser');
      var form = overlay.querySelector('.strategic-lock-form');
      if (teaser && form && teaser.style.display !== 'none') {
        teaser.style.display = 'none';
        form.classList.remove('hidden');
      }
      overlay.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var userInput = overlay.querySelector('.strat-user');
      if (userInput) userInput.focus();
    }
  }

  global.StrategicLock = {
    initFullPage: initFullPage,
    initSectionLocks: initSectionLocks,
    isUnlocked: isUnlocked,
    requestAccess: requestAccess
  };
})(window);
