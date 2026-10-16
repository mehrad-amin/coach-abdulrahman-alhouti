export const HERO_CONTENT = {
  ar: {
    badge: "بكالوريوس تربية بدنية ورياضة | تمارين المقاومة والتأهيل الرياضي",
    headlinePrimary: "الكابتن عبدالرحمن فيصل الحوطي؛",
    headlineHighlight: "تدريب علمي، تأهيل رياضي، وإعداد أبطال",
    description:
      "برامج تدريبية مبنية على أسس أكاديمية في تمارين المقاومة وإعادة التأهيل الرياضي، والإشراف على تجهيز البطولات (سباحة، ملاكمة، ألعاب قوى، كرة طائرة)، مع رعاية تدريبية آمنة ومخصصة لكبار السن ومرضى السكري وضغط الدم.",
    ctaPrimary: "ابدأ الاستشارة واحصل على خطتك",
    ctaSecondary: "حساب السعرات واحتياج الـ TDEE فوراً",
    stats: [
      { value: "+15 عاماً", label: "مسيرة وخبرة رياضية" },
      { value: "+4 رياضات", label: "إشراف وتجهيز بطولات" },
      { value: "100%", label: "أمان طبي وتدريب علمي" },
    ],
  },
  en: {
    badge: "B.Sc. PHYSICAL EDUCATION | RESISTANCE & SPORTS REHAB",
    headlinePrimary: "Capt. Abdulrahman Al-Houti;",
    headlineHighlight: "Scientific Training, Sports Rehab & Athletic Prep",
    description:
      "Academic, evidence-based protocols in resistance training, sports injury rehabilitation, and championship preparation (Swimming, Boxing, Athletics, Volleyball)—alongside safe, specialized training for seniors, diabetes, and hypertension patients.",
    ctaPrimary: "Start Consultation & Get Your Plan",
    ctaSecondary: "Calculate Calories & TDEE Instantly",
    stats: [
      { value: "+15 Yrs", label: "Athletic & Coaching Journey" },
      { value: "+4 Sports", label: "Championship Prep Supervision" },
      { value: "100%", label: "Medical Safety & Science-Based" },
    ],
  },
};

export const SERVICES = {
  ar: [
    {
      id: 1,
      title: "تمارين المقاومة والبناء العضلي العلمي",
      desc: "تصميم جداول تدريبية دقيقة مبنية على أبحاث ومقالات علمية في تمارين المقاومة لتحقيق أقصى تطور عضلي وحرق للدهون بأعلى درجات الأمان.",
      badge: "الأكثر طلباً",
    },
    {
      id: 2,
      title: "التأهيل الرياضي وتدريب الفئات الخاصة",
      desc: "برامج إعادة تأهيل الإصابات الرياضية، وخطط تدريبية آمنة ومخصصة لكبار السن ومرضى السكري وضغط الدم بإشراف معتمد في التدريب والإسعافات الأولية.",
      badge: "رعاية وتأهيل",
    },
    {
      id: 3,
      title: "الإعداد البدني وتجهيز البطولات الرياضية",
      desc: "إشراف كامل وتجهيز بدني تخصصي للاعبين في مختلف الرياضات التنافسية مثل السباحة، الملاكمة، ألعاب القوى، وكرة الطائرة للوصول لقمة الأداء.",
      badge: "إعداد الأبطال",
    },
  ],
  en: [
    {
      id: 1,
      title: "Scientific Resistance Training & Hypertrophy",
      desc: "Precision workout protocols backed by academic research in resistance training to maximize muscle growth and fat loss with optimal biomechanics.",
      badge: "Most Popular",
    },
    {
      id: 2,
      title: "Sports Rehabilitation & Special Care Coaching",
      desc: "Specialized injury rehabilitation and medically safe fitness programs tailored for seniors, diabetes patients, and hypertension management.",
      badge: "Rehab & Medical Safety",
    },
    {
      id: 3,
      title: "Athletic Conditioning & Championship Prep",
      desc: "Comprehensive physical preparation for competitive athletes across Swimming, Boxing, Track & Field, and Volleyball to peak on competition day.",
      badge: "Pro Athletes",
    },
  ],
};

// بخشی از src/constants/fitnessData.js

