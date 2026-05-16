function Footer() {
  return (
    <footer className="w-full py-xl px-margin-mobile md:px-gutter flex flex-col md:flex-row justify-between items-center gap-md bg-secondary-container dark:bg-on-secondary-fixed-variant">
      <div className="flex flex-col items-center md:items-start gap-sm">
        <div className="font-headline-md text-headline-md font-bold text-on-secondary-container dark:text-on-secondary-fixed">
          Game Store
        </div>
        <p className="font-Inter text-body-sm text-secondary dark:text-secondary-fixed-dim">
          © 2024 Game Store Inc. All rights reserved.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-md">
        <a
          className="font-Inter text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
          href="#"
        >
          Privacy Policy
        </a>
        <a
          className="font-Inter text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="font-Inter text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
          href="#"
        >
          Shipping Info
        </a>
        <a
          className="font-Inter text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
          href="#"
        >
          Returns
        </a>
        <a
          className="font-Inter text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
          href="#"
        >
          Contact Us
        </a>
      </div>
      <div className="flex gap-md">
        <button className="material-symbols-outlined text-on-secondary-container">
          language
        </button>
        <button className="material-symbols-outlined text-on-secondary-container">
          help_outline
        </button>
      </div>
    </footer>
  );
}

export { Footer };
