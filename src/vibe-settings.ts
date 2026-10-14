// Vibe Working Unified Settings & Cross-Page Synchronization Manager
// Handles Theme, Language, Currency with persistence across:
// 1. IP (via /api/settings)
// 2. User Profile (via /api/settings & session)
// 3. LocalStorage & Indexed cache (instant zero-flicker on reload & static hosting fallback)
// 4. Cross-page and Cross-tab real-time sync (BroadcastChannel + storage events)

export interface UserSettings {
  theme: 'dark' | 'light';
  lang: 'ru' | 'en';
  currency: 'RUB' | 'USD' | 'EUR' | 'BYN';
  updatedAt?: number;
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
    'hero.badge2': 'Проверенные заказчики',
    'hero.badge3': 'Оплата на карту или СБП',

    // Tasks
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

    // Settings Modal
    'settings.title': 'Настройки',
    'settings.subtitle': 'Настройки сохраняются на сервере по вашему IP и профилю',
    'settings.theme': 'Тема оформления',
    'settings.theme.dark': '🌙 Тёмная',
    'settings.theme.light': '☀️ Светлая',
    'settings.language': 'Язык',
    'settings.currency': 'Валюта',
    'settings.account': 'Личный кабинет',
    'settings.account.meta': 'Профиль и заказы',
    'settings.logout': 'Выйти из аккаунта',
    'settings.syncedProfile': 'Настройки синхронизированы с вашим профилем',
    'settings.syncedIp': 'Настройки сохранены на сервере для вашего IP',
    'settings.syncedLocal': 'Настройки синхронизированы на вашем устройстве',

    // Create Order Page
    'post.badge': 'Публикация заказа',
    'post.title': 'Разместить заказ на Vibe Working',
    'post.subtitle': 'Опишите простую онлайн-задачу, установите понятную цену и получите отклики от подростков-исполнителей уже через пару минут без бумажных договоров.',
    'post.categoryLabel': 'Выберите категорию',
    'post.titleLabel': 'Название задания',
    'post.titlePlaceholder': 'Например: Смонтировать динамичный Reels для бренда одежды...',
    'post.budgetLabel': 'Бюджет',
    'post.descLabel': 'Подробное описание',
    'post.descPlaceholder': 'Что конкретно нужно сделать? Требования, формат сдачи и дедлайн...',
    'post.perk1': 'Без ИП и бумажных договоров',
    'post.perk2': 'Отклики в первые 15 минут',
    'post.perk3': 'Выплаты на карту или СБП',
    'post.submit': 'Опубликовать задание',
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
    'cab.googleLogin': 'Вход через Google',
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
    'cab.worksCount': 'Мои работы и отклики',
    'cab.tabOrders': 'Мои заказы',
    'cab.tabWorks': 'Мои отклики и работы',
    'cab.tabSettings': 'Настройки профиля',
    'cab.emptyOrders': 'У вас пока нет активных заказов',
    'cab.emptyOrdersDesc': 'Разместите простое онлайн-задание, чтобы найти ответственного исполнителя среди подростков.',
    'cab.postFirstOrder': 'Разместить первый заказ',
    'cab.emptyWorks': 'Вы ещё не откликались на задания',
    'cab.emptyWorksDesc': 'Перейдите в ленту заданий, выберите подходящий заказ и отправьте свой первый отклик!',
    'cab.goToFeed': 'Перейти к ленте заданий',

    // Auth
    'auth.title': 'Вход в Vibe Working',
    'auth.login': 'Войти',
    'auth.register': 'Регистрация',
    'auth.google': 'Продолжить через Google',
    'auth.orContacts': 'или через контакты',
    'auth.byPhone': 'По телефону',
    'auth.byEmail': 'По почте',
    'auth.nameLabel': 'Ваше имя или никнейм',
    'auth.roleLabel': 'Кто вы на Vibe Working?',
    'auth.role.worker': '💼 Исполнитель',
    'auth.role.workerSub': 'Хочу брать задания',
    'auth.role.client': '🎯 Заказчик',
    'auth.role.clientSub': 'Хочу размещать задания',
    'auth.phoneLabel': 'Номер телефона',
    'auth.smsLabel': 'Код из СМС',
    'auth.emailLabel': 'Электронная почта',
    'auth.passLabel': 'Пароль',
    'auth.submitLogin': 'Войти в аккаунт',
    'auth.submitRegister': 'Создать аккаунт',

    // Toasts
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
    'hero.badge2': 'Verified clients',
    'hero.badge3': 'Instant card payouts',

    // Tasks
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

    // Settings Modal
    'settings.title': 'Settings',
    'settings.subtitle': 'Settings are saved on the server by your IP and profile',
    'settings.theme': 'Theme',
    'settings.theme.dark': '🌙 Dark',
    'settings.theme.light': '☀️ Light',
    'settings.language': 'Language',
    'settings.currency': 'Currency',
    'settings.account': 'Personal cabinet',
    'settings.account.meta': 'Profile and orders',
    'settings.logout': 'Log out',
    'settings.syncedProfile': 'Settings synced with your profile',
    'settings.syncedIp': 'Settings saved on server for your IP',
    'settings.syncedLocal': 'Settings synced on this device',

