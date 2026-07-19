/* ============================================================
   SERVICE WORKER — مبادرة #التحول_الرقمي_لمدارس_دار_الفرسان_2027
   يخزّن الصفحات العامة فقط للعمل offline بعد الزيارة الأولى.

   ⚠️ استثناء أمني صريح ومتعمَّد — لا تُضِف أي ملف من هذه القائمة إلى
   PRECACHE_URLS أو تسمح بتخزينه مهما كانت الأسباب:
     - report-v7.html / infographic.html  → محميان بـ strategic-lock.js
       (يعتمدان على تحقق شبكي حي من dev-access.txt عند كل تحميل؛ أي
       تخزين محلي لهما يُبقي المحتوى الحساس على قرص الزائر بلا كلمة مرور،
       ويُبطل تصميم "إعادة القفل عند كل تحميل" بالكامل)
     - dev-access.txt  → ملف كلمات المرور نفسه
     - mindset_all.html  → حصري للمطوّر، لا رابط علني له إطلاقًا
     - qu-high.txt  → الأسئلة الاستراتيجية المقفلة
   ============================================================ */

const CACHE_NAME = 'idar-shell-v8.12';

const PRECACHE_URLS = [
  'index.html',
  'iDar_UN.html',
  'digital-transformation.html',
  'quick-solution.html',
  'corp-comm-proposal.html',
  '1st_stone.html',
  'favicon.svg',
  'faq-widget.js',
  'update-banner.js',
  'strategic-lock.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

// قائمة صريحة بأسماء الملفات الممنوع تخزينها نهائيًا — حاجز أمان إضافي حتى لو
// أُضيفت بالخطأ إلى PRECACHE_URLS مستقبلًا.
const NEVER_CACHE = [
  'report-v7.html',
  'infographic.html',
  'dev-access.txt',
  'mindset_all.html',
  'qu-high.txt'
];

function isProtected(url) {
  return NEVER_CACHE.some(function (name) { return url.indexOf(name) !== -1; });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE_URLS.filter(function (u) { return !isProtected(u); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  const req = event.request;
  const url = req.url;

  // GET فقط — أي طلب آخر (POST مثلًا) يمر للشبكة مباشرة بلا تدخّل
  if (req.method !== 'GET') return;

  // 🔒 المحتوى المحمي/الحساس: شبكة إجبارية دائمًا (bypass كامل لأي كاش HTTP عادي في
  // المتصفح، ليس فقط Cache Storage الخاص بـ Service Worker) — لضمان أن هذين الملفين
  // "غير متاحين أوفلاين" بشكل حتمي ١٠٠٪، لا "أحيانًا" كما كان يحدث سابقًا بسبب كاش
  // المتصفح العادي الناتج عن تضمين iframe في الصفحة الرئيسية. عند انقطاع الاتصال
  // فعليًا، نُرجع صفحة بديلة مخصَّصة بدل أي محاولة استرجاع نسخة قديمة.
  if (isProtected(url)) {
    event.respondWith(
      fetch(req, { cache: 'no-store' }).catch(function () {
        return new Response(
          '<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">' +
          '<title>غير متاح بلا اتصال</title></head>' +
          '<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;' +
          'background:linear-gradient(135deg,#0b1c2f,#1a0d2e);font-family:\'Cairo\',\'Segoe UI\',Arial,sans-serif;">' +
          '<div style="max-width:380px;text-align:center;background:#0B2A4A;border:1px solid #7C3AED;' +
          'border-radius:14px;padding:32px 26px;color:#fff;">' +
          '<div style="font-size:42px;margin-bottom:12px;">📡🔒</div>' +
          '<div style="font-size:16px;font-weight:800;margin-bottom:8px;">غير متاح بلا اتصال</div>' +
          '<div style="font-size:12.5px;color:#C7B8E8;line-height:1.8;">هذا المحتوى محمي ويتطلب اتصالًا ' +
          'فعليًا بالإنترنت للتحقق من الصلاحية في كل مرة.<br>يرجى الاتصال بالإنترنت والمحاولة مجددًا.</div>' +
          '</div></body></html>',
          { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })
    );
    return;
  }

  // الصفحات العامة: شبكة أولًا (لأحدث نسخة)، مع نسخة مخزَّنة كبديل عند انقطاع الاتصال
  event.respondWith(
    fetch(req)
      .then(function (res) {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(req, resClone); });
        return res;
      })
      .catch(function () {
        return caches.match(req).then(function (cached) {
          return cached || Promise.reject('offline ولا توجد نسخة مخزَّنة');
        });
      })
  );
});