export const TRANSFORMATIONS = {
  ar: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    img: `/images/${i + 1}.jpg`,
    tag: "تحول طبيعي 100%",
  })),
  en: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    img: `/images/${i + 1}.jpg`,
    tag: "100% Natural",
  })),
};
export const PRICING_PLANS = {
  ar: [
    {
      id: "nutrition_only",
      id_code: "nutrition_only",
      title: "باقة التغذية فقط",
      duration: "متابعة أسبوعين",
      price: "35 د.ك",
      features: [
        "جدول تغذية خاص باللاعب بناءً على هدفه وحالته الصحية",
        "محسوب السعرات الحرارية والقيم الغذائية بدقة علمية",
        "جدول مرن يتيح الموازنة بين الغذاء السليم والأطعمة المفضلة",
        "نمط حياة صحي ومستدام للحصول على جسم متناسق وصحة جيدة",
        "فائدة نفسية وصحية وبدنية متكاملة",
        "توصيات مكملات غذائية مخصصة (إذا لزم الأمر)",
        "متابعة دورية وتعديل مباشر لمدة أسبوعين",
      ],
      isPopular: false,
    },
    {
      id: "workout_only",
      id_code: "workout_only",
      title: "باقة التمرين فقط",
      duration: "متابعة أسبوع",
      price: "35 د.ك",
      features: [
        "جدول تمرين مصمم بالكامل حسب ظروف اللاعب اليومية",
        "تطبيق مبدأ الزيادة التدریجية في الأحمال (Progressive Overload)",
        "مراعاة تامة لعامل الاستشفاء العضلي والعصبي",
        "جدول يراعي عامل الوقت وساعات فراغك المتاحة",
        "مناسب للتدريب داخل النادي أو الجيم المنزلي",
        "إرشادات تفصيلية لأداء التمارين وتجنب الإصابات",
        "متابعة دقيقة وإتقان للتكنيك لمدة أسبوع",
      ],
      isPopular: false,
    },
    {
      id: "online_full",
      id_code: "online_full",
      title: "باقة التمرين والتغذية أونلاين",
      duration: "متابعة شهر كامل",
      price: "50 د.ك",
      features: [
        "الدمج الشامل بين جدول التمرين المتطور والنظام الغذائي المرن",
        "جدول تمرين يراعي ظروفك اليومية، الوقت، والاستشفاء",
        "جدول تغذية مخصص محسوب السعرات والماكروز بدون حرمان",
        "تطبيق الزيادة التدريجية في الأحمال لتحقيق التطور المستمر",
        "بروتوكول مكملات غذائية مدروس ومبني على هدفك",
        "متابعة يومية ومباشرة عبر واتساب طوال شهر كامل",
        "تقييم أسبوعي وتحديثات للخطة بناءً على قياساتك ونتائجك",
      ],
      isPopular: true,
    },
    {
      id: "in_gym_vip",
      id_code: "in_gym_vip",
      title: "باقة التدريب داخل النادي",
      duration: "لمدة شهر (حضوري)",
      price: "تدريب ميداني VIP",
      features: [
        "تدريب شخصي عملي ومباشر مع الكابتن عبدالرحمن داخل النادي (الكويت)",
        "تصحيح فوري ولحظي للمسار الحركي والتكنيك تحت الأوزان",
        "جدول تغذية مخصص بالكامل محسوب السعرات والماكروز",
        "خطة أحمال وافية مبنية على كافة أجهزة النادي المتاحة",
        "رعاية متقدمة لحالات التأهيل الحركي والرياضيين التنافسيين",
        "متابعة ميدانية حصرية طوال الشهر لضمان أعلى درجات الأمان والنتائج",
      ],
      isPopular: false,
    },
  ],
  en: [
    {
      id: "nutrition_only",
      id_code: "nutrition_only",
      title: "Nutrition Only Plan",
      duration: "2 Weeks Follow-up",
      price: "35 KWD",
      features: [
        "Customized nutrition plan tailored to your medical history and goals",
        "Scientifically calculated calories and macronutrient ratios",
        "Flexible dieting approach balancing wholesome food with favorites",
        "Sustainable lifestyle design for an aesthetic, healthy physique",
        "Holistic psychological, health, and physical vitality",
        "Evidence-based supplement protocol (if needed)",
        "Active monitoring and adjustments for 2 weeks",
      ],
      isPopular: false,
    },
    {
      id: "workout_only",
      id_code: "workout_only",
      title: "Training Only Plan",
      duration: "1 Week Follow-up",
      price: "35 KWD",
      features: [
        "Workout routine engineered around your daily schedule",
        "Periodized plan incorporating progressive overload principles",
        "Optimized for systemic and muscular recovery",
        "Designed to maximize results within your available time window",
        "Tailored to commercial gym setups or home equipment",
        "Precise movement cues to safeguard against sports injuries",
        "Direct technique follow-up for 1 full week",
      ],
      isPopular: false,
    },
    {
      id: "online_full",
      id_code: "online_full",
      title: "Online Workout & Nutrition",
      duration: "1 Full Month Coaching",
      price: "50 KWD",
      features: [
        "Complete synergy between periodized lifting and flexible nutrition",
        "Workout plan considering time constraints and optimal recovery",
        "Macro-calculated nutrition customized to health and fat-loss goals",
        "Progressive overload programming for continuous physical adaptation",
        "Personalized evidence-based supplementation protocol",
        "Continuous direct WhatsApp coaching for 1 full month",
        "Weekly progress audits and biometric plan adjustments",
      ],
      isPopular: true,
    },
    {
      id: "in_gym_vip",
      id_code: "in_gym_vip",
      title: "In-Gym Coaching VIP",
      duration: "1 Month (In-Person)",
      price: "In-Gym VIP Kuwait",
      features: [
        "Direct 1-on-1 hands-on coaching with Capt. Abdulrahman (Kuwait)",
        "Real-time biomechanical correction under heavy loaded compounds",
        "Full bespoke nutrition plan calculated to the gram",
        "Advanced hypertrophy and strength programming on gym equipment",
        "Specialized attention for injury rehab and competitive athletes",
        "Exclusive hands-on supervision for maximum safety and peak performance",
      ],
      isPopular: false,
    },
  ],
};