    // Create Order Page
    'post.badge': 'Task publishing',
    'post.title': 'Post a task on Vibe Working',
    'post.subtitle': 'Describe a simple online task, set a clear budget, and get applications from skilled teens in minutes with zero paperwork.',
    'post.categoryLabel': 'Select category',
    'post.titleLabel': 'Task title',
    'post.titlePlaceholder': 'Example: Edit a dynamic Reels video for clothing brand...',
    'post.budgetLabel': 'Budget',
    'post.descLabel': 'Detailed description',
    'post.descPlaceholder': 'What specifically needs to be done? Requirements, deliverable format and deadline...',
    'post.perk1': 'No contracts or paperwork',
    'post.perk2': 'Replies within 15 minutes',
    'post.perk3': 'Card & instant payouts',
    'post.submit': 'Publish task',
    'post.catTexts': 'Texts',
    'post.catDesign': 'Design',
    'post.catVideo': 'Video / Reels',
    'post.catStudy': 'Study',
    'post.catTables': 'Tables',
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
    'cab.worksCount': 'My applications',
    'cab.tabOrders': 'My orders',
    'cab.tabWorks': 'My applications & works',
    'cab.tabSettings': 'Profile settings',
    'cab.emptyOrders': 'You have no active orders yet',
    'cab.emptyOrdersDesc': 'Post a simple online task to find a reliable teen freelancer.',
    'cab.postFirstOrder': 'Post first order',
    'cab.emptyWorks': 'You haven’t applied to any tasks yet',
    'cab.emptyWorksDesc': 'Explore the task feed, find a great project and submit your first application!',
    'cab.goToFeed': 'Go to task feed',

    // Auth
    'auth.title': 'Sign in to Vibe Working',
    'auth.login': 'Sign in',
    'auth.register': 'Sign up',
    'auth.google': 'Continue with Google',
    'auth.orContacts': 'or via contacts',
    'auth.byPhone': 'By phone',
    'auth.byEmail': 'By email',
    'auth.nameLabel': 'Your name or nickname',
    'auth.roleLabel': 'Who are you on Vibe Working?',
    'auth.role.worker': '💼 Freelancer',
    'auth.role.workerSub': 'I want to take tasks',
    'auth.role.client': '🎯 Client',
    'auth.role.clientSub': 'I want to post tasks',
    'auth.phoneLabel': 'Phone number',
    'auth.smsLabel': 'SMS verification code',
    'auth.emailLabel': 'Email address',
    'auth.passLabel': 'Password',
    'auth.submitLogin': 'Sign in to account',
    'auth.submitRegister': 'Create account',

