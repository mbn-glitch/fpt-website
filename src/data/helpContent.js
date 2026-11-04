import {
  Rocket, Target, TrendingUp, CreditCard, LineChart, Settings, Monitor, Scale, Handshake,
} from 'lucide-react';

export const categories = [
  {
    id: 'getting-started', slug: 'getting-started', icon: Rocket,
    title: 'Getting Started',
    titles: { ar: 'البداية', fr: 'Commencer', es: 'Empezar', pt: 'Começar', tr: 'Başlangıç' },
    description: 'Everything you need to begin your FPT journey.',
    descriptions: {
      ar: 'كل ما تحتاجه لبدء رحلتك مع FPT.',
      fr: 'Tout ce dont vous avez besoin pour commencer votre parcours FPT.',
      es: 'Todo lo que necesitas para comenzar tu viaje FPT.',
      pt: 'Tudo que você precisa para começar sua jornada FPT.',
      tr: "FPT yolculuğunuza başlamak için ihtiyacınız olan her şey.",
    },
  },
  {
    id: 'challenges-rules', slug: 'challenges-rules', icon: Target,
    title: 'Evaluations & Rules',
    titles: { ar: 'التقييمات والقواعد', fr: 'Évaluations et Règles', es: 'Evaluaciones y Reglas', pt: 'Avaliações e Regras', tr: 'Değerlendirmeler ve Kurallar' },
    description: 'Clear targets. Defined limits. No surprises.',
    descriptions: {
      ar: 'أهداف واضحة. حدود محددة. بدون مفاجآت.',
      fr: 'Objectifs clairs. Limites définies. Pas de surprises.',
      es: 'Objetivos claros. Límites definidos. Sin sorpresas.',
      pt: 'Metas claras. Limites definidos. Sem surpresas.',
      tr: 'Net hedefler. Tanımlanmış sınırlar. Sürpriz yok.',
    },
  },
  {
    id: 'funded-accounts', slug: 'funded-accounts', icon: TrendingUp,
    title: 'Funded Accounts',
    titles: { ar: 'الحسابات الممولة', fr: 'Comptes Financés', es: 'Cuentas Financiadas', pt: 'Contas Financiadas', tr: 'Finanse Edilmiş Hesaplar' },
    description: 'What happens after you pass the evaluation.',
    descriptions: {
      ar: 'ما يحدث بعد اجتياز التقييم.',
      fr: "Ce qui se passe après avoir réussi l’évaluation.",
      es: 'Lo que sucede después de pasar la evaluación.',
      pt: 'O que acontece depois de passar na avaliação.',
      tr: 'Değerlendirmeyi geçtikten sonra ne olur.',
    },
  },
  {
    id: 'payouts-fiper-card', slug: 'payouts-fiper-card', icon: CreditCard,
    title: 'Payouts & Fiper Card',
    titles: { ar: 'الدفعات وبطاقة Fiper', fr: 'Paiements et Fiper Card', es: 'Pagos y Fiper Card', pt: 'Pagamentos e Fiper Card', tr: 'Ödemeler ve Fiper Kartı' },
    description: 'Rewards, how they are paid, and the Fiper Card.',
    descriptions: {
      ar: 'المكافآت وطرق دفعها وبطاقة فايبر.',
      fr: 'Les récompenses, leur mode de paiement et la Fiper Card.',
      es: 'Las recompensas, cómo se pagan y la Fiper Card.',
      pt: 'As recompensas, como são pagas e o Fiper Card.',
      tr: 'Ödüller, nasıl ödendikleri ve Fiper Kartı.',
    },
  },
  {
    id: 'trading-conditions', slug: 'trading-conditions', icon: LineChart,
    title: 'Trading Conditions',
    titles: { ar: 'شروط التداول', fr: 'Conditions de Trading', es: 'Condiciones de Trading', pt: 'Condições de Trading', tr: 'Trading Koşulları' },
    description: 'The environment you trade in.',
    descriptions: {
      ar: 'البيئة التي تتداول فيها.',
      fr: "L’environnement dans lequel vous tradez.",
      es: 'El entorno en el que operas.',
      pt: 'O ambiente em que você opera.',
      tr: 'İşlem yaptığınız ortam.',
    },
  },
  {
    id: 'account-management', slug: 'account-management', icon: Settings,
    title: 'Account Management',
    titles: { ar: 'إدارة الحساب', fr: 'Gestion du Compte', es: 'Gestión de Cuenta', pt: 'Gestão de Conta', tr: 'Hesap Yönetimi' },
    description: 'Managing your accounts, resets, and activity.',
    descriptions: {
      ar: 'إدارة حساباتك وإعادة التعيين والنشاط.',
      fr: 'Gérer vos comptes, réinitialisations et activité.',
      es: 'Gestiona tus cuentas, restablecimientos y actividad.',
      pt: 'Gerencie suas contas, redefinições e atividade.',
      tr: 'Hesaplarınızı, sıfırlamalarınızı ve aktivitenizi yönetin.',
    },
  },
  {
    id: 'technical-platform', slug: 'technical-platform', icon: Monitor,
    title: 'Technical & Platform',
    titles: { ar: 'التقني والمنصة', fr: 'Technique et Plateforme', es: 'Técnico y Plataforma', pt: 'Técnico e Plataforma', tr: 'Teknik ve Platform' },
    description: 'Platforms, logins, and support for technical issues.',
    descriptions: {
      ar: 'المنصات وتسجيل الدخول والدعم للمشكلات التقنية.',
      fr: 'Plateformes, connexions et support pour les problèmes techniques.',
      es: 'Plataformas, inicios de sesión y soporte para problemas técnicos.',
      pt: 'Plataformas, logins e suporte para problemas técnicos.',
      tr: 'Platformlar, girişler ve teknik sorunlar için destek.',
    },
  },
  {
    id: 'legal-general', slug: 'legal-general', icon: Scale,
    title: 'Legal & General',
    titles: { ar: 'القانوني والعام', fr: 'Légal et Général', es: 'Legal y General', pt: 'Legal e Geral', tr: 'Hukuki ve Genel' },
    description: 'Regulatory, legal, and structural information.',
    descriptions: {
      ar: 'معلومات تنظيمية وقانونية وهيكلية.',
      fr: 'Informations réglementaires, juridiques et structurelles.',
      es: 'Información regulatoria, legal y estructural.',
      pt: 'Informações regulatórias, legais e estruturais.',
      tr: 'Düzenleyici, hukuki ve yapısal bilgiler.',
    },
  },
  {
    id: 'partner-program', slug: 'partner-program', icon: Handshake,
    title: 'Partner Program',
    titles: { ar: 'برنامج الشركاء', fr: 'Programme Partenaires', es: 'Programa de Socios', pt: 'Programa de Parceiros', tr: 'Ortaklık Programı' },
    description: 'Earn commissions by referring traders to FPT.',
    descriptions: {
      ar: 'اربح عمولات بإحالة المتداولين إلى FPT.',
      fr: 'Gagnez des commissions en parrainant des traders chez FPT.',
      es: 'Gana comisiones refiriendo traders a FPT.',
      pt: 'Ganhe comissões indicando traders para a FPT.',
      tr: "FPT'ye trader yönlendirerek komisyon kazanın.",
    },
  },
];