// src/constants/fitnessData.js (FAQS)
export const FAQS = {
  ar: [
    {
      question:
        "هل البرنامج مناسب لشخص مبتدئ لم يسبق له ممارسة تمارين المقاومة أو دخول النادي؟",
      answer:
        "نعم بكل تأكيد؛ فالبدء مع مدرب متخصص في التربية البدنية والتأهيل الحركي هو الخيار الأمثل لتأسيس مسارك الحركي بشكل صحيح وحماية مفاصلك من أول يوم. يتم تصميم برنامجك ليتدرج معك خطوة بخطوة وفق مستواك الحالي ولياقتك دون أي ضغط مفرط.",
    },
    {
      question: "كيف تتم متابعة تماريني وتصحيح التكنيك والأداء الحركي عن بعد؟",
      answer:
        "يتم التواصل مباشرة عبر واتساب؛ حيث تقوم بتصوير مقاطع قصيرة لأدائك في التمارين الأساسية، ويقوم الكابتن عبدالرحمن بمراجعة زوايا المفاصل، سرعة التكرار، والمسار الحركي ليرسل لك تصحيحاً وملاحظات عملية بالصوت أو الفيديو تضمن أعلى استفادة وأمان تام.",
    },
    {
      question:
        "وقتي ضيق جداً بسبب العمل أو الدراسة، هل يمكنني الالتزام وتحقيق نتيجة حقيقية؟",
      answer:
        "بالتأكيد؛ التدريب الذكي لا يتطلب قضاء ساعات طويلة داخل النادي. نقوم بتفصيل جدولك وفق الوقت المتاح لديك (سواء 3 أو 4 جلسات أسبوعياً، بمدة 45 دقيقة للجلسة) وبالأدوات المتوفرة لديك (بالنادي أو المنزل)، مع التركيز على التمارين المركبة الأكثر فاعلية.",
    },
    {
      question: "متى أبدأ بملاحظة نتائج ملموسة في شكلي، طاقتي، ومقاساتي؟",
      answer:
        "تبدأ بملاحظة تحسن واضح في طاقتك اليومية وجودة نومك واستشفائك العضلي من الأسبوع الأول، بينما تظهر التغيرات الملموسة في قياسات الجسم وشكل الملابس في المرآة ما بين الأسبوعين الثالث والرابع، شريطة الالتزام بالعجز المحسوب وجدول التمرين.",
    },
    {
      question:
        "لماذا يركز الكابتن على إتقان التكنيك والمدى الحركي الكامل قبل زيادة الأوزان؟",
      answer:
        "لأن رفع وزن ثقيل بتكنيك خاطئ لا يبني عضلات حقيقية بل يجهد المفاصل ويزيد احتمالية الإصابة. الأولوية دائماً هي ضبط المسار الحركي والتحكم الكامل في النزول والصعود؛ وعندما يثبت التكنيك السليم، نبدأ حينها بزيادة التكرارات والجولات والأوزان بأمان.",
    },
    {
      question:
        "ما هو الحل العلمي إذا التزمت بالدايت وتوقف وزني فجأة عن النزول (ثبات الوزن)؟",
      answer:
        "الحل العلمي ليس تقليل الأكل أكثر أو تجويع نفسك، بل أخذ استراحة غذائية (Diet Break) برفع السعرات مؤقتاً لحد المحافظة لمدة 4 إلى 6 أسابيع لاستعادة توازن الهرمونات ومعدل الحرق الطبيعي، ثم نعود لتطبيق عجز تدريجي معتدل (250 إلى 500 سعرة)؛ احسب سعراتك ولا تعذب نفسك.",
    },
    {
      question: "هل من الضروري شراء مكملات غذائية وبروتين بودرة للوصول للهدف؟",
      answer:
        "لا؛ المكمل الوحيد الأساسي والمثبت علمياً الذي يستحق الاستثمار هو 'الكرياتين مونوهيدرات'. أما بروتين البودرة فهو مجرد بديل سريع لسد النقص؛ فإذا كنت تغطي احتياجك اليومي من البروتين عبر الأطعمة الطبيعية (كالبيض والدجاج واللحوم والأسماك) فلن تحتاجه إطلاقاً.",
    },
    {
      question:
        "كيف أتعامل مع العزائم، التجمعات العائلية، والمناسبات الاجتماعية دون تخريب الدايت؟",
      answer:
        "عبر فلسفة التغذية المرنة واحتساب السعرات التراكمية؛ لا تحرم نفسك من الجلسات والولائم ولا تعزل نفسك اجتماعياً، بل وازن سعراتك على مدار اليوم واختر وجباتك بوعي، فالاعتدال هو أساس الاستمرارية، و«كل شيء زاد عن حده انقلب ضده».",
    },
  ],
  en: [
    {
      question:
        "Is this program suitable for a beginner who has never lifted weights before?",
      answer:
        "Yes, absolutely. Starting your fitness journey under a certified physical education and rehab specialist ensures you build proper movement patterns and safeguard your joints from day one. Your training split is tailored step-by-step to match your current conditioning without unnecessary fatigue.",
    },
    {
      question:
        "How does remote coaching work, and how is my exercise technique verified?",
      answer:
        "Communication is direct via WhatsApp. You submit short video clips of your primary compound lifts, and Capt. Abdulrahman analyzes your joint angles, bar trajectory, and eccentric control, returning detailed feedback to ensure maximum muscular engagement and complete safety.",
    },
    {
      question:
        "I have a very busy schedule with work or studies; can I realistically achieve results?",
      answer:
        "Definitely. Smart training is about stimulus, not spending hours in the gym. We design your routine around your available time window (e.g., 3 to 4 focused sessions of 45 minutes) using whatever equipment you have available—whether at a commercial gym or at home.",
    },
    {
      question:
        "How soon can I expect noticeable changes in my body measurements and energy?",
      answer:
        "You will notice improved daytime energy, sleep quality, and muscle recovery within the first week. Visible changes in how your clothes fit and waistline measurements typically become apparent between weeks 3 and 4, provided you adhere to your calculated macros and workouts.",
    },
    {
      question:
        "Why does Coach Al-Houti prioritize full range of motion and form before adding weight?",
      answer:
        "Because lifting heavy with poor mechanics builds joint strain rather than functional muscle. The priority is always mastering the full range of motion and time-under-tension. Once form is 100% locked in, we progressively overload repetitions, sets, and loads with zero injury risk.",
    },
    {
      question:
        "What is the scientific protocol if my weight loss stalls despite strict dieting?",
      answer:
        "The scientific solution is never extreme caloric restriction or starvation. We introduce a structured Diet Break by raising calories to maintenance levels for 4 to 6 weeks to reset metabolic rate and leptin levels, followed by a steady 250–500 kcal deficit. Track your intake smartly without punishing yourself.",
    },
    {
      question:
        "Is it mandatory to buy expensive supplements and protein powder to make progress?",
      answer:
        "Not at all. The primary gold-standard supplement backed by sports science is Creatine Monohydrate. Protein powder is simply a convenient tool to hit daily protein goals; if you meet your requirements through wholesome food, you do not need supplements whatsoever.",
    },
    {
      question:
        "How do I handle social banquets, family feasts, and holidays without breaking my diet?",
      answer:
        "Through flexible dieting principles and daily calorie budgeting. There is no need for social isolation or guilt; balance your meals throughout the day and make mindful choices in moderation, keeping in mind that sustainable balance is the secret to lasting results.",
    },
  ],
};
// src/constants/fitnessData.js (CONTACT_INFO)
export const CONTACT_INFO = {
  phone: "+96562222832",
  displayPhone: "+965 6222 2832",
  whatsappNumber: "96562222832",
  whatsappUrl: "https://wa.me/96562222832",
  instagramUsername: "a_f_alhouti",
  instagramUrl: "https://instagram.com/a_f_alhouti",
  xUsername: "A_F_ALHOUTI",
  xUrl: "https://x.com/A_F_ALHOUTI",
  googleMapsUrl: "https://maps.google.com/?q=Kuwait",
  appleMapsUrl: "https://maps.apple.com/?q=Kuwait",
  address: {
    ar: "دولة الكويت (متاح للتدريب الشخصي الميداني بالأندية المعتمدة، التأهيل الرياضي، والمتابعة الأونلاين)",
    en: "State of Kuwait (Available for In-Gym VIP Coaching, Sports Rehabilitation & Global Online Coaching)",
  },
  workingHours: {
    ar: "السبت إلى الخميس: 9:00 صباحاً - 9:00 مساءً",
    en: "Saturday to Thursday: 9:00 AM – 9:00 PM",
  },
};

