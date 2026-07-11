const SHEET_ID = "10bkSZdCo2muUhXjcTULCRA5VHH1BQ040iKQl_XXdH-A";
const SHEET_NAME = "Price List";

const copy = {
  en: { home: "Home", about: "About", blogs: "Blogs", contact: "Contact", view: "View", contactUs: "Contact Us", categories: "Product Categories", explore: "Explore Boomerang collections", categoryIntro: "Catalogue groups arranged for quick browsing and project enquiries.", open: "Open collection", projects: "Projects", projectTitle: "Selected Boomerang bathroom applications", projectIntro: "Selected Boomerang applications for bathroom spaces.", social: "Social", follow: "Follow Boomerang", filters: "Filters", search: "Search products", brand: "Brand", sort: "Sort by", all: "All brands", featured: "Featured", az: "Name A-Z", za: "Name Z-A", priceLow: "Price: low to high", priceHigh: "Price: high to low", products: "products", noProducts: "No products are listed in this category yet.", priceOnRequest: "Price on request", imageComing: "Image coming soon", sheetError: "Showing the saved catalogue. Live prices will return when the Sheet is available." },
  fa: { home: "خانه", about: "درباره ما", blogs: "بلاگ", contact: "تماس", view: "مشاهده", contactUs: "تماس با ما", categories: "دسته بندی محصولات", explore: "کالکشن های بومرنگ را ببینید", categoryIntro: "گروه های کاتالوگ برای مرور سریع و درخواست پروژه مرتب شده اند.", open: "مشاهده کالکشن", projects: "پروژه ها", projectTitle: "نمونه کاربرد محصولات بومرنگ در فضاهای حمام", projectIntro: "نمونه های منتخب استفاده از محصولات بومرنگ برای فضای حمام.", social: "شبکه های اجتماعی", follow: "بومرنگ را دنبال کنید", filters: "فیلترها", search: "جستجوی محصول", brand: "برند", sort: "مرتب سازی", all: "همه برندها", featured: "پیشنهادی", az: "نام از الف تا ی", za: "نام از ی تا الف", priceLow: "قیمت صعودی", priceHigh: "قیمت نزولی", products: "محصول", noProducts: "هنوز محصولی در این دسته ثبت نشده است.", priceOnRequest: "استعلام قیمت", imageComing: "عکس به زودی", sheetError: "کاتالوگ ذخیره شده نمایش داده می شود. قیمت زنده پس از اتصال شیت برمی گردد." },
  ar: { home: "الرئيسية", about: "من نحن", blogs: "المدونة", contact: "اتصل بنا", view: "عرض", contactUs: "اتصل بنا", categories: "فئات المنتجات", explore: "استكشف مجموعات بوميرانغ", categoryIntro: "مجموعات الكتالوج مرتبة للتصفح السريع وطلبات المشاريع.", open: "عرض المجموعة", projects: "المشاريع", projectTitle: "تطبيقات مختارة لمنتجات بوميرانغ في الحمامات", projectIntro: "تطبيقات مختارة من بوميرانغ لمساحات الحمام.", social: "التواصل الاجتماعي", follow: "تابع بوميرانغ", filters: "التصفية", search: "بحث المنتجات", brand: "العلامة", sort: "الترتيب", all: "كل العلامات", featured: "مميز", az: "الاسم أ-ي", za: "الاسم ي-أ", priceLow: "السعر تصاعدي", priceHigh: "السعر تنازلي", products: "منتج", noProducts: "لا توجد منتجات في هذه الفئة بعد.", priceOnRequest: "السعر عند الطلب", imageComing: "الصورة قريبا", sheetError: "يتم عرض الكتالوج المحفوظ. ستعود الأسعار المباشرة عند توفر الجدول." },
  ru: { home: "Главная", about: "О нас", blogs: "Блог", contact: "Контакты", view: "Смотреть", contactUs: "Связаться", categories: "Категории товаров", explore: "Коллекции Boomerang", categoryIntro: "Разделы каталога собраны для быстрого просмотра и проектных запросов.", open: "Открыть коллекцию", projects: "Проекты", projectTitle: "Избранные применения продукции Boomerang для ванных комнат", projectIntro: "Избранные решения Boomerang для ванных комнат.", social: "Соцсети", follow: "Следите за Boomerang", filters: "Фильтры", search: "Поиск товаров", brand: "Бренд", sort: "Сортировка", all: "Все бренды", featured: "Рекомендуемые", az: "Название А-Я", za: "Название Я-А", priceLow: "Цена по возрастанию", priceHigh: "Цена по убыванию", products: "товаров", noProducts: "В этой категории пока нет товаров.", priceOnRequest: "Цена по запросу", imageComing: "Изображение скоро", sheetError: "Показан сохраненный каталог. Цены обновятся после подключения таблицы." }
};

