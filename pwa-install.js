/* ============================================================
   PWA INSTALL — تسجيل Service Worker + صندوق حوار "تثبيت التطبيق"
   مبادرة #التحول_الرقمي_لمدارس_دار_الفرسان_2027
   ملف مشترك يُضمَّن في الصفحات العامة فقط (لا التقرير ولا الإنفوجرافيك).

   الزر ظاهر دائمًا (ما لم يكن مثبَّتًا فعلًا) — لا يعتمد على وصول حدث
   beforeinstallprompt لأن هذا الحدث غير مضمون الإطلاق من كروم نفسه (يعتمد
   على معايير تفاعل واستيفاء شروط داخلية لا نتحكم بها). الحوار يتكيّف مع
   3 حالات فعلية:
     1) iOS Safari  → لا يدعم تثبيتًا برمجيًا إطلاقًا (قيد نظام أبل) → تعليمات يدوية
     2) Android/Chrome/Edge وأُطلِق beforeinstallprompt بالفعل → تثبيت برمجي فعلي
     3) لم يُطلَق الحدث بعد (كروم لسا ما قرّر إتاحته) أو متصفح لا يدعم التثبيت
        البرمجي (مثل فايرفوكس) → تعليمات عامة عبر قائمة المتصفح
   ============================================================ */
(function () {
  'use strict';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('تعذّر تسجيل Service Worker:', err.message);
      });
    });
  }

  var deferredPrompt = null;
  var isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  function hideInstallButton() {
    var btn = document.getElementById('pwaInstallBtn');
    if (btn) btn.style.display = 'none';
  }

  // الزر ظاهر بشكل افتراضي في الصفحة نفسها (index.html) — هنا فقط نخفيه لو مُثبَّت فعلًا
  if (isStandalone) hideInstallButton();

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e; // يُستخدَم لاحقًا عند الضغط على الزر — لا يُظهر/يُخفي شيئًا بحد ذاته
  });

  window.addEventListener('appinstalled', function () {
    hideInstallButton();
    deferredPrompt = null;
  });

  // ---------- صندوق الحوار ----------
  window.openPwaInstallDialog = function () {
    var title = document.getElementById('pwaInstallModalTitle');
    var body = document.getElementById('pwaInstallModalBody');
    var confirmBtn = document.getElementById('pwaInstallConfirmBtn');
    var cancelBtn = document.getElementById('pwaInstallCancelBtn');
    var overlay = document.getElementById('pwaInstallModalOverlay');
    if (!overlay) return;

    if (isStandalone) {
      title.textContent = 'التطبيق مثبَّت بالفعل';
      body.innerHTML = 'أنت تستخدم التطبيق مثبَّتًا حاليًا على جهازك — لا حاجة لأي خطوة إضافية.';
      confirmBtn.textContent = 'حسنًا';
      confirmBtn.onclick = function () { closePwaInstallDialog(); };
      cancelBtn.style.display = 'none';
    } else if (isIOS) {
      title.textContent = 'تثبيت التطبيق على آيفون / آيباد';
      body.innerHTML =
        'سيتم تثبيت أيقونة <strong>iDar</strong> على شاشتك الرئيسية بخطوتين بسيطتين:' +
        '<br><br>1️⃣ اضغط زر المشاركة 📤 في أسفل شاشة Safari' +
        '<br>2️⃣ اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen)' +
        '<br><br>بعدها ارجع إلى شاشتك الرئيسية للتحقق من ظهور أيقونة iDar.';
      confirmBtn.textContent = 'فهمت، سأكمل يدويًا';
      confirmBtn.onclick = function () { closePwaInstallDialog(); };
      cancelBtn.style.display = 'none';
    } else if (deferredPrompt) {
      title.textContent = 'تثبيت التطبيق';
      body.innerHTML =
        'سيتم تثبيت التطبيق على سطح المكتب لديك — سواء كان جهازك ذكيًا 📱 أو لوحيًا 💻.' +
        '<br><br>انتظر ثوانٍ لاكتمال العملية، ثم اذهب لتتحقق من تثبيت أيقونة <strong>iDar</strong> على جهازك.';
      confirmBtn.textContent = 'تثبيت الآن';
      confirmBtn.onclick = function () { confirmPwaInstall(); };
      cancelBtn.style.display = 'inline-flex';
    } else {
      // المتصفح لم يُطلق beforeinstallprompt بعد (كروم/إيدج لسا ما قرّر إتاحته)، أو متصفح
      // لا يدعم التثبيت البرمجي أصلًا (فايرفوكس مثلًا) — تعليمات عامة عبر قائمة المتصفح
      title.textContent = 'تثبيت التطبيق';
      body.innerHTML =
        'إن لم يظهر خيار التثبيت تلقائيًا، يمكنك تثبيته يدويًا خلال ثوانٍ:' +
        '<br><br>🖥️ <strong>Chrome / Edge (كمبيوتر):</strong> ابحث عن أيقونة التثبيت ⊕ في شريط ' +
        'العنوان، أو افتح قائمة المتصفح ⋮ ← "تثبيت التطبيق"' +
        '<br><br>📱 <strong>Chrome (أندرويد):</strong> افتح قائمة المتصفح ⋮ ← "تثبيت التطبيق" ' +
        'أو "إضافة إلى الشاشة الرئيسية"' +
        '<br><br>بعدها اذهب لتتحقق من تثبيت أيقونة <strong>iDar</strong> على جهازك.';
      confirmBtn.textContent = 'فهمت';
      confirmBtn.onclick = function () { closePwaInstallDialog(); };
      cancelBtn.style.display = 'none';
    }

    overlay.classList.add('show');
  };

  window.closePwaInstallDialog = function () {
    var overlay = document.getElementById('pwaInstallModalOverlay');
    if (overlay) overlay.classList.remove('show');
  };

  window.confirmPwaInstall = function () {
    closePwaInstallDialog();
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () {
      deferredPrompt = null;
      hideInstallButton();
    });
  };
})();