export const SPOTLIGHT_REVIEWS = {
  ar: [
    {
      id: "spotlight-1",
      clientName: "أبو فهد الصباح",
      role: "متدرب فئة كبار السن والضغط - الكويت",
      program: "برنامج الرعاية الصحية والمقاومة",
      statNumber: "100%",
      statLabel: "انتظام قراءات الضغط والنشاط",
      duration: "التزام 16 أسبوعاً",
      quote:
        "بفضل الله ثم الخبرة العلمية للكابتن عبدالرحمن في التعامل مع مرضى الضغط والسكري، استعدت قوتي الحركية ونشاطي اليومي بأمان تام وبدون أي إجهاد على المفاصل.",
      rating: 5,
      tag: "أمان طبي وحيوية",
    },
    {
      id: "spotlight-2",
      clientName: "سعود الدوسري",
      role: "تنشيف وخسارة دهون حادة - الكويت",
      program: "برنامج نحت القوام وحرق الدهون",
      statNumber: "-16 كغ",
      statLabel: "خسارة دهون ونحت عضلات البطن",
      duration: "التزام 16 أسبوعاً",
      quote:
        "كنت أعاني من ثبات الوزن وتراكم الدهون لسنوات. خطة الكابتن عبدالرحمن في تمارين المقاومة وحساب السعرات الدقيق خلتني أنزل 16 كيلو دهون صافية بدون ترهلات وبطاقة عالية جداً طوال اليوم.",
      rating: 5,
      tag: "خسارة وزن وتنشيف",
    },
    {
      id: "spotlight-3",
      clientName: "فيصل الهاجري",
      role: "تضخيم وزيادة وزن - الكويت",
      program: "برنامج البناء العضلي وزيادة الوزن الصافي",
      statNumber: "+9 كغ",
      statLabel: "زيادة وزن وكتلة عضلية صافية",
      duration: "التزام 18 أسبوعاً",
      quote:
        "كان عندي صعوبة شديدة في زيادة وزني وضعف في البنية العضلية. مع التوجيه الأكاديمي والجدول الغذائي والتمريني المحسوب، زاد وزني 9 كيلو عضل صافي وتغير شكلي وثقتي بنفسي تماماً.",
      rating: 5,
      tag: "زيادة وزن وتضخيم",
    },
    {
      id: "spotlight-4",
      clientName: "مشاري المطيري",
      role: "لاعب ملاكمة ورياضات قتالية - الكويت",
      program: "برنامج الإعداد البدني للبطولات",
      statNumber: "+25%",
      statLabel: "تطور في القوة والتحمل العضلي",
      duration: "التزام 12 أسبوعاً",
      quote:
        "تجهيز البطولات مع الكابتن عبدالرحمن مختلف تماماً لأنه رياضي سابق ويعرف متطلبات الحلبة. تمارين المقاومة المخصصة رفعت سرعة اللكم والتحمل عندي في الجولات الأخيرة.",
      rating: 5,
      tag: "تجهيز بطولات",
    },
    {
      id: "spotlight-5",
      clientName: "م. جاسم العازمي",
      role: "مهندس - الكويت",
      program: "برنامج إعادة التأهيل الرياضي",
      statNumber: "0%",
      statLabel: "زوال آلام الركبة والكتف",
      duration: "التزام 14 أسبوعاً",
      quote:
        "كنت أعاني من إصابة رياضية منعتني من التمرين لشهور. التدرج الأكاديمي في التأهيل الرياضي مع الكابتن أعادني لرفع الأوزان بثقة أكبر من السابق وبدون ألم.",
      rating: 5,
      tag: "تأهيل رياضي ناجح",
    },
    {
      id: "spotlight-6",
      clientName: "عبدالله الرشيدي",
      role: "لاعب سباحة وألعاب قوى",
      program: "برنامج المقاومة والأداء الرياضي",
      statNumber: "-9 كغ",
      statLabel: "خسارة دهون وزيادة القوة",
      duration: "التزام 12 أسبوعاً",
      quote:
        "الجمع بين الدراسة الأكاديمية في التربية البدنية والخبرة الميدانية واضح في كل تفصيلة بالجدول. برنامج محسوب بدقة عالية ونتائجه ظهرت على أدائي في المسبح والمضمار.",
      rating: 5,
      tag: "بناء علمي",
    },
  ],
  en: [
    {
      id: "spotlight-1",
      clientName: "Abu Fahad",
      role: "Senior & Hypertension Client - Kuwait",
      program: "Medical Care & Resistance Protocol",
      statNumber: "100%",
      statLabel: "Stable BP & Daily Vitality",
      duration: "16 Weeks Adherence",
      quote:
        "Thanks to Capt. Abdulrahman's academic expertise in coaching hypertension and diabetes clients, I regained my mobility and muscular strength safely with zero joint strain.",
      rating: 5,
      tag: "Medical Safety & Vitality",
    },
    {
      id: "spotlight-2",
      clientName: "Saud Al-Dosari",
      role: "Weight Loss & Shredding - Kuwait",
      program: "Body Sculpting & Fat Loss Protocol",
      statNumber: "-16 kg",
      statLabel: "Pure Fat Loss & Defined Abs",
      duration: "16 Weeks Adherence",
      quote:
        "I struggled with weight plateaus for years. Capt. Abdulrahman's structured resistance workouts and precise calorie targets helped me shed 16 kg of pure fat without sagging.",
      rating: 5,
      tag: "Weight Loss & Cut",
    },
    {
      id: "spotlight-3",
      clientName: "Faisal Al-Hajri",
      role: "Muscle Bulk & Weight Gain - Kuwait",
      program: "Hypertrophy & Lean Bulk Protocol",
      statNumber: "+9 kg",
      statLabel: "Pure Lean Muscle Mass Gain",
      duration: "18 Weeks Adherence",
      quote:
        "Gaining weight seemed impossible with my fast metabolism. With Capt. Abdulrahman's scientific surplus diet and training plan, I gained 9 kg of pure muscle mass.",
      rating: 5,
      tag: "Muscle Gain & Bulk",
    },
    {
      id: "spotlight-4",
      clientName: "Meshari Al-Mutairi",
      role: "Competitive Boxer - Kuwait",
      program: "Championship Athletic Prep",
      statNumber: "+25%",
      statLabel: "Power & Endurance Gain",
      duration: "12 Weeks Adherence",
      quote:
        "Preparing for a tournament with Capt. Abdulrahman is unmatched because he understands competitive sports firsthand. Targeted resistance training sky-rocketed my stamina.",
      rating: 5,
      tag: "Championship Prep",
    },
    {
      id: "spotlight-5",
      clientName: "Eng. Jassim Al-Azmi",
      role: "Engineer - Kuwait",
      program: "Sports Injury Rehabilitation",
      statNumber: "0%",
      statLabel: "Knee & Shoulder Pain Eliminated",
      duration: "14 Weeks Adherence",
      quote:
        "An old sports injury kept me out of the gym for months. Capt. Abdulrahman's structured sports rehabilitation protocol brought me back to lifting heavier and completely pain-free.",
      rating: 5,
      tag: "Successful Rehab",
    },
    {
      id: "spotlight-6",
      clientName: "Abdullah Al-Rashidi",
      role: "Swimming & Track Athlete",
      program: "Resistance & Athletic Performance",
      statNumber: "-9 kg",
      statLabel: "Fat Loss & Explosive Strength",
      duration: "12 Weeks Adherence",
      quote:
        "Combining a Physical Education degree with real athletic experience shows in every detail of the program. My speed and body composition improved dramatically.",
      rating: 5,
      tag: "Academic Precision",
    },
  ],
};

