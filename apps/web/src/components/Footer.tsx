function Footer() {
  return (
    <footer className="w-full py-xl px-margin-mobile md:px-gutter flex flex-col md:flex-row justify-between items-center gap-md bg-secondary-container dark:bg-on-secondary-fixed-variant">
      <div className="flex flex-col items-center md:items-start gap-sm">
        <p className="font-headline-md text-headline-md font-bold text-on-secondary-container dark:text-on-secondary-fixed m-0">
          Game Store
        </p>
        <small className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim m-0">
          © 2024 Game Store Inc. All rights reserved.
        </small>
      </div>
      <nav aria-label="Footer">
        <ul className="flex flex-wrap justify-center gap-md list-none m-0 p-0">
          <li>
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
              href="#"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
              href="#"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
              href="#"
            >
              Shipping Info
            </a>
          </li>
          <li>
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
              href="#"
            >
              Returns
            </a>
          </li>
          <li>
            <a
              className="font-body-sm text-body-sm text-secondary dark:text-secondary-fixed-dim hover:underline transition-all"
              href="#"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
      <ul className="flex gap-md">
        <li>
        <button
          aria-label="Select language"
          className="text-on-secondary-container"
          type="button"
        >
          <span
            aria-hidden="true"
            className="material-symbols-outlined"
          >
            language
          </span>
        </button>
        </li>
        <li>
        <button
          aria-label="Help"
          className="text-on-secondary-container"
          type="button"
        >
          <span
            aria-hidden="true"
            className="material-symbols-outlined"
          >
            help_outline
          </span>
        </button>
        </li>
      </ul>
    </footer>
  );
}

export { Footer };
