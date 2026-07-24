/* ============================================================
   FAQ WIDGET — صندوق الأسئلة الشائعة العائم
   مبادرة #التحول_الرقمي_لمدارس_دار_الفرسان_2027 — مدارس دار الفرسان الأهلية
   ملف مشترك يُضمَّن في كل صفحات المشروع الخمس.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- بيانات الأسئلة والأجوبة (قصيرة جدًا عمدًا) ---------- */
  var FAQ = [
    {
      q: 'كم عدد أطراف المشروع؟',
      a: '9 أطراف رئيسية، من مركز صناعة القرار حتى حل معالجة الوقت الراهن.'
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
      q: 'ما هو حل معالجة الوقت الراهن؟',
      a: 'بالتعاون مع ShareEdu لأتمتة القبول والتسجيل.'
    },
    {
      q: 'هل حل معالجة الوقت الراهن مفعّل حاليًا؟',
      a: 'نعم، استقرت آليته وأصبح متاحًا لكامل فريق القبول والتسجيل لهذا العام.'
    },
    {
      q: 'من الشريك التقني الرسمي؟',
      a: 'منصة ShareEdu للتعليم الالكتروني.'
    },
    {
      q: 'هل هناك تنسيق حالي مع ShareEdu حول تطوير الموقع؟',
      a: 'نعم، جرى اجتماع تنسيقي حول تطوير البنية التحتية، والنقاش لا يزال مستمرًا.'
    },
    {
      q: 'كم تكلفة الإعداد المقترحة من الاتصال المؤسسي للتطوير الشامل؟',
      a: 'إجمالي 21,000 ريال لأول سنة، بزيادة سنوية قدرها 6,000 ريال.'
    },
    {
      q: 'كم تكلفة الإعداد المقترحة من مبادرة #التحول_الرقمي_لمدارس_دار_الفرسان_2027 للتطوير الشامل؟',
      a: 'إجمالي 11,000 ريال لأول سنة، بزيادة سنوية قدرها 6,000 ريال.'
    },
    {
      q: 'ما فروع المدارس؟',
      a: 'فرعان: السلامة والصالحية.'
    },
    {
      q: 'ما اسم المبادرة؟',
      a: 'مبادرة #التحول_الرقمي_لمدارس_دار_الفرسان_2027 للتطوير الشامل — رؤية نحو تحوّل رقمي ذكي يواكب عصر الذكاء الاصطناعي، ببنية تحتية وتقنية تعليمية حديثة.'
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
      a: 'جزء من مبادرة #التحول_الرقمي_لمدارس_دار_الفرسان_2027، أُضيف لتسهيل وصول الزوّار للمعلومات العامة عن المشروع.'
    },
    {
      q: 'ما الرؤية الشاملة للمبادرة؟',
      a: 'تحديث البنية التحتية الرقمية والموقع الإلكتروني والمنصة التعليمية نحو تقنيات ذكية تخدم كل أطراف المدرسة.'
    },
    {
      q: 'ما هو التعليم الرقمي في المبادرة؟',
      a: 'أدوات تعليم ذكية تشمل: المعلّم الرقمي، الطالب الرقمي، والتعليم الرقمي.'
    },
    {
      q: 'هل هناك خطة لتطوير المناهج؟',
      a: 'نعم، ضمن الرؤية الشاملة، بما يتكامل مع أدوات التعليم الرقمي الجديدة.'
    },
    {
      q: 'ما مسار الاعتماد الدولي المستهدف؟',
      a: 'دراسة الانتقال من الاعتماد الحالي (AIAASC) نحو اعتماد Cognia العالمي.'
    }
  ];

  var faqUnlocked = false;

  /* ---------- نسخة احتياطية مضمّنة للأسئلة الاستراتيجية ----------
     تحمي من اختفاء الأسئلة عند تعذّر جلب qu-high.txt (ملف غير مرفوع على
     المستودع الحي، أو تخزين مؤقت وسيط CDN/متصفح يتجاهل no-store). تبقى
     محاولة الجلب من الملف الخارجي أولوية (لسهولة تحديثها لاحقًا دون
     تعديل هذا الملف)، وهذه النسخة تُستخدم فقط عند فشل تلك المحاولة. */
  var STRATEGIC_FALLBACK = [
    { q: 'ما الخطوة الاستراتيجية القادمة للمشروع؟', a: 'قيد الدراسة ضمن رؤية مشتركة، تُعتمد رسميًا عبر مركز صناعة القرار.' },
    { q: 'هل هناك تنسيق حالي مع جهات لتطوير البنية التحتية؟', a: 'نعم، عُقد اجتماع تنسيقي بتاريخ 15 يوليو 2026 ضمن أطر رسمية تخدم تطوير الخدمة لجميع الأطراف، والنقاش لا يزال مستمرًا.' },
    { q: 'كيف يخدم هذا المشروع علاقتنا بالشركاء التقنيين؟', a: 'يهدف لتعزيز التكامل والتعاون مع كل الشركاء القائمين بما يخدم الجميع.' },
    { q: 'هل يوجد مسار موازٍ يُدرَس حاليًا لتوسيع المشروع؟', a: 'نعم، تجري دراسته حاليًا ضمن الأطر الرسمية المعتمدة.' }
  ];

  /* ---------- جلب الأسئلة الاستراتيجية المقفلة من ملف خارجي (كما هو الحال مع dev-access.txt) ----------
     كسر التخزين المؤقت برقم إصدار زمني في الرابط، مع نسخة احتياطية مضمّنة
     إن تعذّر الجلب أو كان الملف فارغًا — لضمان ظهور الأسئلة دائمًا. */
  function loadStrategicQuestions() {
    return fetch('qu-high.txt?v=' + Date.now(), { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        var lines = (text || '').trim().split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
        if (!lines.length) throw new Error('ملف qu-high.txt فارغ');
        lines.forEach(function (line) {
          var parts = line.split('|');
          if (parts.length >= 2) {
            FAQ.push({ q: parts[0].trim(), a: parts[1].trim(), locked: true });
          }
        });
      })
      .catch(function (err) {
        console.warn('iDar Chatbot: تعذّر جلب qu-high.txt (' + err.message + ') — استخدام نسخة احتياطية مضمّنة بدلًا من ذلك.');
        STRATEGIC_FALLBACK.forEach(function (item) {
          FAQ.push({ q: item.q, a: item.a, locked: true });
        });
      });
  }

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
    + '.faqw-q-btn.locked{border-color:#7c3aed;color:#7c3aed;background:#F5EEFB;}'
    + '.faqw-lock-icon{margin-left:4px;}'
    + '.faqw-lock-msg{background:#F5EEFB;border:1px solid #7c3aed;border-radius:12px 12px 12px 2px;'
    + 'padding:9px 13px;font-size:12px;color:#4c1d95;line-height:1.7;max-width:88%;align-self:flex-start;}'
    + '.faqw-lock-form{background:#FFFFFF;border:1px solid #E1DBC9;border-radius:10px;padding:10px;'
    + 'display:flex;flex-direction:column;gap:6px;max-width:88%;align-self:flex-start;}'
    + '.faqw-lock-form input{border:1px solid #E1DBC9;border-radius:6px;padding:6px 8px;'
    + 'font-family:\'Cairo\',sans-serif;font-size:11.5px;}'
    + '.faqw-lock-form button{background:#7c3aed;color:#fff;border:none;border-radius:6px;'
    + 'padding:6px 10px;font-size:11.5px;font-weight:700;cursor:pointer;font-family:\'Cairo\',sans-serif;}'
    + '.faqw-lock-error{color:#c0392b;font-size:10.5px;display:none;}'
    + '.faqw-reset{font-size:10.5px;color:#5C6B7A;text-align:center;padding:6px 0 0;cursor:pointer;'
    + 'text-decoration:underline;flex-shrink:0;}'
    + '@media print{.faqw-btn,.faqw-panel{display:none !important;}}'
    + '@media (max-width:400px){.faqw-panel{right:10px;left:10px;width:auto;bottom:80px;}.faqw-btn{right:14px;bottom:14px;}}'
    /* فقاعة التفكير المتحركة فوق أيقونة الروبوت */
    + '.faqw-think{position:fixed;bottom:88px;right:16px;max-width:220px;z-index:99997;'
    + 'background:#FFFFFF;border:1px solid #C69A46;border-radius:14px 14px 2px 14px;'
    + 'padding:9px 14px;font-family:\'Cairo\',sans-serif;font-size:11.5px;font-weight:700;'
    + 'color:#0B2A4A;box-shadow:0 6px 20px rgba(11,42,74,.18);cursor:pointer;'
    + 'transition:opacity .35s ease, transform .35s ease;}'
    + '.faqw-think.faqw-think-hidden{opacity:0;transform:translateY(6px);pointer-events:none;}'
    + '.faqw-think-dots{display:inline-flex;gap:3px;margin-inline-start:4px;vertical-align:middle;}'
    + '.faqw-think-dots span{width:4px;height:4px;border-radius:50%;background:#C69A46;'
    + 'display:inline-block;animation:faqwDotPulse 1.2s infinite ease-in-out;}'
    + '.faqw-think-dots span:nth-child(2){animation-delay:.15s;}'
    + '.faqw-think-dots span:nth-child(3){animation-delay:.3s;}'
    + '@keyframes faqwDotPulse{0%,100%{opacity:.3;transform:translateY(0);}50%{opacity:1;transform:translateY(-2px);}}'
    + '@media print{.faqw-think{display:none !important;}}'
    + '@media (max-width:400px){.faqw-think{right:14px; max-width:180px;}}';

  var styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  /* ---------- البنية ---------- */
  var btn = document.createElement('div');
  btn.className = 'faqw-btn';
  btn.setAttribute('title', 'iDar Chatbot — الأسئلة الشائعة عن المشروع');
  btn.innerHTML = '🤖';

  var panel = document.createElement('div');
  panel.className = 'faqw-panel';
  panel.innerHTML =
    '<div class="faqw-head">' +
      '<div class="faqw-head-title">🤖 iDar Chatbot — مساعد مبادرة #التحول_الرقمي_لمدارس_دار_الفرسان_2027</div>' +
      '<button class="faqw-close" aria-label="إغلاق">✕</button>' +
    '</div>' +
    '<div class="faqw-body" id="faqwBody">' +
      '<div class="faqw-bubble-bot">مرحبًا 👋 أنا iDar Chatbot، اختر سؤالًا من القائمة أدناه لعرض إجابة سريعة عن المشروع.</div>' +
    '</div>' +
    '<div class="faqw-q-list" id="faqwQList"></div>';

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  /* ---------- فقاعة التفكير المتحركة ---------- */
  var THINK_MESSAGES = [
    'مرحبًا 👋 أنا iDar، المساعد الذكي للمبادرة',
    'كيف يمكنني مساعدتك؟',
    'لا تتردد في سؤالي بالنقر هنا',
    'هذا موقع مبادرة #التحول_الرقمي_الشامل',
    '🔒 اسألني أسئلة استراتيجية بكلمة مرور'
  ];
  var thinkBubble = document.createElement('div');
  thinkBubble.className = 'faqw-think';
  thinkBubble.innerHTML =
    '<span id="faqwThinkText">' + THINK_MESSAGES[0] + '</span>' +
    '<span class="faqw-think-dots"><span></span><span></span><span></span></span>';
  document.body.appendChild(thinkBubble);

  var thinkIndex = 0;
  var thinkTextEl = thinkBubble.querySelector('#faqwThinkText');
  function cycleThinkMessage() {
    thinkBubble.classList.add('faqw-think-hidden');
    setTimeout(function () {
      thinkIndex = (thinkIndex + 1) % THINK_MESSAGES.length;
      thinkTextEl.textContent = THINK_MESSAGES[thinkIndex];
      thinkBubble.classList.remove('faqw-think-hidden');
    }, 350);
  }
  var thinkInterval = setInterval(cycleThinkMessage, 3800);

  // النقر على الفقاعة يفتح الروبوت مباشرة، كما لو ناداك المستخدم
  thinkBubble.addEventListener('click', function () {
    panel.classList.add('open');
  });
  // إخفاء الفقاعة أثناء فتح لوحة المحادثة نفسها لتفادي التداخل البصري
  btn.addEventListener('click', function () {
    thinkBubble.classList.add('faqw-think-hidden');
  });

  var body = panel.querySelector('#faqwBody');
  var qList = panel.querySelector('#faqwQList');
  var closeBtn = panel.querySelector('.faqw-close');

  function renderQuestions() {
    qList.innerHTML = '';
    FAQ.forEach(function (item) {
      var b = document.createElement('button');
      b.className = 'faqw-q-btn' + (item.locked && !faqUnlocked ? ' locked' : '');
      b.innerHTML = (item.locked && !faqUnlocked ? '<span class="faqw-lock-icon">🔒</span>' : '') + item.q;
      b.onclick = function () { askQuestion(item); };
      qList.appendChild(b);
    });
  }

  function askQuestion(item) {
    var uBubble = document.createElement('div');
    uBubble.className = 'faqw-bubble-user';
    uBubble.textContent = item.q;
    body.appendChild(uBubble);

    if (item.locked && !faqUnlocked) {
      var lockMsg = document.createElement('div');
      lockMsg.className = 'faqw-lock-msg';
      lockMsg.textContent = 'هذا السؤال استراتيجي ويحتاج مستوى وصول أعلى لعرض الإجابة عليه.';
      body.appendChild(lockMsg);

      var form = document.createElement('div');
      form.className = 'faqw-lock-form';
      form.innerHTML =
        '<input type="text" placeholder="اسم المستخدم" class="faqw-lock-user">' +
        '<input type="password" placeholder="كلمة المرور" class="faqw-lock-pass">' +
        '<div class="faqw-lock-error">بيانات الدخول غير صحيحة.</div>' +
        '<button type="button">دخول لعرض الإجابة</button>';
      body.appendChild(form);
      body.scrollTop = body.scrollHeight;

      var userInput = form.querySelector('.faqw-lock-user');
      var passInput = form.querySelector('.faqw-lock-pass');
      var errorEl = form.querySelector('.faqw-lock-error');
      form.querySelector('button').addEventListener('click', function () {
        Promise.resolve()
          .then(function () { return fetch('dev-access.txt', { cache: 'no-store' }); })
          .then(function (res) { return res.text(); })
          .then(function (text) {
            var lines = text.trim().split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
            var matched = lines.some(function (line) {
              var parts = line.split(':').map(function (s) { return s.trim(); });
              return userInput.value.trim() === parts[0] && passInput.value.trim() === parts[1];
            });
            if (matched) {
              faqUnlocked = true;
              form.remove();
              var okBubble = document.createElement('div');
              okBubble.className = 'faqw-bubble-bot';
              okBubble.textContent = item.a;
              body.appendChild(okBubble);
              renderQuestions();
              body.scrollTop = body.scrollHeight;
            } else {
              errorEl.style.display = 'block';
            }
          })
          .catch(function () { errorEl.style.display = 'block'; });
      });
      return;
    }

    var bBubble = document.createElement('div');
    bBubble.className = 'faqw-bubble-bot';
    bBubble.textContent = item.a;
    body.appendChild(bBubble);

    body.scrollTop = body.scrollHeight;
  }

  renderQuestions();
  loadStrategicQuestions().then(renderQuestions);

  btn.addEventListener('click', function () {
    panel.classList.toggle('open');
  });
  closeBtn.addEventListener('click', function () {
    panel.classList.remove('open');
    thinkBubble.classList.remove('faqw-think-hidden');
  });
})();