export const PAGE_CONTENT = {
  ar: {
    nav: {
      brand: "الكابتن عبدالرحمن الحوطي",
      links: [
        { label: "المنهجية والسيرة", href: "#methodology" },
        { label: "النتائج", href: "#transformations" },
        { label: "الحاسبة", href: "#calculator" },
        { label: "الباقات", href: "#pricing" },
        { label: "الأسئلة الشائعة", href: "#faq" },
      ],
      cta: "ابدأ الآن",
    },
    transformations: {
      title: "نتائج حقيقية مبنية على العلم",
      subtitle: "اسحب المؤشر لمشاهدة الفارق والتحول البدني والتأهيلي للمشتركين",
    },
    testimonials: {
      badge: "ثقة ونتائج ملموسة",
      title: "تجارب الأبطال والمشتركين",
      subtitle:
        "نخبة من الرياضيين والمشتركين يتحدثون عن تجربتهم في التأهيل الرياضي وتمارين المقاومة",
      prevBtn: "السابق",
      nextBtn: "التالي",
    },
    booking: {
      title: "ابدأ رحلتك مع الكابتن عبدالرحمن الحوطي",
      subtitle:
        "قم بتعبئة النموذج ليتم تحليل بياناتك وحالتك البدنية وتجهيز برنامجك التدريبي أو التأهيلي",
    },
    footer: {
      rights: "جميع الحقوق محفوظة للكابتن عبدالرحمن فيصل الحوطي.",
      developedBy: "Developed by mehrad_amin",
    },
    methodology: {
      badge: "خلفية أكاديمية وخبرة ميدانية",
      title: "التخصصات والمسيرة الرياضية",
      subtitle:
        "حاصل على بكالوريوس تربية بدنية ورياضة، متخصص في تمارين المقاومة وإعادة التأهيل الرياضي وتجهيز البطولات",
      mobileCardCta: "اختر الخطة واحصل على برنامجك",
      desktopCardCta: "عرض تفاصيل البرنامج",
      swipeHint: "اسحب لليمين أو اليسار للتنقل بين البرامج التدريبية",
      cardAria: "البرنامج",
    },
    calculator: {
      scannerBadge: "INBODY BIO-SCANNER 4.0",
      resetBtn: "إعادة تعيين البيانات",
      targetLabel: "الهدف اليومي المقترح من السعرات:",
      kcalUnit: "KCAL / DAY",
      bmrLabel: "التمثيل الغذائي BMR:",
      tdeeLabel: "الاحتياج الأساسي TDEE:",
      macros: {
        protein: "بروتين",
        carbs: "كارب",
        fats: "دهون",
      },
      goals: {
        cut: "تنشيف وحرق دهون",
        maintain: "تثبيت وتأهيل بدني",
        bulk: "ضخامة وبناء عضل",
      },
      profileSection: "الملف الفسيولوجي والبدني:",
      genderMale: "ذكر / MALE",
      genderFemale: "أنثى / FEMALE",
      weightLabel: "وزن الجسم",
      heightLabel: "الطول",
      ageLabel: "العمر",
      yearsUnit: "سنة",
      activitySection: "معدل النشاط الأسبوعي:",
      activityLevels: [
        {
          id: "sedentary",
          factor: "1.2",
          label: "قليل الحركة",
          desc: "بدون تمارين",
        },
        { id: "light", factor: "1.375", label: "نشاط خفيف", desc: "1-3 حصص" },
        {
          id: "moderate",
          factor: "1.55",
          label: "نشاط متوسط",
          desc: "3-5 حصص",
        },
        { id: "heavy", factor: "1.725", label: "نشاط مكثف", desc: "6-7 حصص" },
      ],
      ctaPrefix: "احصل على خطتك التدريبية بناءً على",
      ctaSuffix: "سعرة",
    },
  },
  en: {
    nav: {
      brand: "CAPT. ABDULRAHMAN",
      links: [
        { label: "Methodology & Bio", href: "#methodology" },
        { label: "Transformations", href: "#transformations" },
        { label: "Calculator", href: "#calculator" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQs", href: "#faq" },
      ],
      cta: "Get Started",
    },
    transformations: {
      title: "Science-Backed Real Results",
      subtitle:
        "Drag the slider to reveal client transformations & rehab progress",
    },
    testimonials: {
      badge: "Verified Client Journeys",
      title: "Athletes & Clients Speak",
      subtitle:
        "Competitive athletes, seniors, and rehab clients share their journey with Capt. Abdulrahman",
      prevBtn: "Previous",
      nextBtn: "Next",
    },
    booking: {
      title: "Start Your Journey with Capt. Abdulrahman",
      subtitle:
        "Fill out the assessment form to engineer your custom resistance training or rehabilitation roadmap",
    },
    footer: {
      rights: "All rights reserved. Capt. Abdulrahman Faisal Al-Houti.",
      developedBy: "Developed by mehrad_amin",
    },
    methodology: {
      badge: "Academic Credentials & Field Expertise",
      title: "Specialties & Athletic Career",
      subtitle:
        "B.Sc. in Physical Education & Sports, specializing in Resistance Training, Sports Rehab, and Championship Prep",
      mobileCardCta: "Choose Plan & Get Program",
      desktopCardCta: "View Program Details",
      swipeHint: "Swipe left or right to explore training programs",
      cardAria: "Program",
    },
    calculator: {
      scannerBadge: "INBODY BIO-SCANNER 4.0",
      resetBtn: "Reset All Metrics",
      targetLabel: "Target Daily Calorie Intake:",
      kcalUnit: "KCAL / DAY",
      bmrLabel: "Basal Metabolism BMR:",
      tdeeLabel: "Maintenance TDEE:",
      macros: {
        protein: "Protein",
        carbs: "Carbs",
        fats: "Fats",
      },
      goals: {
        cut: "Fat Loss & Cut",
        maintain: "Rehab & Maintenance",
        bulk: "Hypertrophy Bulk",
      },
      profileSection: "Physiological Biometrics:",
      genderMale: "Male / MALE",
      genderFemale: "Female / FEMALE",
      weightLabel: "Body Weight",
      heightLabel: "Height",
      ageLabel: "Age",
      yearsUnit: "Yrs",
      activitySection: "Weekly Activity Level:",
      activityLevels: [
        {
          id: "sedentary",
          factor: "1.2",
          label: "Sedentary",
          desc: "No workout",
        },
        {
          id: "light",
          factor: "1.375",
          label: "Light Activity",
          desc: "1-3 sessions",
        },
        {
          id: "moderate",
          factor: "1.55",
          label: "Moderate Active",
          desc: "3-5 sessions",
        },
        {
          id: "heavy",
          factor: "1.725",
          label: "High Intensity",
          desc: "6-7 sessions",
        },
      ],
      ctaPrefix: "Get Custom Protocol Based on",
      ctaSuffix: "KCAL",
    },
  },
};

export const COACH_CREDENTIALS = {
  images: {
    logo: "/images/coach/logo.jpg",
    formal: "/images/coach/formal.jpg",
    gym: "/images/coach/gym.jpg",
  },
  ar: {
    fullName: "الكابتن عبدالرحمن فيصل الحوطي",
    academicTitle: "بكالوريوس تربية بدنية ورياضة",
    specialization: "متخصص في تمارين المقاومة وإعادة التأهيل الرياضي",
    highlights: [
      "حاصل على بكالوريوس تربية بدنية ورياضة وكتب مقالات علمية عن تمارين المقاومة",
      "متخصص في تمارين المقاومة وإعادة التأهيل الرياضي ودورات التدريب والإسعافات الأولية",
      "أشرف على تجهيز بطولات للاعبين في: السباحة، الملاكمة، ألعاب القوى، وكرة الطائرة",
      "خبرة عملية في تدريب كبار السن ومرضى السكري ومرضى ضغط الدم بأعلى معايير الأمان",
    ],
    positions: [
      {
        period: "2021 - 2022",
        title: "رئيس الجمعية العلمية للتربية البدنية والرياضة (بنين)",
      },
      {
        period: "2022 - 2023",
        title: "نائب رئيس نادي الطموح الرياضي (الاتحاد العام لطلبة التطبيقي)",
      },
      {
        period: "2020",
        title:
          "عضو المركز الرياضي والجمعية المصرية للتربية البدنية وعلوم الرياضة",
      },
      {
        period: "2018 - 2019",
        title: "متطوع في فريق الإسناد والإنقاذ الكويتي",
      },
      {
        period: "2015 - 2019",
        title:
          "مدرب «مجدمي» في لجنة إحياء التراث البحري - النادي البحري الرياضي",
      },
      {
        period: "2016",
        title: "مشارك مع الاتحاد الكشفي للبرلمانيين العرب",
      },
      {
        period: "2008 - 2013",
        title: "لاعب نادي القادسية الرياضي لكرة الطائرة",
      },
    ],
  },
  en: {
    fullName: "Capt. Abdulrahman Faisal Al-Houti",
    academicTitle: "B.Sc. in Physical Education & Sports",
    specialization: "Resistance Training & Sports Rehabilitation Specialist",
    highlights: [
      "B.Sc. in Physical Education & author of academic articles on Resistance Training",
      "Certified in Sports Coaching, Injury Rehabilitation & First Aid",
      "Supervised championship prep for Swimming, Boxing, Athletics & Volleyball athletes",
      "Specialized in safe training protocols for Seniors, Diabetes & Hypertension patients",
    ],
    positions: [
      {
        period: "2021 - 2022",
        title:
          "President of the Scientific Society for Physical Education & Sports",
      },
      {
        period: "2022 - 2023",
        title: "Vice President of Al-Tamooh Sports Club (PAAET Student Union)",
      },
      {
        period: "2020",
        title:
          "Member of the Sports Center & Egyptian Society for Sports Sciences",
      },
      {
        period: "2018 - 2019",
        title: "Volunteer at the Kuwaiti Support and Rescue Team",
      },
      {
        period: "2015 - 2019",
        title:
          "'Majdami' Coach at the Marine Heritage Committee - Kuwait Sea Sport Club",
      },
      {
        period: "2016",
        title: "Participant with the Arab Parliamentarians Scout Union",
      },
      {
        period: "2008 - 2013",
        title: "Al-Qadsia SC Volleyball Player",
      },
    ],
  },
};
