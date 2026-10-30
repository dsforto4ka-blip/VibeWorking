// Vibe Working Unified Settings, Auth Synchronization & Localization Manager
// Handles:
// 1. Theme (Dark / Light with monochrome SVG icons)
// 2. Language (Russian / English complete translation of ALL UI elements)
// 3. Currency (RUB / USD / EUR / BYN formatting & auto-calculation)
// 4. Monochrome Emojis & Flags in settings
// 5. Account & Auth Synchronization across all pages & tabs (BroadcastChannel + LocalStorage + Server sync)
// 6. Outside click & Escape closing for settings menu & modals

export interface UserSettings {
  theme: 'dark' | 'light';
  lang: 'ru' | 'en';
  currency: 'RUB' | 'USD' | 'EUR' | 'BYN';
  updatedAt?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email?: string;
  phone?: string;
  avatar?: string;
  roleKey?: 'worker' | 'client';
  balance?: number;
  telegram?: string;
  about?: string;
  createdAt?: string;
  settings?: UserSettings;
}

export const CURRENCIES: Record<string, { symbol: string; position: 'before' | 'after'; rate: number; decimals: number }> = {
  RUB: { symbol: '₽', position: 'after', rate: 1, decimals: 0 },
  USD: { symbol: '$', position: 'before', rate: 0.011, decimals: 2 },
  EUR: { symbol: '€', position: 'before', rate: 0.010, decimals: 2 },
  BYN: { symbol: 'Br', position: 'after', rate: 0.036, decimals: 2 },
};

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  ru: {
    // Nav
    'nav.tasks': 'Задания',
    'nav.how': 'Как это работает',
    'nav.post': 'Разместить заказ',
    'nav.find': 'Найти работу',
    'nav.login': 'Войти',
    'nav.cabinet': 'Личный кабинет',
    'nav.logout': 'Выйти',
    'nav.backToTasks': 'Вернуться к ленте заданий',

    // Hero
    'hero.badge': 'Фриланс-биржа нового поколения для подростков',
    'hero.title': 'Работа для подростков без ИП и самозанятости',
    'hero.subtitle': 'Брать простые онлайн-задания теперь можно без налоговых документов, договоров и бумажной волокиты. Выполняй задачи, развивай навыки и получай честную оплату сразу на карту или СБП.',
    'hero.orderBtn': 'Заказать работу',
    'hero.badge1': 'Без ИП и самозанятости',
    'hero.badge2': 'С 14 лет',
    'hero.badge3': 'Выплаты на карту или СБП',

    // Tasks Section
    'tasks.title': 'Свежие задания',
    'tasks.subtitle': 'Выбирай интересные проекты и зарабатывай свои первые деньги онлайн',
    'tasks.empty': 'Пока нет опубликованных заданий',
    'tasks.emptyDesc': 'Станьте первым заказчиком на Vibe Working! Опубликуйте реальную задачу и получите отклики от исполнителей.',
    'tasks.postFirst': 'Опубликовать первое задание',
    'filter.all': 'Все задания',
    'filter.texts': 'Тексты',
    'filter.design': 'Дизайн',
    'filter.video': 'Видео / Reels',
    'filter.study': 'Учёба',
    'filter.tables': 'Таблицы',
    'filter.social': 'Соцсети',
    'task.apply': 'Откликнуться',
    'task.applied': 'Вы откликнулись',
    'task.budget': 'Бюджет',
    'task.deadline': 'Срок сдачи',
    'task.deadlineLabel': 'Дедлайн:',
    'task.responses': 'Откликов',
    'task.clientLabel': 'Заказчик',
    'task.statusOpen': 'Открыто',
    'task.statusDone': 'Выполнено',

    // How it works
    'steps.title': 'Как это устроено',
    'steps.subtitle': 'Простой путь к первым деньгам без контрактов и бюрократии',
    'steps.s1t': 'Регистрация',
    'steps.s1d': 'Быстрый вход за 1 минуту через Google, телефон или почту. Без паспортов, ИНН и документов.',
    'steps.s2t': 'Выбор задания',
    'steps.s2d': 'Листай ленту и выбирай то, что нравится: тексты, монтаж reels, оформление или помощь с учёбой.',
    'steps.s3t': 'Выполнение',
    'steps.s3d': 'Общайся с заказчиком во встроенном чате, уточняй детали и сдавай работу вовремя.',
    'steps.s4t': 'Получение оплаты',
    'steps.s4d': 'После подтверждения деньги моментально зачисляются на твою банковскую карту.',

    // Settings Modal (Strictly monochrome labels)
    'settings.title': 'Настройки',
    'settings.subtitle': 'Настройки сохраняются на сервере по вашему IP и профилю',
    'settings.theme': 'Тема оформления',
    'settings.theme.dark': 'Тёмная',
    'settings.theme.light': 'Светлая',
    'settings.language': 'Язык',
    'settings.currency': 'Валюта',
    'settings.account': 'Личный кабинет',
    'settings.account.meta': 'Профиль и заказы',
    'settings.logout': 'Выйти из аккаунта',
    'settings.syncedProfile': 'Настройки синхронизированы с вашим профилем',
    'settings.syncedIp': 'Настройки сохранены на сервере для вашего IP',
    'settings.syncedLocal': 'Настройки синхронизированы на этом устройстве',
    'cur.rub': 'Рубль',
    'cur.usd': 'Доллар',
    'cur.eur': 'Евро',
    'cur.byn': 'Бел. рубль',

    // Create Order Page
    'post.badge': 'Публикация заказа',
    'post.title': 'Разместить заказ на Vibe Working',
    'post.subtitle': 'Опишите простую онлайн-задачу, установите понятную цену и получите отклики от подростков-исполнителей уже через пару минут без бумажных договоров.',
    'post.categoryLabel': 'Выберите категорию',
    'post.titleLabel': 'Название задания',
    'post.titleHint': 'Коротко и ясно сформулируйте суть задачи',
    'post.titlePlaceholder': 'Например: Смонтировать 3 коротких Reels для магазина кроссовок',
    'post.budgetLabel': 'Бюджет вознаграждения',
    'post.budgetHint': 'Укажите сумму, которую исполнитель получит за выполненную работу',
    'post.descLabel': 'Подробное описание',
    'post.descHint': 'Опишите требования, формат сдачи работы, дедлайн и что вы предоставите',
    'post.descPlaceholder': 'Что конкретно нужно сделать?\nПример: Предоставим исходные видео и трек. Нужно нарезать динамичные кадры, наложить субтитры и добавить звуковые эффекты в CapCut или Premiere...',
    'post.perk1': 'Без ИП и бумажных договоров',
    'post.perk2': 'Отклики в первые 15 минут',
    'post.perk3': 'Выплаты на карту или СБП',
    'post.submit': 'Опубликовать задание',
    'post.submitting': 'Публикуем...',
    'post.catTexts': 'Тексты',
    'post.catDesign': 'Дизайн',
    'post.catVideo': 'Видео / Reels',
    'post.catStudy': 'Учёба',
    'post.catTables': 'Таблицы',
    'post.catSocial': 'Соцсети',

    // Cabinet Page
    'cab.title': 'Личный кабинет',
    'cab.unauthTitle': 'Личный кабинет Vibe Working',
    'cab.unauthDesc': 'Войдите через официальный Google аккаунт, по номеру телефона или почте, чтобы отслеживать отклики, размещать заказы и управлять заработанными деньгами.',
    'cab.googleLogin': 'Продолжить через Google',
    'cab.toTasks': 'На главную к заданиям',
    'cab.roleWorker': '💼 Исполнитель',
    'cab.roleClient': '🎯 Заказчик',
    'cab.switchToClient': 'Переключить на Заказчика',
    'cab.switchToWorker': 'Переключить на Исполнителя',
    'cab.editProfile': 'Редактировать',
    'cab.settings': 'Настройки',
    'cab.balance': 'Текущий баланс',
    'cab.balanceSub': 'Выплаты на карту или СБП',
    'cab.topUp': '+ Пополнить',
    'cab.withdraw': 'Вывести',
    'cab.ordersCount': 'Размещено заказов',
    'cab.ordersSub': 'Активные задачи на бирже',
    'cab.worksCount': 'Мои работы и отклики',
    'cab.worksSub': 'Выполненные и в работе',
    'cab.tabOrders': 'Мои заказы',
    'cab.tabWorks': 'Мои отклики и работы',
    'cab.tabSettings': 'Настройки профиля',
    'cab.emptyOrders': 'У вас пока нет активных заказов',
    'cab.emptyOrdersDesc': 'Разместите простое онлайн-задание, чтобы найти ответственного исполнителя среди подростков.',
    'cab.postFirstOrder': 'Разместить первый заказ',
    'cab.emptyWorks': 'Вы ещё не откликались на задания',
    'cab.emptyWorksDesc': 'Перейдите в ленту заданий, выберите подходящий заказ и отправьте свой первый отклик!',
    'cab.goToFeed': 'Перейти к ленте заданий',

    // Edit Profile Modal
    'profile.editTitle': 'Редактировать профиль',
    'profile.editSubtitle': 'Информация видна другим пользователям при откликах и заказах',
    'profile.nameLabel': 'Отображаемое имя',
    'profile.usernameLabel': 'Юзернейм (@никнейм)',
    'profile.tgLabel': 'Telegram для связи',
    'profile.aboutLabel': 'О себе / навыки',
    'profile.aboutPlaceholder': 'Расскажите, чем занимаетесь, какие программы знаете...',
    'profile.saveBtn': 'Сохранить изменения',

    // Balance Modal
    'balance.topUpTitle': 'Пополнение баланса',
    'balance.withdrawTitle': 'Вывод средств',
    'balance.subtitle': 'Без комиссии через СБП или банковскую карту',
    'balance.amountLabel': 'Сумма в рублях (₽)',
    'balance.submitBtn': 'Подтвердить',

    // Auth Modal
    'auth.title': 'Вход в Vibe Working',
    'auth.titleRegister': 'Регистрация в Vibe Working',
    'auth.login': 'Войти',
    'auth.register': 'Регистрация',
    'auth.google': 'Продолжить через Google',
    'auth.orContacts': 'или через контакты',
    'auth.byPhone': 'По телефону',
    'auth.byEmail': 'По почте',
    'auth.nameLabel': 'Ваше имя или никнейм',
    'auth.namePlaceholder': 'Например, Артём Смирнов',
    'auth.roleLabel': 'Кто вы на Vibe Working?',
    'auth.role.worker': '💼 Исполнитель',
    'auth.role.workerSub': 'Хочу брать задания',
    'auth.role.client': '🎯 Заказчик',
    'auth.role.clientSub': 'Хочу размещать задания',
    'auth.phoneLabel': 'Номер телефона',
    'auth.phonePlaceholder': '+7 (999) 000-00-00',
    'auth.smsLabel': 'Код из СМС (любые 4 цифры)',
    'auth.smsPlaceholder': '1234',
    'auth.emailLabel': 'Электронная почта',
    'auth.emailPlaceholder': 'teen@example.com',
    'auth.passLabel': 'Пароль',
    'auth.passPlaceholder': 'Минимум 6 символов',
    'auth.submitLogin': 'Войти в аккаунт',
    'auth.submitRegister': 'Создать аккаунт',

    // Footer
    'footer.copy': '© 2026 Vibe Working — фриланс-биржа для подростков',

    // Avatar Cropper & Profile Photo
    'avatar.changePhoto': 'Изменить фото профиля',
    'avatar.cropTitle': 'Кадрирование фото профиля',
    'avatar.cropSubtitle': 'Перемещайте и масштабируйте изображение для идеальной круглой аватарки',
    'avatar.cancel': 'Отмена',
    'avatar.save': 'Сохранить',
    'avatar.zoomIn': 'Увеличить',
    'avatar.zoomOut': 'Уменьшить',
    'avatar.updated': 'Аватарка успешно обновлена!',
    'avatar.errorLoading': 'Ошибка при загрузке изображения',

    // Common & Actions
    'common.close': 'Закрыть',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.loading': 'Загрузка...',
    'common.user': 'Пользователь',

    // Username validation
    'profile.usernameHint': 'Только латинские буквы (a-z), цифры и _ (от 3 до 20 символов)',
    'profile.usernameLatinOnly': 'Юзернейм должен быть исключительно на латинице (a-z, 0-9, _)',

    // Categories
    'cat.texts': 'Тексты',
    'cat.design': 'Дизайн',
    'cat.video': 'Видео / Reels',
    'cat.study': 'Учёба',
    'cat.tables': 'Таблицы',
    'cat.social': 'Соцсети',
    'cat.code': 'Код',
    'cat.help': 'Помощь',
    'cat.other': 'Другое',

    // Deadlines & Statuses
    'deadline.today': 'Сегодня',
    'deadline.fewDays': '2-3 дня',
    'deadline.week': 'До недели',
    'status.open': 'Открыто',
    'status.in_progress': 'В работе',
    'status.completed': 'Выполнено',

    // Toasts & Messages
    'toast.needLogin': 'Сначала войдите в аккаунт',
    'toast.responseSent': 'Отклик отправлен заказчику!',
    'toast.welcome': 'С возвращением!',
    'toast.logout': 'Вы вышли из аккаунта',
    'toast.themeDark': 'Тёмная тема включена',
    'toast.themeLight': 'Светлая тема включена',
    'toast.langSwitched': 'Язык переключён на русский',
    'toast.curSwitched': 'Валюта изменена на ',
    'toast.orderCreated': 'Заказ успешно опубликован!',
    'toast.profileSaved': 'Профиль успешно обновлён!',
    'toast.fillFields': 'Пожалуйста, заполните все обязательные поля',
    'toast.copied': 'Скопировано в буфер обмена',
    'toast.error': 'Произошла ошибка, попробуйте снова',
    'toast.depositSuccess': 'Баланс успешно пополнен!',
    'toast.withdrawSuccess': 'Заявка на вывод средств принята!',
  },
  en: {
    // Nav
    'nav.tasks': 'Tasks',
    'nav.how': 'How it works',
    'nav.post': 'Post a task',
    'nav.find': 'Find tasks',
    'nav.login': 'Sign in',
    'nav.cabinet': 'Cabinet',
    'nav.logout': 'Log out',
    'nav.backToTasks': 'Back to task feed',

    // Hero
    'hero.badge': 'Next-gen freelance marketplace for teens',
    'hero.title': 'Online jobs for teens with zero bureaucracy',
    'hero.subtitle': 'Take simple online tasks without tax paperwork, contracts, or red tape. Build skills, deliver real work, and receive payouts instantly to bank cards.',
    'hero.orderBtn': 'Order work',
    'hero.badge1': 'No tax registrations',
    'hero.badge2': 'Ages 14+',
    'hero.badge3': 'Instant card payouts',

    // Tasks Section
    'tasks.title': 'Fresh tasks',
    'tasks.subtitle': 'Pick interesting projects and earn your first money online',
    'tasks.empty': 'No tasks published yet',
    'tasks.emptyDesc': 'Be the first client on Vibe Working! Post a real task and get applications from freelancers.',
    'tasks.postFirst': 'Post the first task',
    'filter.all': 'All tasks',
    'filter.texts': 'Texts',
    'filter.design': 'Design',
    'filter.video': 'Video / Reels',
    'filter.study': 'Study',
    'filter.tables': 'Spreadsheets',
    'filter.social': 'Social media',
    'task.apply': 'Apply',
    'task.applied': 'Applied',
    'task.budget': 'Budget',
    'task.deadline': 'Deadline',
    'task.deadlineLabel': 'Deadline:',
    'task.responses': 'Applications',
    'task.clientLabel': 'Client',
    'task.statusOpen': 'Open',
    'task.statusDone': 'Completed',

    // How it works
    'steps.title': 'How it works',
    'steps.subtitle': 'A simple path to your first money without contracts and bureaucracy',
    'steps.s1t': 'Sign up',
    'steps.s1d': 'Fast login in 1 minute via Google, phone or email. No passports, tax IDs or documents.',
    'steps.s2t': 'Pick a task',
    'steps.s2d': 'Scroll the feed and pick what you like: texts, reels editing, design or study help.',
    'steps.s3t': 'Do the work',
    'steps.s3d': 'Chat with the client in the built-in messenger, align on details and deliver on time.',
    'steps.s4t': 'Get paid',
    'steps.s4d': 'Once the work is confirmed, money is instantly credited to your bank card.',

    // Settings Modal (Strictly monochrome labels)
    'settings.title': 'Settings',
    'settings.subtitle': 'Settings are saved on the server by your IP and profile',
    'settings.theme': 'Theme',
    'settings.theme.dark': 'Dark',
    'settings.theme.light': 'Light',
    'settings.language': 'Language',
    'settings.currency': 'Currency',
    'settings.account': 'Personal cabinet',
    'settings.account.meta': 'Profile and orders',
    'settings.logout': 'Log out',
    'settings.syncedProfile': 'Settings synced with your profile',
    'settings.syncedIp': 'Settings saved on server for your IP',
    'settings.syncedLocal': 'Settings synced on this device',
    'cur.rub': 'Ruble',
    'cur.usd': 'Dollar',
    'cur.eur': 'Euro',
    'cur.byn': 'BYN Ruble',

    // Create Order Page
    'post.badge': 'Task publishing',
    'post.title': 'Post a task on Vibe Working',
    'post.subtitle': 'Describe a simple online task, set a clear budget, and get applications from skilled teens in minutes with zero paperwork.',
    'post.categoryLabel': 'Select category',
    'post.titleLabel': 'Task title',
    'post.titleHint': 'Briefly and clearly state the core of your task',
    'post.titlePlaceholder': 'Example: Edit 3 short Reels videos for sneaker store',
    'post.budgetLabel': 'Reward budget',
    'post.budgetHint': 'Specify the amount the freelancer will receive upon completion',
    'post.descLabel': 'Detailed description',
    'post.descHint': 'Describe requirements, deliverable format, deadline and what you will provide',
    'post.descPlaceholder': 'What specifically needs to be done?\nExample: We will provide raw video footage and music track. Need dynamic editing, subtitles and sound effects in CapCut or Premiere...',
    'post.perk1': 'No contracts or paperwork',
    'post.perk2': 'Replies within 15 minutes',
    'post.perk3': 'Card & instant payouts',
    'post.submit': 'Publish task',
    'post.submitting': 'Publishing...',
    'post.catTexts': 'Texts',
    'post.catDesign': 'Design',
    'post.catVideo': 'Video / Reels',
    'post.catStudy': 'Study',
    'post.catTables': 'Spreadsheets',
    'post.catSocial': 'Social media',

    // Cabinet Page
    'cab.title': 'Personal Cabinet',
    'cab.unauthTitle': 'Vibe Working Cabinet',
    'cab.unauthDesc': 'Sign in with your Google account, phone, or email to track applications, post orders, and manage earned funds.',
    'cab.googleLogin': 'Continue with Google',
    'cab.toTasks': 'Back to task feed',
    'cab.roleWorker': '💼 Freelancer',
    'cab.roleClient': '🎯 Client',
    'cab.switchToClient': 'Switch to Client',
    'cab.switchToWorker': 'Switch to Freelancer',
    'cab.editProfile': 'Edit profile',
    'cab.settings': 'Settings',
    'cab.balance': 'Current balance',
    'cab.balanceSub': 'Payouts to card or instant transfer',
    'cab.topUp': '+ Top up',
    'cab.withdraw': 'Withdraw',
    'cab.ordersCount': 'Orders posted',
    'cab.ordersSub': 'Active tasks on the exchange',
    'cab.worksCount': 'My applications',
    'cab.worksSub': 'Completed & in progress',
    'cab.tabOrders': 'My orders',
    'cab.tabWorks': 'My applications & works',
    'cab.tabSettings': 'Profile settings',
    'cab.emptyOrders': 'You have no active orders yet',
    'cab.emptyOrdersDesc': 'Post a simple online task to find a reliable teen freelancer.',
    'cab.postFirstOrder': 'Post first order',
    'cab.emptyWorks': 'You haven’t applied to any tasks yet',
    'cab.emptyWorksDesc': 'Explore the task feed, find a great project and submit your first application!',
    'cab.goToFeed': 'Go to task feed',

    // Edit Profile Modal
    'profile.editTitle': 'Edit Profile',
    'profile.editSubtitle': 'Information is visible to other users during bids and orders',
    'profile.nameLabel': 'Display name',
    'profile.usernameLabel': 'Username (@handle)',
    'profile.tgLabel': 'Telegram contact',
    'profile.aboutLabel': 'About / Skills',
    'profile.aboutPlaceholder': 'Tell about what you do, what software you use...',
    'profile.saveBtn': 'Save changes',

    // Balance Modal
    'balance.topUpTitle': 'Top up balance',
    'balance.withdrawTitle': 'Withdraw funds',
    'balance.subtitle': 'Zero commission via instant transfer or bank card',
    'balance.amountLabel': 'Amount in Rubles (₽)',
    'balance.submitBtn': 'Confirm',

    // Auth Modal
    'auth.title': 'Sign in to Vibe Working',
    'auth.titleRegister': 'Register at Vibe Working',
    'auth.login': 'Sign in',
    'auth.register': 'Sign up',
    'auth.google': 'Continue with Google',
    'auth.orContacts': 'or via contacts',
    'auth.byPhone': 'By phone',
    'auth.byEmail': 'By email',
    'auth.nameLabel': 'Your name or nickname',
    'auth.namePlaceholder': 'e.g. Alex Johnson',
    'auth.roleLabel': 'Who are you on Vibe Working?',
    'auth.role.worker': '💼 Freelancer',
    'auth.role.workerSub': 'I want to take tasks',
    'auth.role.client': '🎯 Client',
    'auth.role.clientSub': 'I want to post tasks',
    'auth.phoneLabel': 'Phone number',
    'auth.phonePlaceholder': '+1 (555) 000-0000',
    'auth.smsLabel': 'SMS verification code (any 4 digits)',
    'auth.smsPlaceholder': '1234',
    'auth.emailLabel': 'Email address',
    'auth.emailPlaceholder': 'teen@example.com',
    'auth.passLabel': 'Password',
    'auth.passPlaceholder': 'At least 6 characters',
    'auth.submitLogin': 'Sign in to account',
    'auth.submitRegister': 'Create account',

    // Footer
    'footer.copy': '© 2026 Vibe Working — freelance marketplace for teens',

    // Avatar Cropper & Profile Photo
    'avatar.changePhoto': 'Change profile photo',
    'avatar.cropTitle': 'Crop Profile Photo',
    'avatar.cropSubtitle': 'Move and zoom image for the perfect circular avatar',
    'avatar.cancel': 'Cancel',
    'avatar.save': 'Save',
    'avatar.zoomIn': 'Zoom in',
    'avatar.zoomOut': 'Zoom out',
    'avatar.updated': 'Avatar updated successfully!',
    'avatar.errorLoading': 'Error loading image file',

    // Common & Actions
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.loading': 'Loading...',
    'common.user': 'User',

    // Username validation
    'profile.usernameHint': 'Latin letters (a-z), numbers, and _ only (3 to 20 chars)',
    'profile.usernameLatinOnly': 'Username must consist exclusively of Latin letters (a-z, 0-9, _)',

    // Categories
    'cat.texts': 'Texts',
    'cat.design': 'Design',
    'cat.video': 'Video / Reels',
    'cat.study': 'Study',
    'cat.tables': 'Spreadsheets',
    'cat.social': 'Social media',
    'cat.code': 'Coding',
    'cat.help': 'Assistance',
    'cat.other': 'Other',

    // Deadlines & Statuses
    'deadline.today': 'Today',
    'deadline.fewDays': '2-3 days',
    'deadline.week': 'Up to a week',
    'status.open': 'Open',
    'status.in_progress': 'In progress',
    'status.completed': 'Completed',

    // Toasts & Messages
    'toast.needLogin': 'Please sign in first',
    'toast.responseSent': 'Application sent to the client!',
    'toast.welcome': 'Welcome back!',
    'toast.logout': 'You have logged out',
    'toast.themeDark': 'Dark theme enabled',
    'toast.themeLight': 'Light theme enabled',
    'toast.langSwitched': 'Language switched to English',
    'toast.curSwitched': 'Currency changed to ',
    'toast.orderCreated': 'Task successfully published!',
    'toast.profileSaved': 'Profile successfully updated!',
    'toast.fillFields': 'Please fill all required fields',
    'toast.copied': 'Copied to clipboard',
    'toast.error': 'An error occurred, please try again',
    'toast.depositSuccess': 'Balance successfully topped up!',
    'toast.withdrawSuccess': 'Withdrawal request submitted!',
  }
};

