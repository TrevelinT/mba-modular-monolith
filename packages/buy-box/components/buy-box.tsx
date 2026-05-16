interface BuyBoxProps {}

function BuyBox({}: BuyBoxProps) {
  return (
    <div className="lg:col-span-3 flex flex-col gap-lg">
      <div className="bg-surface-container-low p-lg border border-outline-variant rounded-xl flex flex-col gap-lg">
        <div className="flex flex-col gap-xs">
          <div className="flex items-baseline gap-sm">
            <span className="font-price-lg text-price-lg text-on-surface">
              $499.99
            </span>
            <span className="text-body-md text-secondary line-through">
              $549.99
            </span>
          </div>
          <p className="text-label-md text-secondary">
            Tax included. Shipping calculated at checkout.
          </p>
          <p className="text-body-sm text-secondary font-medium mt-1">
            ou 12x de $41.66 sem juros
          </p>
        </div>
        <div className="flex flex-col gap-sm">
          <h3 className="font-label-md text-on-surface uppercase tracking-wider">
            Quantity
          </h3>
          <div className="flex items-center w-full max-w-[140px] border border-outline-variant rounded">
            <button className="p-2 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <span className="flex-1 text-center font-bold">1</span>
            <button className="p-2 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-md pt-base">
          <button className="w-full bg-primary-container hover:bg-primary py-lg rounded text-on-primary font-headline-md transition-all active:opacity-80">
            Pre-order Now
          </button>
        </div>
        <div className="flex items-center gap-sm text-body-sm font-medium text-on-surface pt-sm">
          <span className="material-symbols-outlined text-surface-tint">
            check_circle
          </span>
          Free Shipping &amp; Express Delivery
        </div>
      </div>
      <div className="grid grid-cols-3 gap-sm">
        <div className="flex flex-col items-center text-center gap-xs">
          <span className="material-symbols-outlined text-secondary text-[24px]">
            local_shipping
          </span>
          <span className="text-[9px] font-bold uppercase text-secondary">
            Fast Delivery
          </span>
        </div>
        <div className="flex flex-col items-center text-center gap-xs">
          <span className="material-symbols-outlined text-secondary text-[24px]">
            verified_user
          </span>
          <span className="text-[9px] font-bold uppercase text-secondary">
            2-Year Warranty
          </span>
        </div>
        <div className="flex flex-col items-center text-center gap-xs">
          <span className="material-symbols-outlined text-secondary text-[24px]">
            sync
          </span>
          <span className="text-[9px] font-bold uppercase text-secondary">
            Easy Returns
          </span>
        </div>
      </div>
    </div>
  );
}

export { BuyBox };