Object.entries({
  en: {
    socialIntro: "Products, installations, catalogue releases, and showroom updates.",
    faqPriceQ: "How are catalogue prices updated?",
    faqPriceA: "Product names and available prices are read from the connected Boomerang Google Sheet.",
    faqProjectQ: "Can I request project pricing?",
    faqProjectA: "Yes. Use the contact page and include your product list or project requirements.",
    faqDetailsQ: "Where can I see technical details?",
    faqDetailsA: "Product model and brand information appears on each catalogue card. More specifications can be added to the Sheet later.",
    footerTagline: "Contemporary bathroom products for residential and professional projects.",
    footerCollections: "Collections",
    footerCompany: "Company",
    footerRights: "\u00a9 2026 Boomerang. All rights reserved.",
    cVanity: "Vanity Units",
    cFaucets: "Faucets",
    cMirrors: "Mirrors",
    cWashbasins: "Washbasins",
    cShelves: "Shelves",
    cAccessories: "Accessories"
  },
  fa: {
    socialIntro: "\u0645\u062d\u0635\u0648\u0644\u0627\u062a\u060c \u0646\u0635\u0628\u200c\u0647\u0627\u060c \u0627\u0646\u062a\u0634\u0627\u0631 \u06a9\u0627\u062a\u0627\u0644\u0648\u06af \u0648 \u0627\u062e\u0628\u0627\u0631 \u0634\u0648\u0631\u0648\u0645.",
    faqPriceQ: "\u0642\u06cc\u0645\u062a\u200c\u0647\u0627\u06cc \u06a9\u0627\u062a\u0627\u0644\u0648\u06af \u0686\u0637\u0648\u0631 \u0628\u0647\u200c\u0631\u0648\u0632 \u0645\u06cc\u200c\u0634\u0648\u0646\u062f\u061f",
    faqPriceA: "\u0646\u0627\u0645 \u0645\u062d\u0635\u0648\u0644\u0627\u062a \u0648 \u0642\u06cc\u0645\u062a\u200c\u0647\u0627\u06cc \u0645\u0648\u062c\u0648\u062f \u0627\u0632 \u06af\u0648\u06af\u0644 \u0634\u06cc\u062a \u0645\u062a\u0635\u0644 \u0628\u0648\u0645\u0631\u0646\u06af \u062e\u0648\u0627\u0646\u062f\u0647 \u0645\u06cc\u200c\u0634\u0648\u062f.",
    faqProjectQ: "\u0622\u06cc\u0627 \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u0645 \u0642\u06cc\u0645\u062a \u067e\u0631\u0648\u0698\u0647\u200c\u0627\u06cc \u0628\u06af\u06cc\u0631\u0645\u061f",
    faqProjectA: "\u0628\u0644\u0647. \u0627\u0632 \u0635\u0641\u062d\u0647 \u062a\u0645\u0627\u0633 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u06a9\u0646\u06cc\u062f \u0648 \u0644\u06cc\u0633\u062a \u0645\u062d\u0635\u0648\u0644\u0627\u062a \u06cc\u0627 \u0646\u06cc\u0627\u0632\u0647\u0627\u06cc \u067e\u0631\u0648\u0698\u0647 \u0631\u0627 \u0628\u0641\u0631\u0633\u062a\u06cc\u062f.",
    faqDetailsQ: "\u062c\u0632\u0626\u06cc\u0627\u062a \u0641\u0646\u06cc \u0631\u0627 \u06a9\u062c\u0627 \u0628\u0628\u06cc\u0646\u0645\u061f",
    faqDetailsA: "\u0645\u062f\u0644 \u0648 \u0628\u0631\u0646\u062f \u0647\u0631 \u0645\u062d\u0635\u0648\u0644 \u0631\u0648\u06cc \u06a9\u0627\u0631\u062a \u06a9\u0627\u062a\u0627\u0644\u0648\u06af \u0646\u0645\u0627\u06cc\u0634 \u062f\u0627\u062f\u0647 \u0645\u06cc\u200c\u0634\u0648\u062f. \u0645\u0634\u062e\u0635\u0627\u062a \u0628\u06cc\u0634\u062a\u0631 \u0647\u0645 \u0628\u0639\u062f\u0627\u064b \u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u062f \u0628\u0647 \u0634\u06cc\u062a \u0627\u0636\u0627\u0641\u0647 \u0634\u0648\u062f.",
    footerTagline: "\u0645\u062d\u0635\u0648\u0644\u0627\u062a \u0645\u062f\u0631\u0646 \u062d\u0645\u0627\u0645 \u0628\u0631\u0627\u06cc \u067e\u0631\u0648\u0698\u0647\u200c\u0647\u0627\u06cc \u0645\u0633\u06a9\u0648\u0646\u06cc \u0648 \u062d\u0631\u0641\u0647\u200c\u0627\u06cc.",
    footerCollections: "\u06a9\u0627\u0644\u06a9\u0634\u0646\u200c\u0647\u0627",
    footerCompany: "\u0634\u0631\u06a9\u062a",
    footerRights: "\u00a9 2026 \u0628\u0648\u0645\u0631\u0646\u06af. \u062a\u0645\u0627\u0645 \u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638 \u0627\u0633\u062a.",
    cVanity: "\u06a9\u0627\u0628\u06cc\u0646\u062a \u0631\u0648\u0634\u0648\u06cc\u06cc",
    cFaucets: "\u0634\u06cc\u0631\u0622\u0644\u0627\u062a",
    cMirrors: "\u0622\u06cc\u0646\u0647\u200c\u0647\u0627",
    cWashbasins: "\u0631\u0648\u0634\u0648\u06cc\u06cc\u200c\u0647\u0627",
    cShelves: "\u0634\u0644\u0641\u200c\u0647\u0627",
    cAccessories: "\u0627\u06a9\u0633\u0633\u0648\u0631\u06cc"
  },
  ar: {
    socialIntro: "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0648\u0627\u0644\u062a\u0631\u0643\u064a\u0628\u0627\u062a \u0648\u0625\u0635\u062f\u0627\u0631\u0627\u062a \u0627\u0644\u0643\u062a\u0627\u0644\u0648\u062c \u0648\u0623\u062e\u0628\u0627\u0631 \u0627\u0644\u0635\u0627\u0644\u0629.",
    faqPriceQ: "\u0643\u064a\u0641 \u064a\u062a\u0645 \u062a\u062d\u062f\u064a\u062b \u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0643\u062a\u0627\u0644\u0648\u062c\u061f",
    faqPriceA: "\u062a\u062a\u0645 \u0642\u0631\u0627\u0621\u0629 \u0623\u0633\u0645\u0627\u0621 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0648\u0627\u0644\u0623\u0633\u0639\u0627\u0631 \u0627\u0644\u0645\u062a\u0627\u062d\u0629 \u0645\u0646 \u062c\u062f\u0648\u0644 Google Sheet \u0627\u0644\u0645\u062a\u0635\u0644 \u0628\u0628\u0648\u0645\u0631\u0627\u0646\u063a.",
    faqProjectQ: "\u0647\u0644 \u064a\u0645\u0643\u0646\u0646\u064a \u0637\u0644\u0628 \u062a\u0633\u0639\u064a\u0631 \u0644\u0644\u0645\u0634\u0631\u0648\u0639\u061f",
    faqProjectA: "\u0646\u0639\u0645. \u0627\u0633\u062a\u062e\u062f\u0645 \u0635\u0641\u062d\u0629 \u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0648\u0623\u0631\u0633\u0644 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0623\u0648 \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0634\u0631\u0648\u0639.",
    faqDetailsQ: "\u0623\u064a\u0646 \u064a\u0645\u0643\u0646\u0646\u064a \u0631\u0624\u064a\u0629 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644 \u0627\u0644\u0641\u0646\u064a\u0629\u061f",
    faqDetailsA: "\u062a\u0638\u0647\u0631 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0645\u0648\u062f\u064a\u0644 \u0648\u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0639\u0644\u0649 \u0643\u0644 \u0628\u0637\u0627\u0642\u0629 \u0645\u0646\u062a\u062c. \u064a\u0645\u0643\u0646 \u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0627\u0635\u0641\u0627\u062a \u0623\u0643\u062b\u0631 \u0625\u0644\u0649 \u0627\u0644\u062c\u062f\u0648\u0644 \u0644\u0627\u062d\u0642\u0627\u064b.",
    footerTagline: "\u0645\u0646\u062a\u062c\u0627\u062a \u062d\u0645\u0627\u0645 \u0639\u0635\u0631\u064a\u0629 \u0644\u0644\u0645\u0634\u0627\u0631\u064a\u0639 \u0627\u0644\u0633\u0643\u0646\u064a\u0629 \u0648\u0627\u0644\u0645\u0647\u0646\u064a\u0629.",
    footerCollections: "\u0627\u0644\u0645\u062c\u0645\u0648\u0639\u0627\u062a",
    footerCompany: "\u0627\u0644\u0634\u0631\u0643\u0629",
    footerRights: "\u00a9 2026 \u0628\u0648\u0645\u0631\u0627\u0646\u063a. \u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.",
    cVanity: "\u0648\u062d\u062f\u0627\u062a \u0627\u0644\u0645\u063a\u0633\u0644\u0629",
    cFaucets: "\u0627\u0644\u062e\u0644\u0627\u0637\u0627\u062a",
    cMirrors: "\u0627\u0644\u0645\u0631\u0627\u064a\u0627",
    cWashbasins: "\u0627\u0644\u0645\u063a\u0627\u0633\u0644",
    cShelves: "\u0627\u0644\u0631\u0641\u0648\u0641",
    cAccessories: "\u0627\u0644\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062a"
  },
  ru: {
    socialIntro: "\u041f\u0440\u043e\u0434\u0443\u043a\u0442\u044b, \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0438, \u0432\u044b\u043f\u0443\u0441\u043a\u0438 \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0430 \u0438 \u043d\u043e\u0432\u043e\u0441\u0442\u0438 \u0448\u043e\u0443\u0440\u0443\u043c\u0430.",
    faqPriceQ: "\u041a\u0430\u043a \u043e\u0431\u043d\u043e\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u0446\u0435\u043d\u044b \u0432 \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0435?",
    faqPriceA: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u044f \u0442\u043e\u0432\u0430\u0440\u043e\u0432 \u0438 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0435 \u0446\u0435\u043d\u044b \u0447\u0438\u0442\u0430\u044e\u0442\u0441\u044f \u0438\u0437 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u043d\u043e\u0439 Google Sheet Boomerang.",
    faqProjectQ: "\u041c\u043e\u0436\u043d\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0438\u0442\u044c \u043f\u0440\u043e\u0435\u043a\u0442\u043d\u0443\u044e \u0446\u0435\u043d\u0443?",
    faqProjectA: "\u0414\u0430. \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u043e\u0432 \u0438 \u043f\u0440\u0438\u0448\u043b\u0438\u0442\u0435 \u0441\u043f\u0438\u0441\u043e\u043a \u0442\u043e\u0432\u0430\u0440\u043e\u0432 \u0438\u043b\u0438 \u0442\u0440\u0435\u0431\u043e\u0432\u0430\u043d\u0438\u044f \u043f\u0440\u043e\u0435\u043a\u0442\u0430.",
    faqDetailsQ: "\u0413\u0434\u0435 \u043f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0434\u0435\u0442\u0430\u043b\u0438?",
    faqDetailsA: "\u041c\u043e\u0434\u0435\u043b\u044c \u0438 \u0431\u0440\u0435\u043d\u0434 \u043f\u043e\u043a\u0430\u0437\u0430\u043d\u044b \u043d\u0430 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0435 \u0442\u043e\u0432\u0430\u0440\u0430. \u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0435 \u0445\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438 \u043c\u043e\u0436\u043d\u043e \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0442\u0430\u0431\u043b\u0438\u0446\u0443 \u043f\u043e\u0437\u0436\u0435.",
    footerTagline: "\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u044b\u0435 \u0442\u043e\u0432\u0430\u0440\u044b \u0434\u043b\u044f \u0432\u0430\u043d\u043d\u044b\u0445 \u043a\u043e\u043c\u043d\u0430\u0442, \u0436\u0438\u043b\u044b\u0445 \u0438 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u043f\u0440\u043e\u0435\u043a\u0442\u043e\u0432.",
    footerCollections: "\u041a\u043e\u043b\u043b\u0435\u043a\u0446\u0438\u0438",
    footerCompany: "\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f",
    footerRights: "\u00a9 2026 Boomerang. \u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b.",
    cVanity: "\u0422\u0443\u043c\u0431\u044b",
    cFaucets: "\u0421\u043c\u0435\u0441\u0438\u0442\u0435\u043b\u0438",
    cMirrors: "\u0417\u0435\u0440\u043a\u0430\u043b\u0430",
    cWashbasins: "\u0420\u0430\u043a\u043e\u0432\u0438\u043d\u044b",
    cShelves: "\u041f\u043e\u043b\u043a\u0438",
    cAccessories: "\u0410\u043a\u0441\u0435\u0441\u0441\u0443\u0430\u0440\u044b"
  }
}).forEach(([lang, values]) => Object.assign(copy[lang], values));

