/* ============================================================
   FAQ WIDGET — صندوق الأسئلة الشائعة العائم
   مبادرة #التحول_الرقمي — مدارس دار الفرسان الأهلية
   ملف مشترك يُضمَّن في كل صفحات المشروع الخمس.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- بيانات الأسئلة والأجوبة (قصيرة جدًا عمدًا) ---------- */
  var FAQ = [
    {
      q: 'كم عدد أطراف المشروع؟',
      a: '9 أطراف رئيسية، من مركز صناعة القرار حتى الحل الحالي السريع.'
    },
    {
      q: 'ما دور مركز صناعة القرار؟',
      a: 'المرجعية العليا للموافقات الاستراتيجية في المشروع.'
    },
    {
      q: 'كم عدد مراحل المشروع؟',
      a: '16 مرحلة، من الفكرة الأولى حتى التوقيعات والاعتماد الرسمي.'
    },
    {
      q: 'ما هو الحل الحالي السريع؟',
      a: 'مبادرة الأستاذ عبدالله غراب بالتعاون مع ShareEdu لأتمتة القبول والتسجيل.'
    },
    {
      q: 'من الشريك التقني الرسمي؟',
      a: 'منصة ShareEdu للتعليم الالكتروني.'
    },
    {
      q: 'كم تكلفة الإعداد المقترحة من الاتصال المؤسسي للتطوير الشامل؟',
      a: 'إجمالي 21,000 ريال لأول سنة، بزيادة سنوية قدرها 6,000 ريال.'
    },
    {
      q: 'كم تكلفة الإعداد المقترحة من مبادرة #التحول_الرقمي للتطوير الشامل؟',
      a: 'إجمالي 11,000 ريال لأول سنة، بزيادة سنوية قدرها 6,000 ريال.'
    },
    {
      q: 'ما فروع المدارس؟',
      a: 'فرعان: السلامة والصالحية.'
    },
    {
      q: 'ما اسم المبادرة؟',
      a: 'مبادرة #التحول_الرقمي للتطوير الشامل — رؤية نحو تحوّل رقمي ذكي يواكب عصر الذكاء الاصطناعي، ببنية تحتية وتقنية تعليمية حديثة.'
    },
    {
      q: 'هل المشروع مموّل رسميًا أم تطوّعي؟',
      a: 'المسار الأساسي تطوّعي بأدوات مفتوحة المصدر؛ التوسّع للرؤية الشاملة يحتاج اعتماد ميزانية رسمية.'
    },
    {
      q: 'ما الفرق بين مسار الاتصال المؤسسي ومسار المطوّر؟',
      a: 'كلاهما يخدم نفس رؤية التطوير الشامل، بفارق نوع الأدوات المستخدمة (اشتراك جاهز مقابل مفتوح المصدر).'
    },
    {
      q: 'من يقرر أي مسار يُعتمد نهائيًا؟',
      a: 'مركز صناعة القرار هو المرجعية العليا للموافقة النهائية على مسارات المشروع.'
    },
    {
      q: 'هل هذا التقرير نسخة نهائية معتمدة؟',
      a: 'لا، هو نموذج أولي (النسخة السابعة) لا يزال قيد التطوير والمراجعة.'
    },
    {
      q: 'كم عدد السيناريوهات المطروحة لمستقبل المشروع؟',
      a: 'ستة سيناريوهات محتملة، من الأسرع والمجاني حتى الرؤية الأشمل.'
    },
    {
      q: 'هل الموقع متاح لأي شخص خارج المدرسة؟',
      a: 'نعم، الموقع عام ومتاح لأي زائر عبر الإنترنت.'
    },
    {
      q: 'كيف يرتبط هذا الروبوت بالمشروع؟',
      a: 'جزء من مبادرة #التحول_الرقمي، أُضيف لتسهيل وصول الزوّار للمعلومات العامة عن المشروع.'
    }
  ];

  /* ---------- الأنماط ---------- */
  var css = ''
    + '.faqw-btn{position:fixed;bottom:22px;right:22px;width:58px;height:58px;border-radius:50%;'
    + 'background:linear-gradient(135deg,#0B2A4A,#163B60);border:2px solid #C69A46;color:#E7CD8E;'
    + 'font-size:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;'
    + 'box-shadow:0 4px 18px rgba(11,42,74,.4);z-index:99998;transition:transform .2s;}'
    + '.faqw-btn:hover{transform:scale(1.08);}'
    + '.faqw-panel{position:fixed;bottom:90px;right:22px;width:320px;max-width:calc(100vw - 32px);'
    + 'max-height:70vh;background:#F7F4EC;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,.28);'
    + 'display:none;flex-direction:column;overflow:hidden;z-index:99999;'
    + 'font-family:\'Cairo\',sans-serif;direction:rtl;border:1px solid #E1DBC9;}'
    + '.faqw-panel.open{display:flex;}'
    + '.faqw-head{background:linear-gradient(135deg,#0B2A4A,#163B60);color:#fff;padding:14px 16px;'
    + 'display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}'
    + '.faqw-head-title{font-size:13.5px;font-weight:800;display:flex;align-items:center;gap:8px;}'
    + '.faqw-close{background:rgba(255,255,255,.12);border:none;color:#E7CD8E;width:26px;height:26px;'
    + 'border-radius:50%;cursor:pointer;font-size:14px;line-height:1;}'
    + '.faqw-body{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px;}'
    + '.faqw-bubble-bot{background:#FFFFFF;border:1px solid #E1DBC9;border-radius:12px 12px 12px 2px;'
    + 'padding:9px 13px;font-size:12.5px;color:#16222E;line-height:1.7;max-width:88%;align-self:flex-start;}'
    + '.faqw-bubble-user{background:#0B2A4A;color:#E7CD8E;border-radius:12px 12px 2px 12px;'
    + 'padding:9px 13px;font-size:12.5px;line-height:1.6;max-width:88%;align-self:flex-end;font-weight:700;}'
    + '.faqw-q-list{display:flex;flex-direction:column;gap:6px;padding:10px 14px 14px;flex-shrink:0;'
    + 'border-top:1px solid #E1DBC9;background:#EFEADB;max-height:38vh;overflow-y:auto;}'
    + '.faqw-q-btn{background:#FFFFFF;border:1px solid #C69A46;color:#0B2A4A;border-radius:16px;'
    + 'padding:7px 12px;font-size:11.5px;font-weight:700;cursor:pointer;text-align:right;'
    + 'font-family:\'Cairo\',sans-serif;transition:background .15s;}'
    + '.faqw-q-btn:hover{background:#FFF6EE;}'
    + '.faqw-reset{font-size:10.5px;color:#5C6B7A;text-align:center;padding:6px 0 0;cursor:pointer;'
    + 'text-decoration:underline;flex-shrink:0;}'
    + '@media print{.faqw-btn,.faqw-panel{display:none !important;}}'
    + '@media (max-width:400px){.faqw-panel{right:10px;left:10px;width:auto;bottom:80px;}.faqw-btn{right:14px;bottom:14px;}}';

  var styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  /* ---------- البنية ---------- */
  var btn = document.createElement('div');
  btn.className = 'faqw-btn';
  btn.setAttribute('title', 'الأسئلة الشائعة عن المشروع');
  btn.innerHTML = '🤖';

  var panel = document.createElement('div');
  panel.className = 'faqw-panel';
  panel.innerHTML =
    '<div class="faqw-head">' +
      '<div class="faqw-head-title">🤖 مساعد مبادرة #التحول_الرقمي</div>' +
      '<button class="faqw-close" aria-label="إغلاق">✕</button>' +
    '</div>' +
    '<div class="faqw-body" id="faqwBody">' +
      '<div class="faqw-bubble-bot">مرحبًا 👋 اختر سؤالًا من القائمة أدناه لعرض إجابة سريعة عن المشروع.</div>' +
    '</div>' +
    '<div class="faqw-q-list" id="faqwQList"></div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  var body = panel.querySelector('#faqwBody');
  var qList = panel.querySelector('#faqwQList');
  var closeBtn = panel.querySelector('.faqw-close');

  function renderQuestions() {
    qList.innerHTML = '';
    FAQ.forEach(function (item) {
      var b = document.createElement('button');
      b.className = 'faqw-q-btn';
      b.textContent = item.q;
      b.onclick = function () { askQuestion(item); };
      qList.appendChild(b);
    });
  }

  function askQuestion(item) {
    var uBubble = document.createElement('div');
    uBubble.className = 'faqw-bubble-user';
    uBubble.textContent = item.q;
    body.appendChild(uBubble);

    var bBubble = document.createElement('div');
    bBubble.className = 'faqw-bubble-bot';
    bBubble.textContent = item.a;
    body.appendChild(bBubble);

    body.scrollTop = body.scrollHeight;
  }

  renderQuestions();

  btn.addEventListener('click', function () {
    panel.classList.toggle('open');
  });
  closeBtn.addEventListener('click', function () {
    panel.classList.remove('open');
  });
})();
