import "./Breadcrumb.css";

const breadcrumbItemClass = "breadcrumb-item inline-flex items-center";
const breadcrumbLinkClass = "text-inherit no-underline hover:underline";

function Breadcrumb() {
  return (
    <nav className="mb-lg" aria-label="Breadcrumb">
      <ul className="flex flex-wrap items-center gap-xs list-none m-0 p-0 text-body-sm text-secondary">
        <li className={breadcrumbItemClass}>
          <a className={breadcrumbLinkClass} href="#">
            Home
          </a>
        </li>
        <li className={breadcrumbItemClass}>
          <a className={breadcrumbLinkClass} href="#">
            Consoles
          </a>
        </li>
        <li
          className={`${breadcrumbItemClass} text-on-surface`}
          aria-current="page"
        >
          Nintendo Switch 2
        </li>
      </ul>
    </nav>
  );
}

export { Breadcrumb };