const fallbackRows = [
  ["1","Vanity Unit",null,"Spark 80 Wall-Mounted","Romino","Golsar",null,null,null,null,null,"assets/images/products/spark-80-wall-mounted/main-01.webp","assets/images/products/spark-80-wall-mounted/"],
  ["2","Vanity Unit",null,"Asteria 50 Wall-Mounted","Aster 50","Golsar",null,null,null,null,null,"assets/images/products/asteria-50-wall-mounted/main-01.webp","assets/images/products/asteria-50-wall-mounted/"],
  ["3","Vanity Unit",null,"Andre 47 Wall-Mounted","Andre","Sina"],
  ["5","Vanity Unit",null,"Amanda 65 Wall-Mounted","Amanda","Sina"],
  ["9","Vanity Unit",null,"Aspen View 60 Wall-Mounted","Aspen 60","Golsar"],
  ["10","Vanity Unit",null,"Elena 60 Wall-Mounted","Amaris","Corian",null,null,null,null,null,"assets/images/products/elena-60-wall-mounted/main-01.webp","assets/images/products/elena-60-wall-mounted/"],
  ["13","Vanity Unit","main-01.webp","Prima 70 Wall-Mounted","Romino","Golsar",null,null,null,null,null,"assets/images/products/prima-70-wall-mounted/main-01.webp","assets/images/products/prima-70-wall-mounted/"],
  ["14","Vanity Unit","main-01.webp","Pitou 50 Wall-Mounted","Serena 50","Novin",null,null,null,null,null,"assets/images/products/pitou-50-wall-mounted/main-01.webp","assets/images/products/pitou-50-wall-mounted/"],
  ["15","Vanity Unit","main-01.webp","Pitou 60 Wall-Mounted","Aster 60","Golsar",null,null,null,null,null,"assets/images/products/pitou-60-wall-mounted/main-01.webp","assets/images/products/pitou-60-wall-mounted/"],
  ["16","Vanity Unit","main-01.webp","Taren 44 Wall-Mounted","Taren","Corian",null,null,null,null,null,"assets/images/products/taren-44-wall-mounted/main-01.webp","assets/images/products/taren-44-wall-mounted/"],
  ["17","Vanity Unit","main-01.webp","Tornado 100 Wall-Mounted","Eleganza 100","Imported",null,null,null,null,null,"assets/images/products/tornado-100-wall-mounted/main-01.webp","assets/images/products/tornado-100-wall-mounted/"],
  ["18","Vanity Unit",null,"Torino 60 Wall-Mounted","Torino","Golsar"],
  ["19","Vanity Unit",null,"Tosca 75 Wall-Mounted","Romino","Golsar"],
  ["20","Vanity Unit",null,"Tulip Plus 45 Wall-Mounted","Tulip45","Golsar"],
  ["21","Vanity Unit","main-01.webp","Tina 52 Wall-Mounted","Alpha 52","Morvarid",null,null,null,null,null,"assets/images/products/tina-52-wall-mounted/main-01.webp","assets/images/products/tina-52-wall-mounted/"],
  ["23","Vanity Unit","main-01.webp","Selena 60 Wall-Mounted","Amaris","Corian",null,null,null,null,null,"assets/images/products/selena-60-wall-mounted/main-01.webp","assets/images/products/selena-60-wall-mounted/"],
  ["25","Vanity Unit","main-01.webp","Genova 65 Wall-Mounted","Genova","Golsar",null,null,null,null,null,"assets/images/products/genova-65-wall-mounted/main-01.webp","assets/images/products/genova-65-wall-mounted/"],
  ["27","Vanity Unit","main-01.webp","Raya 70 Wall-Mounted","Aster 70","Golsar",null,null,null,null,null,"assets/images/products/raya-70-wall-mounted/main-01.webp","assets/images/products/raya-70-wall-mounted/"],
  ["28","Vanity Unit","main-01.webp","Rojina 50 Wave Wall-Mounted","Aster 50","Golsar",null,null,null,null,null,"assets/images/products/rojina-50-wave-wall-mounted/main-01.webp","assets/images/products/rojina-50-wave-wall-mounted/"],
  ["29","Vanity Unit",null,"Rojina 50 Plus Wall-Mounted","Aster 50","Golsar"],
  ["30","Vanity Unit","main-01.webp","Rojina 50 Wall-Mounted","Aster 50","Golsar",null,null,null,null,null,"assets/images/products/rojina-50-wall-mounted/main-01.webp","assets/images/products/rojina-50-wall-mounted/"],
  ["31","Vanity Unit",null,"Rojina 60 Wave Wall-Mounted","Aster 60","Golsar"],
  ["32","Vanity Unit","main-01.webp","Rojina 70 Wave Wall-Mounted","Aster 70","Golsar",null,null,null,null,null,"assets/images/products/rojina-70-wave-wall-mounted/main-01.webp","assets/images/products/rojina-70-wave-wall-mounted/"],
  ["33","Vanity Unit","main-01.webp","Rado 90 Wall-Mounted Countertop","Rado 60","Boomerang",null,null,null,null,null,"assets/images/products/rado-90-wall-mounted-countertop/main-01.webp","assets/images/products/rado-90-wall-mounted-countertop/"],
  ["34","Vanity Unit","main-01.webp","Rado 80 Wall-Mounted Countertop","Rado 60","Boomerang",null,null,null,null,null,"assets/images/products/rado-80-wall-mounted-countertop/main-01.webp","assets/images/products/rado-80-wall-mounted-countertop/"],
  ["35","Vanity Unit","main-01.webp","Rado 70 Wall-Mounted Countertop","Rado 60","Boomerang",null,null,null,null,null,"assets/images/products/rado-70-wall-mounted-countertop/main-01.webp","assets/images/products/rado-70-wall-mounted-countertop/"],
  ["36","Vanity Unit","main-01.webp","Rado 60 Wall-Mounted Countertop","Rado 60","Boomerang",null,null,null,null,null,"assets/images/products/rado-60-wall-mounted-countertop/main-01.webp","assets/images/products/rado-60-wall-mounted-countertop/"],
  ["38","Vanity Unit","main-01.webp","Joume 67 Wall-Mounted","Alpha 67","Morvarid",null,null,null,null,null,"assets/images/products/joume-67-wall-mounted/main-01.webp","assets/images/products/joume-67-wall-mounted/"],
  ["39","Vanity Unit","main-01.webp","Joume 100 Wall-Mounted","Santa100","Morvarid",null,null,null,null,null,"assets/images/products/joume-100-wall-mounted/main-01.webp","assets/images/products/joume-100-wall-mounted/"],
  ["41","Vanity Unit","main-01.webp","Flora 60 Plus Wall-Mounted","Flora 60","Golsar",null,null,null,null,null,"assets/images/products/flora-60-plus-wall-mounted/main-01.webp","assets/images/products/flora-60-plus-wall-mounted/"],
  ["43","Vanity Unit","main-01.webp","Fonte 90 Wall-Mounted","Fonte 90","Ceramic",null,null,null,null,null,"assets/images/products/fonte-90-wall-mounted/main-01.webp","assets/images/products/fonte-90-wall-mounted/"],
  ["44","Vanity Unit","main-01.webp","Fonsi 80 Wall-Mounted","Fonsi 80","Ceramic",null,null,null,null,null,"assets/images/products/fonsi-80-wall-mounted/main-01.webp","assets/images/products/fonsi-80-wall-mounted/"],
  ["45","Vanity Unit","main-01.webp","Fonsi 90 Wall-Mounted","Fonsi 90","Ceramic",null,null,null,null,null,"assets/images/products/fonsi-90-wall-mounted/main-01.webp","assets/images/products/fonsi-90-wall-mounted/"],
  ["47","Vanity Unit","main-01.webp","Clean 55 Wall-Mounted","Clean","Golsar",null,null,null,null,null,"assets/images/products/clean-55-wall-mounted/main-01.webp","assets/images/products/clean-55-wall-mounted/"],
  ["48","Vanity Unit","main-01.webp","Kelvin 70 Wall-Mounted","Aster 70","Golsar",null,null,null,null,null,"assets/images/products/kelvin-70-wall-mounted/main-01.webp","assets/images/products/kelvin-70-wall-mounted/"],
  ["51","Vanity Unit","main-01.webp","Laris 60 Countertop","Glory","Golsar",null,null,null,null,null,"assets/images/products/laris-60-countertop/main-01.webp","assets/images/products/laris-60-countertop/"],
  ["56","Vanity Unit",null,"Leona 65 View Wall-Mounted","Leona65","Golsar"],
  ["59","Vanity Unit","main-01.webp","Master 100 Wall-Mounted","Master 100","Ceramic",null,null,null,null,null,"assets/images/products/master-100-wall-mounted/main-01.webp","assets/images/products/master-100-wall-mounted/"],
  ["60","Vanity Unit","main-01.webp","Molen 60 Wall-Mounted","Verona 60","Morvarid",null,null,null,null,null,"assets/images/products/molen-60-wall-mounted/main-01.webp","assets/images/products/molen-60-wall-mounted/"],
  ["62","Vanity Unit","main-01.webp","Walnut 70 Wall-Mounted","Leona65","Golsar",null,null,null,null,null,"assets/images/products/walnut-70-wall-mounted/main-01.webp","assets/images/products/walnut-70-wall-mounted/"],
  ["63","Vanity Unit","main-01.webp","Walnut 90 Wall-Mounted","Leona65","Golsar",null,null,null,null,null,"assets/images/products/walnut-90-wall-mounted/main-01.webp","assets/images/products/walnut-90-wall-mounted/"],
  ["65","Vanity Unit",null,"Hiva 60 Wall-Mounted","Arsita60","Novin"],
  ["66","Vanity Unit","main-01.webp","Unique 50 Plus Wall-Mounted","Unique 50","Golsar",null,null,null,null,null,"assets/images/products/unique-50-plus-wall-mounted/main-01.webp","assets/images/products/unique-50-plus-wall-mounted/"],
  ["67","Vanity Unit","main-01.webp","Unique 50 Wall-Mounted","Unique 50","Golsar",null,null,null,null,null,"assets/images/products/unique-50-wall-mounted/main-01.webp","assets/images/products/unique-50-wall-mounted/"],
  ["68","Vanity Unit","main-01.webp","Unique 70 Plus Wall-Mounted","Unique 70","Golsar",null,null,null,null,null,"assets/images/products/unique-70-plus-wall-mounted/main-01.webp","assets/images/products/unique-70-plus-wall-mounted/"],
  ["69","Shelf",null,"Shelf View"],["70","Shelf",null,"201"],["72","Mirror",null,"Mirror Flora 40"],["73","Mirror",null,"Mirror Flora 50"],["74","Mirror",null,"Mirror Flora 60"],["75","Mirror",null,"Mirror Lisano 40"],["76","Mirror",null,"Mirror Lisano 50"],["77","Mirror",null,"Mirror Lisano 60"],["78","Mirror",null,"Mirror Lisano 70"],["79","Mirror",null,"Mirror Lisano 80"],["80","Mirror",null,"Mirror Lisano 90"],["81","Mirror",null,"Mirror Murano 80 Touch"],["82","Mirror",null,"Mirror Murano 90 Touch"],["83","Mirror",null,"Mirror Murano 100 Touch"],["84","Mirror",null,"Mirror Viton 60 Touch"],["85","Mirror",null,"Mirror Viton 65"],["86","Mirror",null,"Mirror Viton 80 Touch"],["87","Mirror",null,"Mirror Victoria 70 Touch"],["88","Mirror",null,"Mirror Fonsi 80 Touch"],["89","Washbasin",null,"Aster 50 - Washbasin"],["90","Washbasin",null,"Aster 60 - Washbasin"],["91","Washbasin",null,"Aster 70 - Washbasin"],["92","Washbasin",null,"Luminous - Washbasin"],["93","Washbasin",null,"Glory - Washbasin"],["96","Washbasin",null,"Elganza 100 - Washbasin"],["97","Washbasin",null,"Unique 70 - Washbasin"]
];