    // Toasts
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
  }
};

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
    this.applyTheme(this.current.theme);
    this.applyDocumentLang(this.current.lang);

    // Initial server fetch
    if (typeof window !== 'undefined') {
      window.addEventListener('DOMContentLoaded', () => {
        this.applyTranslations();
        this.updateUI();
        this.syncServerSettings();
      });

      // Synchronize when page becomes visible or via back/forward cache
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

  // 1. Чтение настроек из LocalStorage
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
        // Проверяем кэш пользователя, если vw_settings еще нет
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

  // Сохранение локально
  private saveLocal() {
    try {
      this.current.updatedAt = Date.now();
      localStorage.setItem('vw_settings', JSON.stringify(this.current));
      // Также обновляем кэш настроек в локальном профиле
      const userRaw = localStorage.getItem('vw_user') || localStorage.getItem('vw_local_user');
      if (userRaw) {
        const user = JSON.parse(userRaw);
        user.settings = { ...this.current };
        localStorage.setItem('vw_user', JSON.stringify(user));
        localStorage.setItem('vw_local_user', JSON.stringify(user));
      }
    } catch (_) {}
  }

  // 2. BroadcastChannel для мгновенной синхронизации между открытыми страницами и вкладками
  private initSyncChannel() {
    if (typeof window === 'undefined') return;
    try {
      this.channel = new BroadcastChannel('vw_settings_sync');
      this.channel.onmessage = (event) => {
        if (event && event.data && typeof event.data === 'object') {
          this.handleExternalSettings(event.data);
        }
      };
    } catch (e) {
      // BroadcastChannel не поддерживается старыми средами, будет работать через storage event
    }
  }

  // 3. Storage event для кросс-страничной синхронизации
  private initStorageListener() {
    if (typeof window === 'undefined') return;
    window.addEventListener('storage', (event) => {
      if (event.key === 'vw_settings' && event.newValue) {
        try {
          const s = JSON.parse(event.newValue);
          this.handleExternalSettings(s);
        } catch (_) {}
      }
    });
  }

  private handleExternalSettings(newSettings: Partial<UserSettings>) {
    let changed = false;
    if (newSettings.theme && (newSettings.theme === 'light' || newSettings.theme === 'dark') && newSettings.theme !== this.current.theme) {
      this.current.theme = newSettings.theme;
      changed = true;
    }
    if (newSettings.lang && (newSettings.lang === 'ru' || newSettings.lang === 'en') && newSettings.lang !== this.current.lang) {
      this.current.lang = newSettings.lang;
      changed = true;
    }
    if (newSettings.currency && ['RUB', 'USD', 'EUR', 'BYN'].includes(newSettings.currency) && newSettings.currency !== this.current.currency) {
      this.current.currency = newSettings.currency as any;
      changed = true;
    }

    if (changed) {
      this.applyTheme(this.current.theme);
      this.applyDocumentLang(this.current.lang);
      this.applyTranslations();
      this.updateUI();
      this.notifySubscribers();
    }
  }

  private notifySubscribers() {
    this.subscribers.forEach((cb) => {
      try {
        cb({ ...this.current });
      } catch (_) {}
    });
    // Также диспатчим глобальный кастомный эвент
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vw:settings-changed', { detail: { ...this.current } }));
    }
  }

  private broadcast() {
    this.saveLocal();
    if (this.channel) {
      try {
        this.channel.postMessage({ ...this.current });
      } catch (_) {}
    }
    this.notifySubscribers();
  }

  // 4. Синхронизация с сервером по IP и профилю
  public async syncServerSettings() {
    try {
      const headers: Record<string, string> = {};
      const token = localStorage.getItem('vw_session_token');
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
        headers['x-session-token'] = token;
      }

      const res = await fetch('/api/settings', { headers });
      if (res.ok) {
        const data = await res.json();
        if (data && data.settings) {
          this.serverIp = data.ip || '';
          this.syncSource = data.source || 'ip';

          const s = data.settings;
          let changed = false;
          if (s.theme && s.theme !== this.current.theme) {
            this.current.theme = s.theme;
            changed = true;
          }
          if (s.lang && s.lang !== this.current.lang) {
            this.current.lang = s.lang;
            changed = true;
          }
          if (s.currency && s.currency !== this.current.currency) {
            this.current.currency = s.currency;
            changed = true;
          }

          this.saveLocal();
          this.applyTheme(this.current.theme);
          this.applyDocumentLang(this.current.lang);
          this.applyTranslations();
          this.updateUI();

          if (changed) {
            this.notifySubscribers();
          }
        }
      }
    } catch (_) {
      // На статическом хостинге (GitHub Pages) или офлайне
      this.syncSource = 'local';
      this.updateUI();
    }
  }

  public async saveServerSettings() {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      const token = localStorage.getItem('vw_session_token');
      if (token) {
        headers['Authorization'] = 'Bearer ' + token;
        headers['x-session-token'] = token;
      }

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

  // 5. Публичные геттеры и сеттеры
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

  // 6. Форматирование цен и валют
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

  // 7. Применение DOM стилей и переводов
  private applyTheme(theme: 'dark' | 'light') {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
  }

  private applyDocumentLang(lang: 'ru' | 'en') {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
  }

  public applyTranslations(root: HTMLElement | Document = document) {
    if (typeof document === 'undefined') return;
    root.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        const val = this.t(key);
        if (val) el.textContent = val;
      }
    });

    root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) {
        const val = this.t(key);
        if (val && 'placeholder' in el) (el as HTMLInputElement).placeholder = val;
      }
    });

    root.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (key) {
        const val = this.t(key);
        if (val && 'title' in el) (el as HTMLElement).title = val;
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

    // Select elements (e.g. in 2 - объявление.html)
    const curSelect = document.getElementById('task-currency-select') as HTMLSelectElement | null;
    if (curSelect && curSelect.value !== currency) {
      curSelect.value = currency;
    }

    // IP Notice / Profile sync indicator
    const noticeEl = document.getElementById('settings-ip-notice');
    if (noticeEl) {
      const isRu = lang === 'ru';
      if (this.syncSource === 'user') {
        noticeEl.textContent = isRu ? 'Синхронизировано с вашим профилем' : 'Settings synced with your profile';
      } else if (this.syncSource === 'ip' && this.serverIp) {
        noticeEl.textContent = isRu ? `Синхронизировано на сервере по IP: ${this.serverIp}` : `Synced on server by IP: ${this.serverIp}`;
      } else if (this.syncSource === 'local') {
        noticeEl.textContent = isRu ? 'Синхронизировано на этом устройстве' : 'Synced on this device';
      } else {
        noticeEl.textContent = isRu ? (this.serverIp ? `Синхронизировано по IP: ${this.serverIp}` : 'Настройки сохранены') : 'Settings synced';
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

// Single instance attached to window
export const settingsManager = new SettingsManager();

if (typeof window !== 'undefined') {
  (window as any).VWSettings = settingsManager;
  // Backward compatibility global wrappers
  (window as any).setTheme = (theme: 'dark' | 'light') => settingsManager.setTheme(theme);
  (window as any).setLanguage = (lang: 'ru' | 'en') => settingsManager.setLanguage(lang);
  (window as any).setCurrency = (cur: any) => settingsManager.setCurrency(cur);
  (window as any).formatPrice = (val: number) => settingsManager.formatPrice(val);
}
