function Breadcrumb() {
  return (
    <nav className="flex items-center gap-xs text-body-sm text-secondary mb-lg">
      <span>Home</span>
      <span className="material-symbols-outlined text-[16px]">
        chevron_right
      </span>
      <span>Consoles</span>
      <span className="material-symbols-outlined text-[16px]">
        chevron_right
      </span>
      <span className="text-on-surface">Nintendo Switch 2</span>
    </nav>
  );
}

export { Breadcrumb };