let currentLang = localStorage.getItem("boomerang-language") || "en";
let products = [];

const slug = value => String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const t = key => (copy[currentLang] || copy.en)[key] || copy.en[key] || key;
const categoryMap = { vanity: "Vanity Unit", faucets: "Faucet", mirrors: "Mirror", washbasins: "Washbasin", shelves: "Shelf", accessories: "Accessory" };

function setLanguage(lang) {
  currentLang = copy[lang] ? lang : "en";
  localStorage.setItem("boomerang-language", currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = ["fa", "ar"].includes(currentLang) ? "rtl" : "ltr";
  document.querySelectorAll("[data-copy]").forEach(el => el.textContent = t(el.dataset.copy));
  document.querySelectorAll("[data-lang]").forEach(el => el.classList.toggle("active", el.dataset.lang === currentLang));
  renderProducts();
}

function parseRows(rows) {
  return rows
    .filter(row => row[0] && row[1] && (row[2] || row[3]) && !Number.isNaN(Number(row[0])))
    .map(row => {
      const hasImageColumn = row.length > 10 || String(row[2] || "").toLowerCase().endsWith(".webp") || (!row[2] && row[3]);
      const offset = hasImageColumn ? 1 : 0;
      return {
        id: row[0],
        category: row[1],
        image: hasImageColumn ? (row[11] || "") : "",
        name: row[2 + offset],
        model: row[3 + offset] || "",
        brand: row[4 + offset] || "",
        prices: [row[5 + offset], row[6 + offset], row[7 + offset], row[8 + offset], row[9 + offset]]
          .filter(Boolean)
          .map(value => Number(String(value).replace(/[^\d.]/g, "")))
          .filter(Number.isFinite),
        gallery: hasImageColumn ? (row[12] || "") : ""
      };
    });
}

async function loadProducts() {
  products = parseRows(fallbackRows);
  renderProducts();
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}&range=A1:M1000`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Sheet unavailable");
    const text = await response.text();
    const json = JSON.parse(text.slice(text.indexOf("(") + 1, text.lastIndexOf(")")));
    const rows = json.table.rows.map(r => r.c.map(c => c ? c.v : ""));
    const live = parseRows(rows);
    if (live.length) products = live;
  } catch (error) {
    document.querySelector("[data-sheet-status]")?.classList.remove("hidden");
  }
  renderProducts();
}

function renderProducts() {
  const grid = document.querySelector("[data-product-grid]");
  if (!grid) return;
  const wanted = categoryMap[document.body.dataset.category];
  const search = (document.querySelector("[data-search]")?.value || "").toLowerCase();
  const brand = document.querySelector("[data-brand]")?.value || "";
  const sort = document.querySelector("[data-sort]")?.value || "featured";
  let list = products.filter(product => product.category.toLowerCase() === wanted.toLowerCase());
  if (search) list = list.filter(product => `${product.name} ${product.model} ${product.brand}`.toLowerCase().includes(search));
  if (brand) list = list.filter(product => product.brand === brand);
  if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "za") list.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === "low") list.sort((a, b) => (a.prices[0] || Infinity) - (b.prices[0] || Infinity));
  if (sort === "high") list.sort((a, b) => (b.prices[0] || 0) - (a.prices[0] || 0));

  const brands = [...new Set(products.filter(product => product.category === wanted).map(product => product.brand).filter(Boolean))].sort();
  const brandSelect = document.querySelector("[data-brand]");
  if (brandSelect && brandSelect.options.length <= 1) brands.forEach(value => brandSelect.add(new Option(value, value)));
  document.querySelector("[data-result-count]")?.replaceChildren(document.createTextNode(`${list.length} ${t("products")}`));

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state glass"><h3>${t("noProducts")}</h3><p>${t("contactUs")}</p><a class="btn btn-red" href="contact.html">${t("contactUs")}</a></div>`;
    return;
  }

  grid.innerHTML = list.map(item => {
    const price = item.prices.length ? new Intl.NumberFormat(currentLang).format(item.prices[0]) : t("priceOnRequest");
    const source = item.image || `assets/images/products/${slug(item.name)}/main-01.webp`;
    const media = `<img src="${source}" alt="${item.name}" onerror="this.parentElement.classList.add('missing-image');this.remove()"><span class="image-placeholder">${t("imageComing")}</span>`;
    return `<article class="product-card"><div class="product-image">${media}<span class="product-category">${item.category}</span></div><div class="product-info"><h3>${item.name}</h3><p class="product-meta">${[item.model, item.brand].filter(Boolean).join(" / ") || "Boomerang"}</p><div class="price">${price}</div></div></article>`;
  }).join("");
}

function initSlider() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  if (!slides.length) return;
  const dots = document.querySelector(".slider-dots");
  let active = 0;
  slides.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.ariaLabel = `Slide ${index + 1}`;
    button.addEventListener("click", () => show(index));
    dots.appendChild(button);
  });
  const buttons = [...dots.children];
  function show(index) {
    slides[active].classList.remove("active");
    buttons[active].classList.remove("active");
    active = index;
    slides[active].classList.add("active");
    buttons[active].classList.add("active");
  }
  show(0);
  setInterval(() => show((active + 1) % slides.length), 6000);
}

document.querySelector(".menu-toggle")?.addEventListener("click", () => document.querySelector(".site-header")?.classList.toggle("open"));
document.querySelectorAll("img:not(.brand img):not(.footer-logo)").forEach(image => image.addEventListener("error", () => image.style.opacity = "0"));
document.querySelectorAll("[data-lang]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
document.querySelectorAll("[data-search],[data-brand],[data-sort]").forEach(control => control.addEventListener("input", renderProducts));
const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle("visible", entry.isIntersecting)), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
initSlider();
setLanguage(currentLang);
loadProducts();