export const faqs = [
  {
    id: 'what-is-fpt', categoryId: 'getting-started',
    question: 'What is FPT?',
    questions: { ar: 'ما هو FPT؟', fr: "Qu’est-ce que FPT ?", es: '¿Qué es FPT?', pt: 'O que é FPT?', tr: 'FPT nedir?' },
    answer: 'FPT (Fiper Pro Traders) is a proprietary trading program that provides traders with access to funded accounts through a structured evaluation process. It is the prop trading division of Fiper Global.',
    answers: {
      ar: 'FPT (Fiper Pro Traders) هو برنامج تداول احترافي يتيح للمتداولين الوصول إلى حسابات ممولة من خلال عملية تقييم منظمة. وهو قسم التداول الاحترافي في Fiper Global.',
      fr: "FPT (Fiper Pro Traders) est un programme de trading qui donne accès à des comptes financés via un processus d’évaluation structuré. C’est la division prop trading de Fiper Global.",
      es: 'FPT (Fiper Pro Traders) es un programa de trading propietario que proporciona acceso a cuentas financiadas mediante un proceso de evaluación estructurado.',
      pt: 'FPT (Fiper Pro Traders) é um programa de trading proprietário que fornece acesso a contas financiadas por meio de um processo de avaliação estruturado.',
      tr: "FPT (Fiper Pro Traders), yapılandırılmış bir değerlendirme süreci aracılığıyla trader'lara finanse edilmiş hesaplara erişim sağlayan bir prop trading programıdır.",
    },
  },
  {
    id: 'how-do-i-start', categoryId: 'getting-started', popular: true,
    question: 'How do I start?',
    questions: { ar: 'كيف أبدأ؟', fr: 'Comment commencer ?', es: '¿Cómo empiezo?', pt: 'Como começo?', tr: 'Nasıl başlarım?' },
    answer: 'Choose an account size and buy the evaluation. Your cTrader credentials are made available in the client area after payment confirmation — within 48 hours at the latest.',
    answers: {
      ar: 'اختر حجم الحساب واشترِ التقييم. تُتاح بيانات دخول cTrader في منطقة العميل بعد تأكيد الدفع — خلال 48 ساعة على الأكثر.',
      fr: 'Choisissez une taille de compte et achetez l’évaluation. Vos identifiants cTrader sont mis à disposition dans l’espace client après confirmation du paiement — sous 48 heures au plus tard.',
      es: 'Elige un tamaño de cuenta y compra la evaluación. Tus credenciales de cTrader se ponen a disposición en el área de cliente tras la confirmación del pago — en 48 horas como máximo.',
      pt: 'Escolha um tamanho de conta e compre a avaliação. Suas credenciais do cTrader ficam disponíveis na área do cliente após a confirmação do pagamento — em até 48 horas.',
      tr: 'Bir hesap büyüklüğü seçin ve değerlendirmeyi satın alın. cTrader giriş bilgileriniz ödeme onayından sonra en geç 48 saat içinde müşteri alanında kullanıma sunulur.',
    },
  },
  {
    id: 'do-i-need-prior-experience', categoryId: 'getting-started',
    question: 'Do I need prior experience?',
    questions: { ar: 'هل أحتاج خبرة سابقة؟', fr: "Ai-je besoin d’expérience préalable ?", es: '¿Necesito experiencia previa?', pt: 'Preciso de experiência prévia?', tr: 'Önceden deneyim gerekiyor mu?' },
    answer: 'Yes. FPT is built for traders who already understand core market concepts, order execution, and risk management. It is not a beginner training program.',
    answers: {
      ar: 'نعم. FPT مصمم للمتداولين الذين يفهمون بالفعل مفاهيم السوق الأساسية وتنفيذ الأوامر وإدارة المخاطر. إنه ليس برنامجاً تدريبياً للمبتدئين.',
      fr: "Oui. FPT est conçu pour les traders qui comprennent déjà les concepts fondamentaux, l’exécution des ordres et la gestion des risques.",
      es: 'Sí. FPT está diseñado para traders que ya comprenden los conceptos básicos del mercado, la ejecución de órdenes y la gestión de riesgos.',
      pt: 'Sim. FPT é desenvolvido para traders que já entendem conceitos básicos de mercado, execução de ordens e gestão de risco.',
      tr: 'Evet. FPT, temel piyasa kavramlarını, emir yürütmeyi ve risk yönetimini anlayan traderlar için tasarlanmıştır.',
    },
  },
  {
    id: 'how-do-i-receive-my-account', categoryId: 'getting-started',
    question: 'How do I receive my account?',
    questions: { ar: 'كيف أستلم حسابي؟', fr: 'Comment recevoir mon compte ?', es: '¿Cómo recibo mi cuenta?', pt: 'Como recebo minha conta?', tr: 'Hesabımı nasıl alırım?' },
    answer: 'The cTrader credentials are made available in the client area (and sent by e-mail) after payment confirmation, within 48 hours at the latest. If they are not there, contact support.',
    answers: {
      ar: 'تُتاح بيانات دخول cTrader في منطقة العميل (وتُرسل بالبريد الإلكتروني) بعد تأكيد الدفع، خلال 48 ساعة على الأكثر. إن لم تجدها فتواصل مع الدعم.',
      fr: 'Les identifiants cTrader sont mis à disposition dans l’espace client (et envoyés par e-mail) après confirmation du paiement, sous 48 heures au plus tard. S’ils n’y sont pas, contactez le support.',
      es: 'Las credenciales de cTrader se ponen a disposición en el área de cliente (y se envían por correo) tras la confirmación del pago, en 48 horas como máximo. Si no están, contacta con soporte.',
      pt: 'As credenciais do cTrader ficam disponíveis na área do cliente (e são enviadas por e-mail) após a confirmação do pagamento, em até 48 horas. Se não estiverem lá, contate o suporte.',
      tr: 'cTrader giriş bilgileri ödeme onayından sonra en geç 48 saat içinde müşteri alanında kullanıma sunulur (ve e-posta ile gönderilir). Orada değilse destekle iletişime geçin.',
    },
  },
  {
    id: 'how-much-does-a-challenge-cost', categoryId: 'getting-started', popular: true,
    question: 'How much does an evaluation cost?',
    questions: { ar: 'كم يكلف التقييم؟', fr: 'Combien coûte une évaluation ?', es: '¿Cuánto cuesta una evaluación?', pt: 'Quanto custa uma avaliação?', tr: 'Değerlendirme ne kadar?' },
    answer: 'The fee is one-time: 90 USD for 10,000 USD, 160 USD for 25,000 USD, 280 USD for 50,000 USD, 540 USD for 100,000 USD and 1,070 USD for 200,000 USD.',
    answers: {
      ar: 'الرسم يُدفع لمرة واحدة: 90 USD لحجم 10,000 USD، و160 USD لحجم 25,000 USD، و280 USD لحجم 50,000 USD، و540 USD لحجم 100,000 USD، و1,070 USD لحجم 200,000 USD.',
      fr: 'Les frais sont uniques : 90 USD pour 10,000 USD, 160 USD pour 25,000 USD, 280 USD pour 50,000 USD, 540 USD pour 100,000 USD et 1,070 USD pour 200,000 USD.',
      es: 'La tarifa es única: 90 USD por 10,000 USD, 160 USD por 25,000 USD, 280 USD por 50,000 USD, 540 USD por 100,000 USD y 1,070 USD por 200,000 USD.',
      pt: 'A taxa é única: 90 USD para 10,000 USD, 160 USD para 25,000 USD, 280 USD para 50,000 USD, 540 USD para 100,000 USD e 1,070 USD para 200,000 USD.',
      tr: 'Ücret tek seferliktir: 10,000 USD için 90 USD, 25,000 USD için 160 USD, 50,000 USD için 280 USD, 100,000 USD için 540 USD ve 200,000 USD için 1,070 USD.',
    },
  },
  {
    id: 'what-trading-styles-work-best', categoryId: 'getting-started',
    question: 'What trading styles work best with FPT?',
    questions: { ar: 'ما أساليب التداول الأنسب مع FPT؟', fr: 'Quels styles de trading fonctionnent le mieux ?', es: '¿Qué estilos de trading funcionan mejor?', pt: 'Quais estilos de trading funcionam melhor?', tr: 'Hangi trading stilleri en iyi çalışır?' },
    answer: 'FPT accommodates scalping, day trading, swing trading, and algorithmic execution via EAs. High-frequency trading and arbitrage strategies are not permitted.',
    answers: {
      ar: 'يستوعب FPT التداول السريع والتداول اليومي وتداول التأرجح والتنفيذ الخوارزمي. استراتيجيات HFT والمراجحة غير مسموح بها.',
      fr: "FPT accepte le scalping, le day trading, le swing trading et l’exécution algorithmique. Le HFT et l’arbitrage ne sont pas permis.",
      es: 'FPT admite scalping, day trading, swing trading y EAs. El HFT y el arbitraje no están permitidos.',
      pt: 'FPT acomoda scalping, day trading, swing trading e EAs. HFT e arbitragem não são permitidos.',
      tr: 'FPT scalping, day trading, swing trading ve EA destekler. HFT ve arbitraja izin verilmez.',
    },
  },
  {
    id: 'can-i-test-a-demo-account', categoryId: 'getting-started',
    question: 'Can I test a demo account before purchasing?',
    questions: { ar: 'هل يمكنني تجربة حساب تجريبي قبل الشراء؟', fr: "Puis-je tester un compte démo avant d’acheter ?", es: '¿Puedo probar una cuenta demo antes de comprar?', pt: 'Posso testar uma conta demo antes de comprar?', tr: 'Satın almadan önce demo hesabı test edebilir miyim?' },
    answer: 'FPT does not offer a free demo. However, all evaluation accounts operate in a simulated environment — purchasing an evaluation is the equivalent of starting a monitored demo with the opportunity to earn.',
    answers: {
      ar: 'لا يقدم FPT تجربة مجانية. ومع ذلك، تعمل جميع حسابات التقييم في بيئة محاكاة.',
      fr: "FPT n’offre pas de démo gratuite. Les comptes d’évaluation fonctionnent dans un environnement simulé.",
      es: 'FPT no ofrece una demo gratuita. Las cuentas de evaluación operan en entorno simulado.',
      pt: 'FPT não oferece demo gratuita. As contas de avaliação operam em ambiente simulado.',
      tr: 'FPT ücretsiz demo sunmaz. Değerlendirme hesapları simüle ortamda çalışır.',
    },
  },
  {
    id: 'what-is-the-profit-target', categoryId: 'challenges-rules', popular: true,
    question: 'What is the profit target?',
    questions: { ar: 'ما هو هدف الربح؟', fr: "Quel est l’objectif de profit ?", es: '¿Cuál es el objetivo de ganancia?', pt: 'Qual é a meta de lucro?', tr: 'Kar hedefi nedir?' },
    answer: '10% of the starting account balance during the evaluation phase.',
    answers: {
      ar: '10% من رصيد الحساب الابتدائي خلال مرحلة التقييم.',
      fr: "10 % du solde initial du compte pendant la phase d’évaluation.",
      es: '10% del saldo inicial de la cuenta durante la fase de evaluación.',
      pt: '10% do saldo inicial da conta durante a fase de avaliação.',
      tr: "Değerlendirme aşamasında başlangıç hesap bakiyesinin %10'u.",
    },
  },
  {
    id: 'what-is-the-maximum-daily-loss', categoryId: 'challenges-rules',
    question: 'What is the maximum daily loss?',
    questions: { ar: 'ما الحد الأقصى للخسارة اليومية؟', fr: 'Quelle est la perte quotidienne maximale ?', es: '¿Cuál es la pérdida diaria máxima?', pt: 'Qual é a perda diária máxima?', tr: 'Maksimum günlük kayıp nedir?' },
    answer: '5 %: equity must not fall below 95 % of the day-start equity, measured at 00:00 Dubai time and reset daily at that hour. Floating losses of open positions count.',
    answers: {
      ar: '5 %: يجب ألا تنخفض حقوق الحساب دون 95 % من حقوق الحساب في بداية اليوم، المقيسة في الساعة 00:00 بتوقيت دبي والمعاد ضبطها يومياً في تلك الساعة. الخسائر العائمة للمراكز المفتوحة تُحتسب.',
      fr: '5 % : l’equity ne doit pas descendre sous 95 % de l’equity de début de journée, mesurée à 00:00 heure de Dubaï et réinitialisée chaque jour à cette heure. Les pertes flottantes des positions ouvertes comptent.',
      es: '5 %: el equity no debe caer por debajo del 95 % del equity de inicio del día, medido a las 00:00 hora de Dubái y reiniciado cada día a esa hora. Las pérdidas flotantes de las posiciones abiertas cuentan.',
      pt: '5 %: o patrimônio não pode cair abaixo de 95 % do patrimônio de início do dia, medido às 00:00 no horário de Dubai e reiniciado diariamente nessa hora. Perdas flutuantes de posições abertas contam.',
      tr: '%5: özkaynak, Dubai saatiyle 00:00’da ölçülen ve her gün o saatte sıfırlanan gün başı özkaynağının %95’inin altına düşmemelidir. Açık pozisyonların dalgalı zararları sayılır.',
    },
  },
  {
    id: 'what-is-the-maximum-total-drawdown', categoryId: 'challenges-rules',
    question: 'What is the maximum total drawdown?',
    questions: { ar: 'ما الحد الأقصى للسحب الإجمالي؟', fr: 'Quel est le drawdown total maximum ?', es: '¿Cuál es el drawdown total máximo?', pt: 'Qual é o drawdown total máximo?', tr: 'Maksimum toplam drawdown nedir?' },
    answer: '9% of the initial account balance, measured from the starting equity.',
    answers: {
      ar: '9% من رصيد الحساب الابتدائي، مقاساً من حقوق الملكية الأولية.',
      fr: "9 % du solde initial, mesuré depuis l’équité de départ.",
      es: '9% del saldo inicial de la cuenta, medido desde el capital inicial.',
      pt: '9% do saldo inicial da conta, medido a partir do patrimônio inicial.',
      tr: "Başlangıç öz sermayesinden ölçülen hesap bakiyesinin %9'u.",
    },
  },
  {
    id: 'how-is-drawdown-calculated', categoryId: 'challenges-rules',
    question: 'How is drawdown calculated — based on equity or balance?',
    questions: { ar: 'كيف يُحسب السحب؟', fr: 'Comment le drawdown est-il calculé ?', es: '¿Cómo se calcula el drawdown?', pt: 'Como o drawdown é calculado?', tr: 'Drawdown nasıl hesaplanır?' },
    answer: 'The daily limit is measured against the day-start equity (00:00 Dubai time); the maximum loss limit against the initial balance (equity must stay above 91 %). Both include the floating P&L of open positions; rewards paid are deducted from the balance.',
    answers: {
      ar: 'يُقاس الحد اليومي على حقوق الحساب في بداية اليوم (00:00 بتوقيت دبي)؛ ويُقاس حد الخسارة القصوى على الرصيد الابتدائي (يجب أن تبقى حقوق الحساب فوق 91 %). كلاهما يشمل الربح/الخسارة العائمة للمراكز المفتوحة؛ وتُخصم المكافآت المدفوعة من الرصيد.',
      fr: 'La limite quotidienne se mesure sur l’equity de début de journée (00:00 heure de Dubaï) ; la limite de perte maximale sur le solde initial (l’equity doit rester au-dessus de 91 %). Les deux incluent le P&L flottant des positions ouvertes ; les récompenses payées sont déduites du solde.',
      es: 'El límite diario se mide sobre el equity de inicio del día (00:00 hora de Dubái); el límite de pérdida máxima sobre el saldo inicial (el equity debe mantenerse por encima del 91 %). Ambos incluyen el P&L flotante de las posiciones abiertas; las recompensas pagadas se deducen del saldo.',
      pt: 'O limite diário é medido sobre o patrimônio de início do dia (00:00 horário de Dubai); o limite de perda máxima sobre o saldo inicial (o patrimônio deve ficar acima de 91 %). Ambos incluem o P&L flutuante das posições abertas; as recompensas pagas são deduzidas do saldo.',
      tr: 'Günlük limit gün başı özkaynağına (Dubai saatiyle 00:00) göre, azami zarar limiti başlangıç bakiyesine göre ölçülür (özkaynak %91’in üzerinde kalmalıdır). İkisi de açık pozisyonların dalgalı K/Z’sini içerir; ödenen ödüller bakiyeden düşülür.',
    },
  },
  {
    id: 'does-daily-drawdown-reset', categoryId: 'challenges-rules',
    question: 'Does the daily drawdown reset each day?',
    questions: { ar: 'هل يُعاد تعيين السحب اليومي كل يوم؟', fr: 'Le drawdown quotidien se réinitialise-t-il ?', es: '¿Se reinicia el drawdown diario?', pt: 'O drawdown diário é reiniciado?', tr: 'Günlük drawdown her gün sıfırlanır mı?' },
    answer: 'Yes. The day-start equity is measured at 00:00 Dubai time every day.',
    answers: {
      ar: 'نعم. تُقاس حقوق الحساب في بداية اليوم في الساعة 00:00 بتوقيت دبي كل يوم.',
      fr: 'Oui. L’equity de début de journée est mesurée chaque jour à 00:00 heure de Dubaï.',
      es: 'Sí. El equity de inicio del día se mide cada día a las 00:00 hora de Dubái.',
      pt: 'Sim. O patrimônio de início do dia é medido todos os dias às 00:00 no horário de Dubai.',
      tr: 'Evet. Gün başı özkaynağı her gün Dubai saatiyle 00:00’da ölçülür.',
    },
  },
  {
    id: 'what-counts-as-a-trading-day', categoryId: 'challenges-rules',
    question: 'What counts as a trading day?',
    questions: { ar: 'ما الذي يُحتسب يوم تداول؟', fr: "Qu’est-ce qui compte comme un jour de trading ?", es: '¿Qué cuenta como día de trading?', pt: 'O que conta como dia de trading?', tr: 'Trading günü ne sayılır?' },
    answer: 'A calendar day, Dubai time, on which at least one position is open at some instant.',
    answers: {
      ar: 'يوم تقويمي بتوقيت دبي يكون فيه مركز واحد على الأقل مفتوحاً في لحظة ما.',
      fr: 'Un jour calendaire, heure de Dubaï, pendant lequel au moins une position est ouverte à un instant donné.',
      es: 'Un día natural, hora de Dubái, en el que al menos una posición esté abierta en algún momento.',
      pt: 'Um dia civil, no horário de Dubai, em que pelo menos uma posição esteja aberta em algum instante.',
      tr: 'Dubai saatiyle, bir anda en az bir pozisyonun açık olduğu bir takvim günü.',
    },
  },
  {
    id: 'what-are-the-minimum-trading-days', categoryId: 'challenges-rules',
    question: 'What are the minimum trading days?',
    questions: { ar: 'ما الحد الأدنى لأيام التداول؟', fr: 'Quel est le minimum de jours de trading ?', es: '¿Cuál es el mínimo de días de trading?', pt: 'Qual é o mínimo de dias de trading?', tr: 'Minimum trading günü sayısı nedir?' },
    answer: 'The single evaluation phase requires a minimum of 5 trading days. Funded accounts require a minimum of 10 trading days before a payout request is eligible.',
    answers: {
      ar: 'تتطلب مرحلة التقييم الوحيدة 5 أيام تداول كحد أدنى. تتطلب الحسابات الممولة 10 أيام قبل أن يكون طلب الدفع مؤهلاً.',
      fr: "L'unique phase d'évaluation nécessite au minimum 5 jours de trading. Les comptes financés nécessitent 10 jours avant d'être éligibles.",
      es: 'La única fase de evaluación requiere un mínimo de 5 días de trading. Las cuentas financiadas requieren 10 días.',
      pt: 'A única fase de avaliação requer um mínimo de 5 dias de trading. Contas financiadas requerem 10 dias.',
      tr: 'Tek değerlendirme aşaması minimum 5 trading günü gerektirir. Finanse edilmiş hesaplar 10 gün gerektirir.',
    },
  },
  {
    id: 'is-there-a-time-limit', categoryId: 'challenges-rules',
    question: 'Is there a time limit?',
    questions: { ar: 'هل هناك حد زمني؟', fr: 'Y a-t-il une limite de temps ?', es: '¿Hay un límite de tiempo?', pt: 'Existe limite de tempo?', tr: 'Zaman sınırı var mı?' },
    answer: 'Yes. The evaluation phase has a 31-day time limit.',
    answers: {
      ar: 'نعم. مرحلة التقييم لها حد زمني مدته 31 يوماً.',
      fr: "Oui. La phase d’évaluation a une limite de 31 jours.",
      es: 'Sí. La fase de evaluación tiene un límite de 31 días.',
      pt: 'Sim. A fase de avaliação tem limite de 31 dias.',
      tr: 'Evet. Değerlendirme aşamasının 31 günlük zaman sınırı vardır.',
    },
  },
  {
    id: 'what-happens-if-i-break-a-rule', categoryId: 'challenges-rules', popular: true,
    question: 'What happens if I break a rule?',
    questions: { ar: 'ماذا يحدث إذا خالفت قاعدة؟', fr: 'Que se passe-t-il si je viole une règle ?', es: '¿Qué pasa si incumplo una regla?', pt: 'O que acontece se eu quebrar uma regra?', tr: 'Bir kuralı ihlal edersem ne olur?' },
    answer: 'The account is marked as failed and trading access is revoked. The evaluation fee is non-refundable.',
    answers: {
      ar: 'يُصنَّف الحساب على أنه فاشل وتُسحب صلاحية التداول. رسوم التقييم غير قابلة للاسترداد.',
      fr: "Le compte est marqué comme échoué et l’accès au trading est révoqué. Les frais sont non remboursables.",
      es: 'La cuenta se marca como fallida y se revoca el acceso. La tarifa no es reembolsable.',
      pt: 'A conta é marcada como reprovada e o acesso é revogado. A taxa não é reembolsável.',
      tr: 'Hesap başarısız olarak işaretlenir ve erişim iptal edilir. Ücret iade edilmez.',
    },
  },
  {
    id: 'can-i-try-again-if-i-fail', categoryId: 'challenges-rules',
    question: 'Can I try again if I fail?',
    questions: { ar: 'هل يمكنني المحاولة مجدداً إذا فشلت؟', fr: "Puis-je réessayer si j’échoue ?", es: '¿Puedo intentarlo de nuevo si fallo?', pt: 'Posso tentar de novo se falhar?', tr: 'Başarısız olursam tekrar deneyebilir miyim?' },
    answer: 'Yes. You can purchase a new evaluation at any time. There is no waiting period between attempts.',
    answers: {
      ar: 'نعم. يمكنك شراء تحدٍّ جديد في أي وقت. لا توجد فترة انتظار بين المحاولات.',
      fr: "Oui. Vous pouvez acheter une nouvelle évaluation à tout moment. Il n’y a pas de période d’attente.",
      es: 'Sí. Puedes comprar una nueva evaluación en cualquier momento. No hay período de espera.',
      pt: 'Sim. Você pode comprar uma nova avaliação a qualquer momento. Não há período de espera.',
      tr: 'Evet. İstediğiniz zaman yeni bir değerlendirme satın alabilirsiniz.',
    },
  },
  {
    id: 'is-there-a-refund', categoryId: 'challenges-rules',
    question: 'Is there a refund?',
    questions: { ar: 'هل هناك استرداد؟', fr: 'Y a-t-il un remboursement ?', es: '¿Hay reembolso?', pt: 'Há reembolso?', tr: 'Geri ödeme var mı?' },
    answer: 'The fee is refundable only before your account is delivered (an order cancelled before delivery is refunded in full) and in the cases listed in the Refund and Cancellation Policy: a duplicate charge, non-delivery within 48 hours attributable to the Company, a proven technical failure before any trade, or a statutory right. After delivery the fee is non-refundable.',
    answers: {
      ar: 'لا يُسترد الرسم إلا قبل تسليم حسابك (الطلب الملغى قبل التسليم يُسترد كاملاً) وفي الحالات المذكورة في سياسة الاسترداد والإلغاء: خصم مكرر، أو عدم التسليم خلال 48 ساعة لسبب يعود إلى الشركة، أو عطل تقني مثبت قبل أي صفقة، أو حق قانوني. وبعد التسليم يصبح الرسم غير قابل للاسترداد.',
      fr: 'Les frais ne sont remboursables qu’avant la livraison de votre compte (une commande annulée avant livraison est remboursée en totalité) et dans les cas prévus par la politique de remboursement et d’annulation : double prélèvement, non-livraison sous 48 heures imputable à la Société, panne technique avérée avant tout trade, ou droit légal. Après livraison, les frais ne sont pas remboursables.',
      es: 'La tarifa solo se reembolsa antes de la entrega de tu cuenta (un pedido cancelado antes de la entrega se reembolsa íntegramente) y en los casos previstos en la política de reembolso y cancelación: cargo duplicado, no entrega en 48 horas atribuible a la Empresa, fallo técnico probado antes de cualquier operación, o un derecho legal. Tras la entrega, la tarifa no es reembolsable.',
      pt: 'A taxa só é reembolsável antes da entrega da sua conta (um pedido cancelado antes da entrega é reembolsado integralmente) e nos casos previstos na política de reembolso e cancelamento: cobrança duplicada, não entrega em 48 horas atribuível à Empresa, falha técnica comprovada antes de qualquer operação, ou um direito legal. Após a entrega, a taxa não é reembolsável.',
      tr: 'Ücret yalnızca hesabınız teslim edilmeden önce (teslimattan önce iptal edilen sipariş tam iade edilir) ve iade ve iptal politikasında sayılan durumlarda iade edilir: mükerrer tahsilat, Şirkete atfedilebilen 48 saat içinde teslim edilmeme, herhangi bir işlemden önce kanıtlanmış teknik arıza veya yasal bir hak. Teslimattan sonra ücret iade edilmez.',
    },
  },
  {
    id: 'what-happens-after-i-pass', categoryId: 'funded-accounts',
    question: 'What happens after I pass?',
    questions: { ar: 'ماذا يحدث بعد أن أجتاز؟', fr: "Que se passe-t-il après avoir réussi ?", es: '¿Qué pasa después de pasar?', pt: 'O que acontece depois de passar?', tr: 'Geçtikten sonra ne olur?' },
    answer: 'After the pass is verified and the absence of prohibited practices confirmed, a funded account with the same initial balance is delivered within 2 business days (Dubai time).',
    answers: {
      ar: 'بعد التحقق من الاجتياز وعدم وجود ممارسات محظورة، يُسلَّم حساب ممول بالرصيد الابتدائي نفسه خلال يومي عمل (بتوقيت دبي).',
      fr: 'Après vérification de la réussite et de l’absence de pratiques interdites, un compte financé avec le même solde initial est livré sous 2 jours ouvrés (heure de Dubaï).',
      es: 'Tras verificar el aprobado y la ausencia de prácticas prohibidas, se entrega una cuenta financiada con el mismo saldo inicial en 2 días hábiles (hora de Dubái).',
      pt: 'Após a verificação da aprovação e da ausência de práticas proibidas, uma conta financiada com o mesmo saldo inicial é entregue em até 2 dias úteis (horário de Dubai).',
      tr: 'Geçişin doğrulanması ve yasaklı uygulama bulunmadığının teyidinden sonra, aynı başlangıç bakiyesine sahip finanse edilmiş bir hesap 2 iş günü içinde (Dubai saati) teslim edilir.',
    },
  },
  {
    id: 'how-long-does-activation-take', categoryId: 'funded-accounts', popular: true,
    question: 'How long does activation take?',
    questions: { ar: 'كم يستغرق التفعيل؟', fr: "Combien de temps prend l’activation ?", es: '¿Cuánto tarda la activación?', pt: 'Quanto tempo leva a ativação?', tr: 'Aktivasyon ne kadar sürer?' },
    answer: 'Within 2 business days (Monday to Friday, Dubai time) after the pass is verified.',
    answers: {
      ar: 'خلال يومي عمل (من الاثنين إلى الجمعة بتوقيت دبي) بعد التحقق من الاجتياز.',
      fr: 'Sous 2 jours ouvrés (du lundi au vendredi, heure de Dubaï) après vérification de la réussite.',
      es: 'En 2 días hábiles (de lunes a viernes, hora de Dubái) tras la verificación del aprobado.',
      pt: 'Em até 2 dias úteis (segunda a sexta, horário de Dubai) após a verificação da aprovação.',
      tr: 'Geçiş doğrulandıktan sonra 2 iş günü içinde (Pazartesi–Cuma, Dubai saati).',
    },
  },
  {
    id: 'how-much-profit-can-i-keep', categoryId: 'funded-accounts', popular: true,
    question: 'How much profit can I keep?',
    questions: { ar: 'كم يمكنني الاحتفاظ من الأرباح؟', fr: 'Combien de profit puis-je garder ?', es: '¿Cuánto beneficio puedo conservar?', pt: 'Quanto lucro posso guardar?', tr: 'Ne kadar kar tutabilirim?' },
    answer: 'You receive up to 80% of the net profit generated on your funded account. FPT retains the remaining 20%.',
    answers: {
      ar: 'تحصل على ما يصل إلى 80% من صافي الربح المحقق على حسابك الممول.',
      fr: "Vous recevez jusqu’à 80 % du bénéfice net. FPT conserve les 20 % restants.",
      es: 'Recibes hasta el 80% del beneficio neto. FPT retiene el 20% restante.',
      pt: 'Você recebe até 80% do lucro líquido. FPT retém os 20% restantes.',
      tr: "Finanse edilmiş hesabınızda elde edilen net kârın %80'ine kadarını alırsınız.",
    },
  },
  {
    id: 'can-i-have-multiple-funded-accounts', categoryId: 'funded-accounts',
    question: 'Can I have multiple funded accounts?',
    questions: { ar: 'هل يمكنني الحصول على حسابات ممولة متعددة؟', fr: 'Puis-je avoir plusieurs comptes financés ?', es: '¿Puedo tener varias cuentas financiadas?', pt: 'Posso ter várias contas financiadas?', tr: 'Birden fazla finanse edilmiş hesabım olabilir mi?' },
    answer: 'Yes. Each trader can operate up to 10 active funded accounts simultaneously.',
    answers: {
      ar: 'نعم. يمكن لكل متداول تشغيل ما يصل إلى 10 حسابات ممولة نشطة في وقت واحد.',
      fr: "Oui. Chaque trader peut opérer jusqu’à 10 comptes financés actifs simultanément.",
      es: 'Sí. Cada trader puede operar hasta 10 cuentas financiadas activas simultáneamente.',
      pt: 'Sim. Cada trader pode operar até 10 contas financiadas ativas simultaneamente.',
      tr: 'Evet. Her trader aynı anda 10 aktif finanse edilmiş hesap işletebilir.',
    },
  },
  {
    id: 'do-funded-accounts-follow-same-rules', categoryId: 'funded-accounts',
    question: 'Do funded accounts follow the same rules as the evaluation?',
    questions: { ar: 'هل تتبع الحسابات الممولة نفس قواعد التقييم؟', fr: 'Les comptes financés suivent-ils les mêmes règles ?', es: '¿Las cuentas financiadas siguen las mismas reglas?', pt: 'As contas financiadas seguem as mesmas regras?', tr: 'Finanse edilmiş hesaplar aynı kuralları takip ediyor mu?' },
    answer: 'The core risk parameters remain — daily drawdown, maximum drawdown, and minimum trading days. The profit target no longer applies.',
    answers: {
      ar: 'تبقى معاملات المخاطر الأساسية — السحب اليومي والسحب الأقصى والحد الأدنى لأيام التداول. لا ينطبق هدف الربح بعد الآن.',
      fr: "Les paramètres de risque principaux restent. L’objectif de profit ne s’applique plus.",
      es: 'Los parámetros de riesgo principales permanecen. El objetivo de ganancia ya no aplica.',
      pt: 'Os parâmetros de risco principais permanecem. A meta de lucro não se aplica mais.',
      tr: 'Temel risk parametreleri kalır. Kar hedefi artık geçerli değildir.',
    },
  },
  {
    id: 'is-there-a-scaling-plan', categoryId: 'funded-accounts',
    question: 'Is there a scaling plan as I grow?',
    questions: { ar: 'هل هناك خطة تطوير مع نموي؟', fr: 'Y a-t-il un plan de scaling ?', es: '¿Hay un plan de escalado?', pt: 'Há um plano de escalabilidade?', tr: 'Büyüdükçe ölçekleme planı var mı?' },
    answer: 'No scaling plan is offered at present.',
    answers: {
      ar: 'لا تُقدَّم خطة تطوير للحساب حالياً.',
      fr: 'Aucun plan de scaling n’est proposé pour le moment.',
      es: 'Por el momento no se ofrece ningún plan de escalado.',
      pt: 'No momento não é oferecido nenhum plano de escalabilidade.',
      tr: 'Şu anda bir ölçekleme planı sunulmamaktadır.',
    },
  },
  {
    id: 'when-can-i-withdraw-profits', categoryId: 'payouts-fiper-card', popular: true,
    question: 'When can I withdraw profits?',
    questions: { ar: 'متى يمكنني سحب الأرباح؟', fr: 'Quand puis-je retirer mes bénéfices ?', es: '¿Cuándo puedo retirar ganancias?', pt: 'Quando posso sacar lucros?', tr: 'Karları ne zaman çekebilirim?' },
    answer: 'A reward requires at least 10 trading days on the funded account, a completed 14-day cycle, a closed balance above the initial balance and a client share of at least 100 USD; each request is capped at 10,000 USD. Identity verification precedes the first reward.',
    answers: {
      ar: 'تتطلب المكافأة 10 أيام تداول على الأقل على الحساب الممول، واكتمال دورة مدتها 14 يوماً، ورصيداً مغلقاً يتجاوز الرصيد الابتدائي، وحصة للعميل لا تقل عن 100 USD؛ وسقف كل طلب 10,000 USD. ويسبق التحقق من الهوية المكافأة الأولى.',
      fr: 'Une récompense exige au moins 10 jours de trading sur le compte financé, un cycle complet de 14 jours, un solde clôturé supérieur au solde initial et une part client d’au moins 100 USD ; chaque demande est plafonnée à 10,000 USD. La vérification d’identité précède la première récompense.',
      es: 'Una recompensa requiere al menos 10 días de trading en la cuenta financiada, un ciclo completo de 14 días, un saldo cerrado superior al saldo inicial y una parte del cliente de al menos 100 USD; cada solicitud tiene un tope de 10,000 USD. La verificación de identidad precede a la primera recompensa.',
      pt: 'Uma recompensa exige pelo menos 10 dias de trading na conta financiada, um ciclo completo de 14 dias, um saldo fechado acima do saldo inicial e uma parte do cliente de pelo menos 100 USD; cada pedido tem teto de 10,000 USD. A verificação de identidade precede a primeira recompensa.',
      tr: 'Bir ödül için finanse edilmiş hesapta en az 10 işlem günü, tamamlanmış 14 günlük bir döngü, başlangıç bakiyesinin üzerinde kapalı bir bakiye ve en az 100 USD müşteri payı gerekir; her talep 10,000 USD ile sınırlıdır. İlk ödülden önce kimlik doğrulaması yapılır.',
    },
  },
  {
    id: 'what-payout-methods-are-available', categoryId: 'payouts-fiper-card',
    question: 'What payout methods are available?',
    questions: { ar: 'ما طرق الدفع المتاحة؟', fr: 'Quelles méthodes de paiement sont disponibles ?', es: '¿Qué métodos de pago están disponibles?', pt: 'Quais métodos de pagamento estão disponíveis?', tr: 'Hangi ödeme yöntemleri mevcut?' },
    answer: 'Rewards are paid by crypto-currency or by internal transfer to your account with Fiper.',
    answers: {
      ar: 'تُدفع المكافآت بالعملات الرقمية أو بتحويل داخلي إلى حسابك لدى Fiper.',
      fr: 'Les récompenses sont payées en crypto-monnaie ou par transfert interne vers votre compte chez Fiper.',
      es: 'Las recompensas se pagan en criptomoneda o por transferencia interna a tu cuenta en Fiper.',
      pt: 'As recompensas são pagas em criptomoeda ou por transferência interna para a sua conta na Fiper.',
      tr: 'Ödüller kripto para ile veya Fiper’daki hesabınıza dahili transferle ödenir.',
    },
  },
  {
    id: 'can-i-access-my-funds-faster', categoryId: 'payouts-fiper-card',
    question: 'Can I access my funds faster?',
    questions: { ar: 'هل يمكنني الوصول إلى أموالي بشكل أسرع؟', fr: 'Puis-je accéder à mes fonds plus rapidement ?', es: '¿Puedo acceder a mis fondos más rápido?', pt: 'Posso acessar meus fundos mais rápido?', tr: 'Fonlarıma daha hızlı erişebilir miyim?' },
    answer: 'No. Rewards follow the 14-day cycle and are paid by crypto-currency or by internal transfer to your account with Fiper.',
    answers: {
      ar: 'لا. تتبع المكافآت دورة الـ14 يوماً وتُدفع بالعملات الرقمية أو بتحويل داخلي إلى حسابك لدى Fiper.',
      fr: 'Non. Les récompenses suivent le cycle de 14 jours et sont payées en crypto-monnaie ou par transfert interne vers votre compte chez Fiper.',
      es: 'No. Las recompensas siguen el ciclo de 14 días y se pagan en criptomoneda o por transferencia interna a tu cuenta en Fiper.',
      pt: 'Não. As recompensas seguem o ciclo de 14 dias e são pagas em criptomoeda ou por transferência interna para a sua conta na Fiper.',
      tr: 'Hayır. Ödüller 14 günlük döngüyü izler ve kripto para ile veya Fiper’daki hesabınıza dahili transferle ödenir.',
    },
  },
  {
    // Owner decision 6 (1 Nov 2026 23:08): the ONE wording about the Fiper Card — the owner's sentence, nothing else
    id: 'how-do-i-use-the-fiper-card', categoryId: 'payouts-fiper-card',
    question: 'How do I use the Fiper Card?',
    questions: { ar: 'كيف أستخدم بطاقة فايبر؟', fr: 'Comment utiliser la Fiper Card ?', es: '¿Cómo uso la Fiper Card?', pt: 'Como uso o Fiper Card?', tr: 'Fiper Kartını nasıl kullanırım?' },
    answer: 'The client issues the Fiper Card from inside Fiper, then transfers their balance to their account with Fiper, and uses the card normally.',
    answers: {
      ar: 'يُصدر العميل بطاقة فايبر من داخل فايبر، ثم يحوّل رصيده إلى حسابه في فايبر، ويستخدم بطاقته بشكل طبيعي.',
      fr: 'Le client émet la Fiper Card depuis Fiper, transfère ensuite son solde vers son compte chez Fiper, puis utilise sa carte normalement.',
      es: 'El cliente emite la Fiper Card desde dentro de Fiper, luego transfiere su saldo a su cuenta en Fiper y usa su tarjeta con normalidad.',
      pt: 'O cliente emite o Fiper Card de dentro da Fiper, depois transfere o seu saldo para a sua conta na Fiper e usa o cartão normalmente.',
      tr: 'Müşteri Fiper Kartını Fiper içinden çıkarır, ardından bakiyesini Fiper’daki hesabına aktarır ve kartını normal şekilde kullanır.',
    },
  },
  {
    id: 'what-leverage-do-you-offer', categoryId: 'trading-conditions',
    question: 'What leverage do you offer?',
    questions: { ar: 'ما الرافعة المالية التي تقدمونها؟', fr: 'Quel levier proposez-vous ?', es: '¿Qué apalancamiento ofrecen?', pt: 'Qual alavancagem vocês oferecem?', tr: 'Hangi kaldıraç sunuyorsunuz?' },
    answer: 'Leverage by instrument: forex 1:100, metals 1:20, indices 1:30, energies 1:10, crypto-currencies 1:2.',
    answers: {
      ar: 'الرافعة المالية حسب الأداة: فوركس 1:100، معادن 1:20، مؤشرات 1:30، طاقة 1:10، عملات رقمية 1:2.',
      fr: 'Levier par instrument : forex 1:100, métaux 1:20, indices 1:30, énergies 1:10, crypto-monnaies 1:2.',
      es: 'Apalancamiento por instrumento: forex 1:100, metales 1:20, índices 1:30, energías 1:10, criptomonedas 1:2.',
      pt: 'Alavancagem por instrumento: forex 1:100, metais 1:20, índices 1:30, energias 1:10, criptomoedas 1:2.',
      tr: 'Enstrümana göre kaldıraç: forex 1:100, metaller 1:20, endeksler 1:30, enerji 1:10, kripto paralar 1:2.',
    },
  },
  {
    id: 'what-instruments-can-i-trade', categoryId: 'trading-conditions',
    question: 'What instruments can I trade?',
    questions: { ar: 'ما الأدوات التي يمكنني تداولها؟', fr: 'Quels instruments puis-je trader ?', es: '¿Qué instrumentos puedo operar?', pt: 'Quais instrumentos posso negociar?', tr: 'Hangi enstrümanları işlem yapabilirim?' },
    answer: 'FX majors and minors, indices, commodities (metals and energies), and select cryptocurrency pairs.',
    answers: {
      ar: 'أزواج الفوركس الرئيسية والثانوية والمؤشرات والسلع وأزواج عملات رقمية مختارة.',
      fr: 'Paires FX majeures et mineures, indices, matières premières et cryptos sélectionnées.',
      es: 'Pares FX mayores y menores, índices, materias primas y criptos seleccionadas.',
      pt: 'Pares FX principais e secundários, índices, commodities e criptos selecionadas.',
      tr: 'FX majör ve minör pariteler, endeksler, emtialar ve seçili kripto çiftleri.',
    },
  },
  {
    id: 'what-are-the-spreads-and-commissions', categoryId: 'trading-conditions',
    question: 'What are the spreads and commissions?',
    questions: { ar: 'ما السبريد والعمولات؟', fr: 'Quels sont les spreads et commissions ?', es: '¿Cuáles son los spreads y comisiones?', pt: 'Quais são os spreads e comissões?', tr: 'Spreadler ve komisyonlar nelerdir?' },
    answer: 'A commission of 5 USD per standard lot on forex and metals, charged at opening; accounts are swap-free. Spreads come from the market data feed.',
    answers: {
      ar: 'عمولة قدرها 5 USD عن كل عقد قياسي على الفوركس والمعادن تُفرض عند الفتح؛ والحسابات معفاة من رسوم التبييت. وفروق الأسعار من تغذية بيانات السوق.',
      fr: 'Une commission de 5 USD par lot standard sur le forex et les métaux, prélevée à l’ouverture ; les comptes sont sans swap. Les spreads proviennent du flux de données de marché.',
      es: 'Una comisión de 5 USD por lote estándar en forex y metales, cobrada en la apertura; las cuentas son libres de swap. Los spreads provienen del flujo de datos de mercado.',
      pt: 'Uma comissão de 5 USD por lote padrão em forex e metais, cobrada na abertura; as contas são isentas de swap. Os spreads vêm do feed de dados de mercado.',
      tr: 'Forex ve metallerde standart lot başına 5 USD komisyon, açılışta tahsil edilir; hesaplar swapsızdır. Spreadler piyasa veri akışından gelir.',
    },
  },
  {
    id: 'can-i-use-expert-advisors', categoryId: 'trading-conditions',
    question: 'Can I use Expert Advisors (EAs)?',
    questions: { ar: 'هل يمكنني استخدام الـ EAs؟', fr: 'Puis-je utiliser des Expert Advisors ?', es: '¿Puedo usar Expert Advisors (EAs)?', pt: 'Posso usar Expert Advisors (EAs)?', tr: 'Expert Advisors kullanabilir miyim?' },
    answer: 'Yes. Automated trading via EAs is permitted under standard trading conditions.',
    answers: {
      ar: 'نعم. التداول الآلي عبر الـ EAs مسموح به في ظل شروط التداول القياسية.',
      fr: "Oui. Le trading automatisé via EAs est autorisé.",
      es: 'Sí. El trading automatizado mediante EAs está permitido.',
      pt: 'Sim. O trading automatizado via EAs é permitido.',
      tr: 'Evet. EA’lar aracılığıyla otomatik trading izinlidir.',
    },
  },
  {
    id: 'is-high-frequency-trading-allowed', categoryId: 'trading-conditions',
    question: 'Is high-frequency trading allowed?',
    questions: { ar: 'هل التداول عالي التردد مسموح به؟', fr: 'Le trading haute fréquence est-il autorisé ?', es: '¿Está permitido el trading de alta frecuencia?', pt: 'O trading de alta frequência é permitido?', tr: 'Yüksek frekanslı trading izinli mi?' },
    answer: 'No. HFT strategies, arbitrage, tick scalping, and latency-based strategies are not permitted.',
    answers: {
      ar: 'لا. استراتيجيات HFT والمراجحة والتداول السريع على التدوينات غير مسموح بها.',
      fr: "Non. Les stratégies HFT, l’arbitrage et le tick scalping ne sont pas autorisés.",
      es: 'No. HFT, arbitraje y tick scalping no están permitidos.',
      pt: 'Não. HFT, arbitragem e tick scalping não são permitidos.',
      tr: 'Hayır. HFT, arbitraj ve tick scalping izinli değildir.',
    },
  },
  {
    id: 'is-hedging-allowed', categoryId: 'trading-conditions',
    question: 'Is hedging allowed?',
    questions: { ar: 'هل التحوط مسموح به؟', fr: 'La couverture est-elle autorisée ?', es: '¿Está permitido el hedging?', pt: 'O hedging é permitido?', tr: 'Hedging izinli mi?' },
    answer: 'Yes. Hedging within a single account is permitted. Hedging across multiple FPT accounts is not allowed.',
    answers: {
      ar: 'نعم. التحوط داخل حساب واحد مسموح به. التحوط عبر حسابات FPT متعددة غير مسموح به.',
      fr: "Oui. La couverture au sein d’un seul compte est autorisée. Entre plusieurs comptes, non.",
      es: 'Sí. Hedging dentro de una cuenta está permitido. Entre varias cuentas FPT, no.',
      pt: 'Sim. Hedging dentro de uma conta é permitido. Entre múltiplas contas FPT, não.',
      tr: 'Evet. Tek hesap içinde hedging izinlidir. Birden fazla hesap arasında izinli değildir.',
    },
  },
  {
    id: 'is-martingale-or-grid-allowed', categoryId: 'trading-conditions',
    question: 'Is martingale or grid trading allowed?',
    questions: { ar: 'هل المارتينجيل أو التداول الشبكي مسموح به؟', fr: 'Le martingale ou grid trading est-il autorisé ?', es: '¿Está permitido el martingala o grid?', pt: 'Martingale ou grid são permitidos?', tr: 'Martingale veya grid izinli mi?' },
    answer: 'These strategies are permitted, but they must respect the maximum drawdown and daily loss limits.',
    answers: {
      ar: 'هذه الاستراتيجيات مسموح بها، لكن يجب أن تحترم حدود السحب الأقصى والخسارة اليومية.',
      fr: 'Ces stratégies sont autorisées mais doivent respecter les limites de drawdown.',
      es: 'Estas estrategias están permitidas pero deben respetar los límites de drawdown.',
      pt: 'Essas estratégias são permitidas mas devem respeitar os limites de drawdown.',
      tr: 'Bu stratejilere izin verilir ancak drawdown limitlerine uymaları gerekir.',
    },
  },
  {
    id: 'can-i-trade-during-news', categoryId: 'trading-conditions',
    question: 'Can I trade during news?',
    questions: { ar: 'هل يمكنني التداول خلال الأخبار؟', fr: 'Puis-je trader pendant les nouvelles ?', es: '¿Puedo operar durante las noticias?', pt: 'Posso operar durante notícias?', tr: 'Haber sırasında işlem yapabilir miyim?' },
    answer: 'Yes, with one limitation: trades opened or closed within 5 minutes before or after a high-impact news release are capped at 1% profit.',
    answers: {
      ar: 'نعم، مع قيد واحد: الصفقات المفتوحة أو المغلقة خلال 5 دقائق قبل أو بعد الأخبار محدودة بـ 1% ربح.',
      fr: "Oui, avec une restriction : les trades dans les 5 minutes autour d’une publication d’impact élevé sont plafonnés à 1 %.",
      es: 'Sí, con una limitación: operaciones en 5 min antes/después de noticias están limitadas al 1%.',
      pt: 'Sim, com uma limitação: operações em 5 min antes/depois de notícias são limitadas a 1%.',
      tr: 'Evet, bir kısıtlamayla: yüksek etkili haberlerden 5 dakika önce/sonraki işlemler %1 ile sınırlıdır.',
    },
  },
  {
    id: 'what-happens-if-i-exceed-news-limit', categoryId: 'trading-conditions',
    question: 'What happens if I exceed this news trading limit?',
    questions: { ar: 'ماذا يحدث إذا تجاوزت حد تداول الأخبار؟', fr: 'Que se passe-t-il si je dépasse cette limite ?', es: '¿Qué pasa si supero este límite?', pt: 'O que acontece se eu exceder esse limite?', tr: 'Bu limiti aşarsam ne olur?' },
    answer: 'The excess profit is removed from your account without any additional penalty. Your account status remains unchanged.',
    answers: {
      ar: 'يُزال الربح الزائد من حسابك دون أي عقوبة إضافية.',
      fr: 'Le bénéfice excédentaire est retiré sans pénalité supplémentaire.',
      es: 'El beneficio excedente se elimina sin penalización adicional.',
      pt: 'O lucro excedente é removido sem penalidade adicional.',
      tr: 'Fazla kar ek ceza olmaksızın kaldırılır.',
    },
  },
  {
    id: 'can-i-hold-trades-overnight', categoryId: 'trading-conditions',
    question: 'Can I hold trades overnight or over the weekend?',
    questions: { ar: 'هل يمكنني الاحتفاظ بالصفقات ليلاً أو نهاية الأسبوع؟', fr: 'Puis-je conserver des positions du jour au lendemain ?', es: '¿Puedo mantener operaciones overnight?', pt: 'Posso manter operações overnight?', tr: 'Geceye veya hafta sonuna işlem tutabilir miyim?' },
    answer: 'Yes. Overnight and weekend positions are permitted across all account types.',
    answers: {
      ar: 'نعم. المراكز الليلية وعطلة نهاية الأسبوع مسموح بها في جميع أنواع الحسابات.',
      fr: 'Oui. Les positions du jour au lendemain et du week-end sont autorisées.',
      es: 'Sí. Las posiciones overnight y de fin de semana están permitidas.',
      pt: 'Sim. Posições overnight e de fim de semana são permitidas.',
      tr: 'Evet. Gecelik ve hafta sonu pozisyonlarına izin verilir.',
    },
  },
  {
    id: 'how-many-accounts-can-i-have', categoryId: 'account-management',
    question: 'How many accounts can I have?',
    questions: { ar: 'كم عدد الحسابات التي يمكنني امتلاكها؟', fr: 'Combien de comptes puis-je avoir ?', es: '¿Cuántas cuentas puedo tener?', pt: 'Quantas contas posso ter?', tr: 'Kaç hesabım olabilir?' },
    answer: 'Up to 10 active accounts per verified trader.',
    answers: {
      ar: 'حتى 10 حسابات نشطة لكل متداول موثق.',
      fr: "Jusqu’à 10 comptes actifs par trader vérifié.",
      es: 'Hasta 10 cuentas activas por trader verificado.',
      pt: 'Até 10 contas ativas por trader verificado.',
      tr: 'Doğrulanmış trader başına 10 aktif hesaba kadar.',
    },
  },
  {
    id: 'what-happens-if-i-dont-trade', categoryId: 'account-management',
    question: "What happens if I don’t trade?",
    questions: { ar: 'ماذا يحدث إذا لم أتداول؟', fr: "Que se passe-t-il si je ne trade pas ?", es: '¿Qué pasa si no opero?', pt: 'O que acontece se eu não operar?', tr: 'İşlem yapmazsam ne olur?' },
    answer: 'No trade opened or closed for 30 consecutive days ends the account; a warning is sent on day 23.',
    answers: {
      ar: 'ينتهي الحساب إذا لم تُفتح أو تُغلق أي صفقة مدة 30 يوماً متتالية؛ ويُرسل تنبيه في اليوم 23.',
      fr: 'Aucun trade ouvert ou fermé pendant 30 jours consécutifs met fin au compte ; un avertissement est envoyé le 23e jour.',
      es: 'Si no se abre ni cierra ninguna operación durante 30 días consecutivos, la cuenta termina; se envía un aviso el día 23.',
      pt: 'Nenhuma operação aberta ou fechada por 30 dias consecutivos encerra a conta; um aviso é enviado no dia 23.',
      tr: '30 gün üst üste hiçbir işlem açılmaz veya kapatılmazsa hesap sona erer; 23. günde bir uyarı gönderilir.',
    },
  },
  {
    id: 'can-i-reset-my-account', categoryId: 'account-management',
    question: 'Can I reset my account?',
    questions: { ar: 'هل يمكنني إعادة تعيين حسابي؟', fr: 'Puis-je réinitialiser mon compte ?', es: '¿Puedo restablecer mi cuenta?', pt: 'Posso redefinir minha conta?', tr: 'Hesabımı sıfırlayabilir miyim?' },
    answer: 'No reset option is included with any evaluation. If your account fails, you must purchase a new evaluation.',
    answers: {
      ar: 'لا يوجد خيار إعادة تعيين مع أي تحدٍّ. إذا فشل حسابك، يجب عليك شراء تحدٍّ جديد.',
      fr: "Aucune option de réinitialisation n’est incluse. En cas d’échec, vous devez acheter une nouvelle évaluation.",
      es: 'Ninguna evaluación incluye opción de restablecimiento. Debes comprar una nueva si fallas.',
      pt: 'Nenhuma avaliação inclui redefinição. Você deve comprar uma nova se falhar.',
      tr: 'Hiçbir değerlendirmede sıfırlama seçeneği yoktur.',
    },
  },
  {
    id: 'can-i-transfer-my-account', categoryId: 'account-management',
    question: 'Can I transfer my account to another person?',
    questions: { ar: 'هل يمكنني نقل حسابي لشخص آخر؟', fr: 'Puis-je transférer mon compte ?', es: '¿Puedo transferir mi cuenta?', pt: 'Posso transferir minha conta?', tr: 'Hesabımı devredebilir miyim?' },
    answer: 'No. Accounts are bound to the verified identity of the registered trader and are non-transferable.',
    answers: {
      ar: 'لا. الحسابات مرتبطة بهوية المتداول المسجل الموثقة وغير قابلة للنقل.',
      fr: "Non. Les comptes sont liés à l’identité vérifiée du trader et ne sont pas transférables.",
      es: 'No. Las cuentas están vinculadas al trader registrado y no son transferibles.',
      pt: 'Não. As contas estão vinculadas ao trader registrado e não são transferíveis.',
      tr: 'Hayır. Hesaplar kayıtlı trader kimliğine bağlıdır ve devredilemez.',
    },
  },
  {
    id: 'which-platform-do-you-use', categoryId: 'technical-platform',
    question: 'Which platform do you use?',
    questions: { ar: 'ما المنصة التي تستخدمونها؟', fr: 'Quelle plateforme utilisez-vous ?', es: '¿Qué plataforma usan?', pt: 'Qual plataforma vocês usam?', tr: 'Hangi platformu kullanıyorsunuz?' },
    answer: 'FPT operates on cTrader — chosen for its institutional-grade execution, native depth-of-market, and advanced algorithmic capabilities.',
    answers: {
      ar: 'يعمل FPT على cTrader — المختار لتنفيذه المؤسسي الممتاز وعمق السوق الأصلي.',
      fr: "FPT opère sur cTrader, choisi pour son exécution institutionnelle et ses capacités algorithmiques.",
      es: 'FPT opera en cTrader, elegido por su ejecución institucional y capacidades algorítmicas.',
      pt: 'FPT opera no cTrader, escolhido por execução institucional e capacidades algorítmicas.',
      tr: 'FPT, kurumsal yürütme için tercih edilen cTrader üzerinde çalışır.',
    },
  },
  {
    id: 'what-if-i-dont-receive-my-login', categoryId: 'technical-platform',
    question: "What if I don’t receive my login details?",
    questions: { ar: 'ماذا لو لم أتلق بيانات تسجيل الدخول؟', fr: 'Que faire si je ne reçois pas mes identifiants ?', es: '¿Qué hago si no recibo mis credenciales?', pt: 'E se eu não receber meus dados de login?', tr: 'Giriş bilgilerimi almazsam?' },
    answer: 'Check both your inbox and spam folder. If credentials are not received within 30 minutes, contact FPT support.',
    answers: {
      ar: 'تحقق من صندوق الوارد ومجلد البريد المزعج. إذا لم تُستلم خلال 30 دقيقة، تواصل مع دعم FPT.',
      fr: "Vérifiez votre boîte de réception et le dossier spam. Si rien dans les 30 minutes, contactez le support.",
      es: 'Revisa bandeja de entrada y spam. Si no llegan en 30 minutos, contacta soporte.',
      pt: 'Verifique caixa de entrada e spam. Se não chegar em 30 minutos, contate o suporte.',
      tr: 'Gelen kutusu ve spam klasörünüzü kontrol edin. 30 dakika içinde gelmezse destek ile iletişime geçin.',
    },
  },
  {
    id: 'what-if-i-face-technical-issues', categoryId: 'technical-platform',
    question: 'What if I face technical issues during trading?',
    questions: { ar: 'ماذا لو واجهت مشاكل تقنية أثناء التداول؟', fr: 'Que faire en cas de problèmes techniques ?', es: '¿Qué hago si tengo problemas técnicos?', pt: 'E se eu tiver problemas técnicos?', tr: 'Teknik sorunla karşılaşırsam?' },
    answer: 'Write to support on WhatsApp or through the support channels published in the client area, with a screenshot of the issue.',
    answers: {
      ar: 'راسل الدعم على واتساب أو عبر قنوات الدعم المنشورة في منطقة العميل، مع لقطة شاشة للمشكلة.',
      fr: 'Écrivez au support sur WhatsApp ou via les canaux de support publiés dans l’espace client, avec une capture d’écran du problème.',
      es: 'Escribe a soporte por WhatsApp o a través de los canales de soporte publicados en el área de cliente, con una captura de pantalla del problema.',
      pt: 'Escreva para o suporte pelo WhatsApp ou pelos canais de suporte publicados na área do cliente, com uma captura de tela do problema.',
      tr: 'Sorunun ekran görüntüsüyle birlikte WhatsApp’tan veya müşteri alanında yayımlanan destek kanallarından desteğe yazın.',
    },
  },
  {
    id: 'do-you-support-mobile-trading', categoryId: 'technical-platform',
    question: 'Do you support mobile trading?',
    questions: { ar: 'هل تدعمون التداول عبر الجوال؟', fr: 'Soutenez-vous le trading mobile ?', es: '¿Apoyan el trading móvil?', pt: 'Vocês suportam trading móvel?', tr: 'Mobil trading destekleniyor mu?' },
    answer: 'Yes. cTrader is available on iOS, Android, and web.',
    answers: {
      ar: 'نعم. cTrader متاح على iOS وAndroid والويب.',
      fr: 'Oui. cTrader est disponible sur iOS, Android et web.',
      es: 'Sí. cTrader está disponible en iOS, Android y web.',
      pt: 'Sim. cTrader está disponível em iOS, Android e web.',
      tr: 'Evet. cTrader iOS, Android ve web’de mevcuttur.',
    },
  },
  {
    id: 'is-fpt-a-broker', categoryId: 'legal-general',
    question: 'Is FPT a broker?',
    questions: { ar: 'هل FPT وسيط؟', fr: 'FPT est-il un courtier ?', es: '¿FPT es un bróker?', pt: 'FPT é uma corretora?', tr: 'FPT bir broker mıdır?' },
    answer: 'No. FPT is a proprietary trading evaluation program, not a regulated broker.',
    answers: {
      ar: 'لا. FPT برنامج تقييم للتداول الاحترافي وليس وسيطاً منظماً.',
      fr: "Non. FPT est un programme d’évaluation de trading propriétaire, pas un courtier réglementé.",
      es: 'No. FPT es un programa de evaluación de trading propietario, no un bróker regulado.',
      pt: 'Não. FPT é um programa de avaliação de trading proprietário, não uma corretora.',
      tr: 'Hayır. FPT düzenlenmiş bir broker değil, tescilli bir trading değerlendirme programıdır.',
    },
  },
  {
    id: 'is-trading-real-or-simulated', categoryId: 'legal-general',
    question: 'Is trading real or simulated?',
    questions: { ar: 'هل التداول حقيقي أم محاكاة؟', fr: 'Le trading est-il réel ou simulé ?', es: '¿El trading es real o simulado?', pt: 'O trading é real ou simulado?', tr: 'Trading gerçek mi yoksa simüle mi?' },
    answer: 'All accounts operate with simulated capital in live market conditions.',
    answers: {
      ar: 'تعمل جميع الحسابات برأس مال محاكاة في ظروف السوق الحية.',
      fr: 'Tous les comptes opèrent avec du capital simulé dans des conditions de marché réelles.',
      es: 'Todas las cuentas operan con capital simulado en condiciones reales de mercado.',
      pt: 'Todas as contas operam com capital simulado em condições reais de mercado.',
      tr: 'Tüm hesaplar gerçek piyasa koşullarında simüle sermaye ile çalışır.',
    },
  },
  {
    id: 'do-you-provide-investment-advice', categoryId: 'legal-general',
    question: 'Do you provide investment advice?',
    questions: { ar: 'هل تقدمون نصائح استثمارية؟', fr: "Fournissez-vous des conseils en investissement ?", es: '¿Brindan asesoría de inversión?', pt: 'Vocês fornecem consultoria?', tr: 'Yatırım tavsiyesi veriyor musunuz?' },
    answer: 'No. FPT does not provide investment advice, trading signals, or portfolio management.',
    answers: {
      ar: 'لا. لا يقدم FPT نصائح استثمارية أو إشارات تداول أو إدارة محافظ.',
      fr: "Non. FPT ne fournit pas de conseils en investissement ni de signaux de trading.",
      es: 'No. FPT no proporciona asesoría de inversión ni señales de trading.',
      pt: 'Não. FPT não fornece consultoria de investimento nem sinais de trading.',
      tr: 'Hayır. FPT yatırım tavsiyesi veya trading sinyalleri sağlamaz.',
    },
  },
  {
    id: 'can-you-guarantee-profits', categoryId: 'legal-general',
    question: 'Can you guarantee profits?',
    questions: { ar: 'هل تضمنون الأرباح؟', fr: 'Pouvez-vous garantir des profits ?', es: '¿Pueden garantizar ganancias?', pt: 'Vocês garantem lucros?', tr: 'Kar garanti edebilir misiniz?' },
    answer: 'No. Investing involves risk. Past performance is not indicative of future results.',
    answers: {
      ar: 'لا. الاستثمار ينطوي على مخاطر. الأداء السابق لا يُشير إلى النتائج المستقبلية.',
      fr: 'Non. Le trading implique des risques substantiels. Les performances passées ne garantissent pas les résultats futurs.',
      es: 'No. El trading implica riesgos sustanciales. El rendimiento pasado no garantiza resultados futuros.',
      pt: 'Não. O trading envolve risco substancial. Desempenho passado não garante resultados futuros.',
      tr: 'Hayır. Trading önemli risk içerir. Geçmiş performans gelecekteki sonuçların göstergesi değildir.',
    },
  },
  {
    id: 'in-which-jurisdiction-is-fpt-registered', categoryId: 'legal-general',
    question: 'In which jurisdiction is FPT registered?',
    questions: { ar: 'في أي ولاية قضائية يُسجَّل FPT؟', fr: 'Dans quelle juridiction FPT est-il enregistré ?', es: '¿En qué jurisdicción está registrado FPT?', pt: 'Em qual jurisdição FPT está registrado?', tr: 'FPT hangi yargı bölgesinde kayıtlıdır?' },
    answer: 'FPT is operated by Fiper Global L.L.C-FZ — Company registration number 2422384 — registered in the Meydan Free Zone, Dubai, United Arab Emirates. The four legal documents are published in the client area.',
    answers: {
      ar: 'تشغّل FPT شركة فايبر غلوبال ذ.م.م – منطقة حرة (رقم السجل التجاري 2422384)، المسجلة في منطقة ميدان الحرة، دبي، الإمارات العربية المتحدة. والوثائق القانونية الأربع منشورة في منطقة العميل.',
      fr: 'FPT est exploité par Fiper Global L.L.C-FZ — numéro d’enregistrement 2422384 — enregistrée dans la Meydan Free Zone, Dubaï, Émirats arabes unis. Les quatre documents juridiques sont publiés dans l’espace client.',
      es: 'FPT es operado por Fiper Global L.L.C-FZ — número de registro 2422384 — registrada en la Meydan Free Zone, Dubái, Emiratos Árabes Unidos. Los cuatro documentos legales se publican en el área de cliente.',
      pt: 'A FPT é operada pela Fiper Global L.L.C-FZ — número de registro 2422384 — registrada na Meydan Free Zone, Dubai, Emirados Árabes Unidos. Os quatro documentos legais são publicados na área do cliente.',
      tr: 'FPT, Meydan Serbest Bölgesi, Dubai, Birleşik Arap Emirlikleri’nde kayıtlı Fiper Global L.L.C-FZ (şirket sicil numarası 2422384) tarafından işletilir. Dört yasal belge müşteri alanında yayımlanır.',
    },
  },
  {
    id: 'how-is-my-personal-data-protected', categoryId: 'legal-general',
    question: 'How is my personal data protected?',
    questions: { ar: 'كيف تُحمى بياناتي الشخصية؟', fr: 'Comment mes données personnelles sont-elles protégées ?', es: '¿Cómo se protegen mis datos personales?', pt: 'Como meus dados pessoais são protegidos?', tr: 'Kişisel verilerim nasıl korunur?' },
    answer: 'FPT follows industry-standard data protection practices including encryption at rest and in transit.',
    answers: {
      ar: 'يتبع FPT ممارسات حماية البيانات القياسية بما في ذلك التشفير.',
      fr: 'FPT suit les pratiques standard de protection des données incluant le chiffrement.',
      es: 'FPT sigue prácticas estándar de protección de datos incluyendo cifrado.',
      pt: 'FPT segue práticas padrão de proteção de dados incluindo criptografia.',
      tr: 'FPT, şifreleme dahil endüstri standardı veri koruma uygulamalarını takip eder.',
    },
  },
  {
    id: 'what-is-the-partner-program', categoryId: 'partner-program', popular: true,
    question: 'What is the FPT Partner Program?',
    questions: { ar: 'ما هو برنامج شركاء FPT؟', fr: "Qu’est-ce que le Programme Partenaires FPT ?", es: '¿Qué es el Programa de Socios FPT?', pt: 'O que é o Programa de Parceiros FPT?', tr: 'FPT Ortaklık Programı nedir?' },
    answer: 'Earn a commission on every evaluation bought through your referral link: 15 % with 1–9 sales a month, 17.5 % with 10–29, 20 % with 30 or more.',
    answers: {
      ar: 'اربح عمولة على كل تقييم يُشترى عبر رابط إحالتك: 15 % مع 1–9 مبيعات شهرياً، و17.5 % مع 10–29، و20 % مع 30 فأكثر.',
      fr: 'Gagnez une commission sur chaque évaluation achetée via votre lien de parrainage : 15 % avec 1–9 ventes par mois, 17.5 % avec 10–29, 20 % à partir de 30.',
      es: 'Gana una comisión por cada evaluación comprada a través de tu enlace de referido: 15 % con 1–9 ventas al mes, 17.5 % con 10–29, 20 % con 30 o más.',
      pt: 'Ganhe uma comissão por cada avaliação comprada pelo seu link de indicação: 15 % com 1–9 vendas por mês, 17.5 % com 10–29, 20 % com 30 ou mais.',
      tr: 'Yönlendirme bağlantınızla satın alınan her değerlendirmeden komisyon kazanın: ayda 1–9 satışta %15, 10–29 satışta %17.5, 30 ve üzerinde %20.',
    },
  },
  {
    id: 'what-are-the-commission-tiers', categoryId: 'partner-program', popular: true,
    question: 'What are the commission tiers?',
    questions: { ar: 'ما هي مستويات العمولة؟', fr: 'Quels sont les paliers de commission ?', es: '¿Cuáles son los niveles de comisión?', pt: 'Quais são os níveis de comissão?', tr: 'Komisyon seviyeleri nelerdir?' },
    answer: 'Tier 1: 15 % (1–9 sales a month) · Tier 2: 17.5 % (10–29) · Tier 3: 20 % (30+). The tier follows your monthly sales automatically.',
    answers: {
      ar: 'المستوى الأول: 15 % (1–9 مبيعات شهرياً) · المستوى الثاني: 17.5 % (10–29) · المستوى الثالث: 20 % (30+). يتبع المستوى مبيعاتك الشهرية تلقائياً.',
      fr: 'Palier 1 : 15 % (1–9 ventes par mois) · Palier 2 : 17.5 % (10–29) · Palier 3 : 20 % (30+). Le palier suit automatiquement vos ventes mensuelles.',
      es: 'Nivel 1: 15 % (1–9 ventas al mes) · Nivel 2: 17.5 % (10–29) · Nivel 3: 20 % (30+). El nivel sigue tus ventas mensuales automáticamente.',
      pt: 'Nível 1: 15 % (1–9 vendas por mês) · Nível 2: 17.5 % (10–29) · Nível 3: 20 % (30+). O nível acompanha suas vendas mensais automaticamente.',
      tr: 'Kademe 1: %15 (ayda 1–9 satış) · Kademe 2: %17.5 (10–29) · Kademe 3: %20 (30+). Kademe aylık satışlarınızı otomatik izler.',
    },
  },
  {
    id: 'how-do-i-join-the-partner-program', categoryId: 'partner-program',
    question: 'How do I join?',
    questions: { ar: 'كيف أنضم؟', fr: 'Comment rejoindre le programme ?', es: '¿Cómo me uno?', pt: 'Como faço para participar?', tr: 'Nasıl katılırım?' },
    answer: 'Register at app.fptraders.app/en/signup and apply for the partner program from your dashboard.',
    answers: {
      ar: 'سجّل على app.fptraders.app/ar/signup وقدّم طلب الانضمام إلى برنامج الشركاء من لوحة التحكم.',
      fr: "Inscrivez-vous sur app.fptraders.app/en/signup et postulez au programme partenaires depuis votre tableau de bord.",
      es: 'Regístrate en app.fptraders.app/en/signup y solicita el programa de socios desde tu panel.',
      pt: 'Cadastre-se em app.fptraders.app/en/signup e candidate-se ao programa de parceiros pelo seu painel.',
      tr: 'app.fptraders.app/en/signup adresinden kaydolun ve panelinizden ortaklık programına başvurun.',
    },
  },
];