// ============================================================================
// SETTINGS & LOCALIZATION MANAGER
// ============================================================================
class SettingsManager {
  private current: UserSettings = {
    theme: 'dark',
    lang: 'ru',
    currency: 'RUB',
    updatedAt: Date.now(),
  };

  private channel: BroadcastChannel | null = null;
  private subscribers: Array<(settings: UserSettings) => void> = [];
  private serverIp: string = '';
  private syncSource: 'user' | 'ip' | 'local' | 'default' = 'default';

  constructor() {
    this.readLocal();
    this.initSyncChannel();
    this.initStorageListener();
    this.injectMonochromeStyles();
    this.applyTheme(this.current.theme);
    this.applyDocumentLang(this.current.lang);

    if (typeof window !== 'undefined') {
      const onReady = () => {
        this.applyTranslations();
        this.updateUI();
        this.syncServerSettings();
        this.setupBackdropDismiss();
      };

      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', onReady);
      } else {
        onReady();
      }

      window.addEventListener('pageshow', () => {
        this.readLocal();
        this.applyTheme(this.current.theme);
        this.applyTranslations();
        this.updateUI();
        this.syncServerSettings();
      });

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.readLocal();
          this.applyTheme(this.current.theme);
          this.applyTranslations();
          this.updateUI();
        }
      });
    }
  }

  // Inject strict CSS for monochrome flags & emojis in settings
  private injectMonochromeStyles() {
    if (typeof document === 'undefined') return;
    const styleId = 'vw-monochrome-settings-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Strict monochrome enforcement for all emojis/flags inside settings modal */
      #settings-modal .flag-mono,
      #settings-modal .settings-opt span:first-child,
      #settings-modal .mono-icon,
      .flag-mono {
        filter: grayscale(100%) contrast(110%);
        -webkit-filter: grayscale(100%) contrast(110%);
        opacity: 0.9;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      #settings-modal .settings-opt svg {
        filter: none;
      }
      /* Click-outside backdrop cursor pointer */
      .modal-overlay {
        cursor: pointer;
      }
      .modal-overlay > * {
        cursor: default;
      }
    `;
    document.head.appendChild(style);
  }

  // Close modals on clicking outside of .modal-box or pressing Escape
  public setupBackdropDismiss() {
    if (typeof document === 'undefined') return;

    // Click outside on .modal-overlay
    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });

    // Global listener for dynamically created modals
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target && target.classList && target.classList.contains('modal-overlay') && target.classList.contains('active')) {
        target.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach((modal) => {
          modal.classList.remove('active');
        });
        document.body.style.overflow = '';
      }
    });
  }

  // 1. Read from LocalStorage
  private readLocal(): UserSettings {
    try {
      const raw = localStorage.getItem('vw_settings');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          if (parsed.theme === 'light' || parsed.theme === 'dark') this.current.theme = parsed.theme;
          if (parsed.lang === 'ru' || parsed.lang === 'en') this.current.lang = parsed.lang;
          if (['RUB', 'USD', 'EUR', 'BYN'].includes(parsed.currency)) this.current.currency = parsed.currency;
          if (parsed.updatedAt) this.current.updatedAt = parsed.updatedAt;
        }
      } else {
        const userRaw = localStorage.getItem('vw_user') || localStorage.getItem('vw_local_user');
        if (userRaw) {
          const user = JSON.parse(userRaw);
          if (user?.settings) {
            if (user.settings.theme) this.current.theme = user.settings.theme;
            if (user.settings.lang) this.current.lang = user.settings.lang;
            if (user.settings.currency) this.current.currency = user.settings.currency;
          }
        }
      }
    } catch (_) {}
    return this.current;
  }

  // Save locally
  private saveLocal() {
    try {
      this.current.updatedAt = Date.now();
      localStorage.setItem('vw_settings', JSON.stringify(this.current));
      const userRaw = localStorage.getItem('vw_user') || localStorage.getItem('vw_local_user');
      if (userRaw) {
        const user = JSON.parse(userRaw);
        user.settings = { ...this.current };
        localStorage.setItem('vw_user', JSON.stringify(user));
        localStorage.setItem('vw_local_user', JSON.stringify(user));
      }
    } catch (_) {}
  }

  // Broadcast settings across tabs & pages
  private initSyncChannel() {
    if (typeof window === 'undefined') return;
    try {
      this.channel = new BroadcastChannel('vw_settings_sync');
      this.channel.onmessage = (event) => {
        if (event && event.data && typeof event.data === 'object') {
          this.handleExternalSettings(event.data);
        }
      };
    } catch (_) {}
  }

  private initStorageListener() {
    if (typeof window === 'undefined') return;
    window.addEventListener('storage', (e) => {
      if (e.key === 'vw_settings' && e.newValue) {
        try {
          const s = JSON.parse(e.newValue);
          this.handleExternalSettings(s);
        } catch (_) {}
      }
    });
  }

  private handleExternalSettings(s: Partial<UserSettings>) {
    let changed = false;
    if (s.theme && (s.theme === 'light' || s.theme === 'dark') && s.theme !== this.current.theme) {
      this.current.theme = s.theme;
      this.applyTheme(s.theme);
      changed = true;
    }
    if (s.lang && (s.lang === 'ru' || s.lang === 'en') && s.lang !== this.current.lang) {
      this.current.lang = s.lang;
      this.applyDocumentLang(s.lang);
      this.applyTranslations();
      changed = true;
    }
    if (s.currency && ['RUB', 'USD', 'EUR', 'BYN'].includes(s.currency) && s.currency !== this.current.currency) {
      this.current.currency = s.currency;
      changed = true;
    }
    if (changed) {
      this.updateUI();
      this.notifySubscribers();
      window.dispatchEvent(new CustomEvent('vw:settings-changed', { detail: { ...this.current } }));
      window.dispatchEvent(new CustomEvent('vw:lang-changed', { detail: { lang: this.current.lang } }));
    }
  }

  private broadcast() {
    this.saveLocal();
    try {
      if (this.channel) {
        this.channel.postMessage({ ...this.current });
      }
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('vw:settings-changed', { detail: { ...this.current } }));
    window.dispatchEvent(new CustomEvent('vw:lang-changed', { detail: { lang: this.current.lang } }));
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach((cb) => {
      try {
        cb({ ...this.current });
      } catch (_) {}
    });
  }

  // Server synchronization
  public async syncServerSettings(): Promise<UserSettings> {
    try {
      const token = localStorage.getItem('vw_session_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/settings', { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.ip) this.serverIp = data.ip;
        this.syncSource = data.source || (token ? 'user' : 'ip');

        if (data.settings) {
          const s = data.settings;
          const serverTime = s.updatedAt || 0;
          const localTime = this.current.updatedAt || 0;

          if (serverTime >= localTime) {
            if (s.theme && (s.theme === 'light' || s.theme === 'dark')) this.current.theme = s.theme;
            if (s.lang && (s.lang === 'ru' || s.lang === 'en')) this.current.lang = s.lang;
            if (s.currency && ['RUB', 'USD', 'EUR', 'BYN'].includes(s.currency)) this.current.currency = s.currency;
            this.current.updatedAt = serverTime;

            this.saveLocal();
            this.applyTheme(this.current.theme);
            this.applyDocumentLang(this.current.lang);
            this.applyTranslations();
          } else {
            this.saveServerSettings();
          }
        }
        this.updateUI();
      }
    } catch (_) {
      this.syncSource = 'local';
      this.updateUI();
    }
    return this.current;
  }

  public async saveServerSettings(): Promise<void> {
    try {
      const token = localStorage.getItem('vw_session_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/settings', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          theme: this.current.theme,
          lang: this.current.lang,
          currency: this.current.currency,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ip) this.serverIp = data.ip;
        this.syncSource = data.source || (token ? 'user' : 'ip');
        this.updateUI();
      }
    } catch (_) {
      this.syncSource = 'local';
      this.updateUI();
    }
  }

  // Getters & Setters
  public getSettings(): UserSettings {
    return { ...this.current };
  }

  public getTheme(): 'dark' | 'light' {
    return this.current.theme;
  }

  public getLanguage(): 'ru' | 'en' {
    return this.current.lang;
  }

  public getCurrency(): 'RUB' | 'USD' | 'EUR' | 'BYN' {
    return this.current.currency;
  }

  public setTheme(theme: 'dark' | 'light', skipServer = false) {
    if (this.current.theme === theme) return;
    this.current.theme = theme;
    this.applyTheme(theme);
    this.broadcast();
    this.updateUI();
    if (!skipServer) this.saveServerSettings();
  }

  public setLanguage(lang: 'ru' | 'en', skipServer = false) {
    if (this.current.lang === lang) return;
    this.current.lang = lang;
    this.applyDocumentLang(lang);
    this.applyTranslations();
    this.broadcast();
    this.updateUI();
    if (!skipServer) this.saveServerSettings();
  }

  public setCurrency(currency: 'RUB' | 'USD' | 'EUR' | 'BYN', skipServer = false) {
    if (this.current.currency === currency) return;
    this.current.currency = currency;
    this.broadcast();
    this.updateUI();
    if (!skipServer) this.saveServerSettings();
  }

  // Currency Formatter
  public formatPrice(rubAmount: number): string {
    const cur = CURRENCIES[this.current.currency] || CURRENCIES.RUB;
    const value = rubAmount * cur.rate;
    const num = value.toFixed(cur.decimals).replace('.', ',');
    let formatted = num;
    if (cur.decimals === 0) {
      formatted = String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    } else {
      const parts = num.split(',');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      formatted = parts.join(',');
    }
    return cur.position === 'before'
      ? `${cur.symbol}${formatted}`
      : `${formatted} ${cur.symbol}`;
  }

  public convertToRub(amountInCurrent: number): number {
    const cur = CURRENCIES[this.current.currency] || CURRENCIES.RUB;
    return Math.round(amountInCurrent / cur.rate);
  }

  public t(key: string): string {
    const dict = TRANSLATIONS[this.current.lang] || TRANSLATIONS.ru;
    return dict[key] || TRANSLATIONS.ru[key] || key;
  }

  public translateCategory(cat: string): string {
    const isEn = this.current.lang === 'en';
    const c = (cat || '').toLowerCase().trim();
    if (!isEn) {
      if (c === 'тексты' || c === 'texts') return 'Тексты';
      if (c === 'дизайн' || c === 'design') return 'Дизайн';
      if (c.includes('видео') || c.includes('video') || c.includes('reels')) return 'Видео / Reels';
      if (c === 'учёба' || c === 'учеба' || c === 'study') return 'Учёба';
      if (c === 'таблицы' || c === 'spreadsheets' || c === 'tables') return 'Таблицы';
      if (c === 'соцсети' || c === 'social') return 'Соцсети';
      if (c === 'код' || c === 'code' || c === 'coding') return 'Код';
      if (c === 'помощь' || c === 'help') return 'Помощь';
      if (c === 'другое' || c === 'other') return 'Другое';
      return cat;
    }
    if (c === 'тексты' || c === 'texts') return 'Texts';
    if (c === 'дизайн' || c === 'design') return 'Design';
    if (c.includes('видео') || c.includes('video') || c.includes('reels')) return 'Video / Reels';
    if (c === 'учёба' || c === 'учеба' || c === 'study') return 'Study';
    if (c === 'таблицы' || c === 'spreadsheets' || c === 'tables') return 'Spreadsheets';
    if (c === 'соцсети' || c === 'social') return 'Social media';
    if (c === 'код' || c === 'code' || c === 'coding') return 'Coding';
    if (c === 'помощь' || c === 'help') return 'Assistance';
    if (c === 'другое' || c === 'other') return 'Other';
    return cat;
  }

  public formatDisplayName(name?: string, username?: string): string {
    let clean = (name || '').trim();
    if (!clean && username) {
      clean = username.replace(/^@/, '').trim();
    }
    if (!clean) return this.current.lang === 'en' ? 'User' : 'Пользователь';

    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const first = parts[0];
      const secondChar = parts[1].charAt(0).toUpperCase();
      return `${first} ${secondChar}.`;
    }
    return parts[0];
  }

  private applyTheme(theme: 'dark' | 'light') {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
  }

  private applyDocumentLang(lang: 'ru' | 'en') {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
  }

  // Universal translation application across all elements
  public applyTranslations(root: HTMLElement | Document = document) {
    if (typeof document === 'undefined') return;

    // Text content
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        const val = this.t(key);
        if (val) {
          // If the element has child nodes and one is a text node or it's pure text
          el.textContent = val;
        }
      }
    });

    // Placeholders
    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        const val = this.t(key);
        if (val && 'placeholder' in el) {
          (el as HTMLInputElement).placeholder = val;
        }
      }
    });

    // Titles / Tooltips
    root.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        const val = this.t(key);
        if (val && 'title' in el) {
          (el as HTMLElement).title = val;
        }
      }
    });

    // Aria-labels
    root.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) {
        const val = this.t(key);
        if (val) {
          el.setAttribute('aria-label', val);
        }
      }
    });
  }

  public updateUI() {
    if (typeof document === 'undefined') return;
    const { theme, lang, currency } = this.current;

    // Theme buttons
    const tDark = document.getElementById('theme-opt-dark');
    const tLight = document.getElementById('theme-opt-light');
    if (tDark) tDark.classList.toggle('active', theme === 'dark');
    if (tLight) tLight.classList.toggle('active', theme === 'light');

    // Language buttons
    const lRu = document.getElementById('lang-opt-ru');
    const lEn = document.getElementById('lang-opt-en');
    if (lRu) lRu.classList.toggle('active', lang === 'ru');
    if (lEn) lEn.classList.toggle('active', lang === 'en');

    // Currency buttons
    const cRub = document.getElementById('cur-opt-rub');
    const cUsd = document.getElementById('cur-opt-usd');
    const cEur = document.getElementById('cur-opt-eur');
    const cByn = document.getElementById('cur-opt-byn');
    if (cRub) cRub.classList.toggle('active', currency === 'RUB');
    if (cUsd) cUsd.classList.toggle('active', currency === 'USD');
    if (cEur) cEur.classList.toggle('active', currency === 'EUR');
    if (cByn) cByn.classList.toggle('active', currency === 'BYN');

    // Select dropdown in 2 - объявление.html
    const curSelect = document.getElementById('task-currency-select') as HTMLSelectElement | null;
    if (curSelect && curSelect.value !== currency) {
      curSelect.value = currency;
    }

    // IP Notice
    const noticeEl = document.getElementById('settings-ip-notice');
    if (noticeEl) {
      const isRu = lang === 'ru';
      if (this.syncSource === 'user') {
        noticeEl.textContent = isRu ? 'Синхронизировано с вашим профилем' : 'Settings synced with your profile';
      } else if (this.syncSource === 'ip' && this.serverIp) {
        noticeEl.textContent = isRu ? `Синхронизировано по IP: ${this.serverIp}` : `Synced on server by IP: ${this.serverIp}`;
      } else if (this.syncSource === 'local') {
        noticeEl.textContent = isRu ? 'Синхронизировано на этом устройстве' : 'Synced on this device';
      } else {
        noticeEl.textContent = isRu ? 'Настройки сохранены' : 'Settings synced';
      }
    }
  }

  public subscribe(cb: (settings: UserSettings) => void): () => void {
    this.subscribers.push(cb);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }
}

// ============================================================================
// CROSS-PAGE AUTH SYNCHRONIZATION MANAGER
// ============================================================================
class AuthSyncManager {
  private authChannel: BroadcastChannel | null = null;
  private listeners: Array<(user: UserProfile | null) => void> = [];

  constructor() {
    if (typeof window === 'undefined') return;
    try {
      this.authChannel = new BroadcastChannel('vw_auth_sync');
      this.authChannel.onmessage = (e) => {
        if (e && e.data) {
          this.handleAuthBroadcast(e.data.user, e.data.token, false);
        }
      };
    } catch (_) {}

    window.addEventListener('storage', (e) => {
      if (e.key === 'vw_user' || e.key === 'vw_session_token') {
        const u = this.getUser();
        this.notify(u);
      }
    });

    // Background server check on init
    window.addEventListener('DOMContentLoaded', () => {
      this.verifyAndSyncServer();
    });
  }

  public getUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem('vw_user') || localStorage.getItem('vw_local_user');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  public getToken(): string {
    try {
      return localStorage.getItem('vw_session_token') || '';
    } catch (_) {
      return '';
    }
  }

  public setUser(user: UserProfile | null, token?: string, broadcast = true) {
    if (!user) {
      localStorage.removeItem('vw_user');
      localStorage.removeItem('vw_local_user');
      localStorage.removeItem('vw_session_token');
    } else {
      localStorage.setItem('vw_user', JSON.stringify(user));
      localStorage.setItem('vw_local_user', JSON.stringify(user));
      if (token) {
        localStorage.setItem('vw_session_token', token);
      } else if (!localStorage.getItem('vw_session_token')) {
        const genToken = 'token_' + (user.id || Math.random().toString(36).substring(2));
        localStorage.setItem('vw_session_token', genToken);
      }
    }

    if (broadcast) {
      try {
        if (this.authChannel) {
          this.authChannel.postMessage({ user, token: this.getToken() });
        }
      } catch (_) {}
    }

    this.notify(user);

    // Sync user with backend
    if (user) {
      this.syncServerUser(user, this.getToken());
    }
  }

  public async syncServerUser(user: UserProfile, token: string) {
    try {
      await fetch('/api/auth/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'x-user-id': user.id,
        },
        body: JSON.stringify({ user, token }),
      });
    } catch (_) {}
  }

  public async verifyAndSyncServer() {
    const user = this.getUser();
    const token = this.getToken();
    if (!user) return;

    // First ensure backend has this user
    await this.syncServerUser(user, token);

    // Now verify /api/auth/me
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user.id,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.user) {
          // Merge server data with local profile
          const updated = { ...user, ...data.user };
          localStorage.setItem('vw_user', JSON.stringify(updated));
          localStorage.setItem('vw_local_user', JSON.stringify(updated));
          this.notify(updated);
        }
      }
    } catch (_) {}
  }

  public handleAuthBroadcast(user: UserProfile | null, token?: string, _fromSelf = false) {
    if (!user) {
      localStorage.removeItem('vw_user');
      localStorage.removeItem('vw_local_user');
      localStorage.removeItem('vw_session_token');
    } else {
      localStorage.setItem('vw_user', JSON.stringify(user));
      localStorage.setItem('vw_local_user', JSON.stringify(user));
      if (token) localStorage.setItem('vw_session_token', token);
    }
    this.notify(user);
  }

  public onAuthChange(cb: (user: UserProfile | null) => void): () => void {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify(user: UserProfile | null) {
    this.listeners.forEach((l) => {
      try {
        l(user);
      } catch (_) {}
    });
    window.dispatchEvent(new CustomEvent('vw:auth-changed', { detail: { user } }));
  }

  public logout() {
    this.setUser(null, '', true);
    try {
      fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    } catch (_) {}
  }
}

// Singletons attached to window
export const settingsManager = new SettingsManager();
export const authSyncManager = new AuthSyncManager();

if (typeof window !== 'undefined') {
  (window as any).VWSettings = settingsManager;
  (window as any).VWAuth = authSyncManager;

  // Global helper functions
  (window as any).setTheme = (theme: 'dark' | 'light') => settingsManager.setTheme(theme);
  (window as any).setLanguage = (lang: 'ru' | 'en') => settingsManager.setLanguage(lang);
  (window as any).setCurrency = (cur: any) => settingsManager.setCurrency(cur);
  (window as any).formatPrice = (val: number) => settingsManager.formatPrice(val);
  (window as any).t = (key: string) => settingsManager.t(key);
  (window as any).translateCategory = (cat: string) => settingsManager.translateCategory(cat);
  (window as any).formatDisplayName = (name?: string, u?: string) => settingsManager.formatDisplayName(name, u);

  // Global settings modal control with outside click dismiss
  (window as any).openSettingsModal = () => {
    const modal = document.getElementById('settings-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      settingsManager.updateUI();
    }
  };

  (window as any).closeSettingsModal = () => {
    const modal = document.getElementById('settings-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };
}