export const getCategoryBySlug = (slug) => categories.find((c) => c.slug === slug);
export const getFaqsByCategory = (categoryId) => faqs.filter((f) => f.categoryId === categoryId);
export const getPopularFaqs = () => faqs.filter((f) => f.popular);
export const getArticleCount = (categoryId) => faqs.filter((f) => f.categoryId === categoryId).length;

/** Search normalisation: case-fold (Turkish dotless i included), strip Arabic diacritics / tatweel, unify alef / ya / ta-marbuta, strip Latin accents (é → e). */
export function normalizeQuery(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[\u0622\u0623\u0625]/g, '\u0627')
    .replace(/\u0649/g, '\u064A')
    .replace(/\u0629/g, '\u0647')
    .replace(/[\u0131]/g, 'i')
    .normalize('NFD').replace(/[\u0300-\u036F]/g, '');
}

/**
 * Help search in the page language (UXFW-043): the index is the current language's questions, answers and category titles (score ×2),
 * with the English text as a fallback index (score ×1) so an English query still finds the article on a non-English page.
 * Results are rendered by the caller in the page language. `lang` = the two-letter page language.
 */
export function searchFaqs(query, limit = 8, lang = 'en') {
  const q = normalizeQuery(query).trim();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const catTitle = (c, l) => ((l !== 'en' && c.titles?.[l]) ? c.titles[l] : c.title);
  const scored = faqs.map((f) => {
    const cat = categories.find((c) => c.id === f.categoryId);
    const own = lang !== 'en'
      ? normalizeQuery([f.questions?.[lang], f.answers?.[lang], cat && catTitle(cat, lang)].filter(Boolean).join(' '))
      : normalizeQuery([f.question, f.answer, cat?.title].filter(Boolean).join(' '));
    const fallback = lang !== 'en' ? normalizeQuery([f.question, f.answer, cat?.title].filter(Boolean).join(' ')) : '';
    let score = 0;
    for (const t of tokens) {
      if (own.includes(t)) score += 2;
      else if (fallback.includes(t)) score += 1;
    }
    return { faq: f, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.faq);
}
