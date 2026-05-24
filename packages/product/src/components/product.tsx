// interface ProductProps {
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// }

function Product() {
  return (
    <article className="contents">
      <div className="lg:col-span-5 flex flex-col gap-md">
        <div className="aspect-[4/3] w-full bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden group">
          <img
            alt="Nintendo Switch 2 Main View"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQbHyeGMFNKPhxM_LwW1marbXI_827qzjF8NVgxO2k-WNFigFZg0sAT2r3nF3MW5i6KwztMUE-L146VtDjA3g5XwMW2cOA_00tLXl7Rr1RaW-_ayt96MtDz0-OZa4Vn0VppAUA69IRFkjhi-g-QRf9URKQZJ7k0Fia17FndBAhl0MRbTryaEksh1gBZQBe2FZMplv9Qin-C9KgBXFTkh7_hOQlYOGZdYQlnxQQKZjk8fKNkUsL0KPffiHQDt7iGuNYN55fPDAeKDgr"
          />
        </div>
        <div className="grid grid-cols-4 gap-sm">
          <button
            aria-label="Nintendo Switch 2 - front view"
            className="aspect-square bg-surface-container-low border-2 border-primary rounded-lg overflow-hidden cursor-pointer p-0"
            type="button"
          >
            <img
              alt=""
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLWQW3LVR2W4XYm0K6HTaxmu1dnm4cd3_liiYmDqL9zZd0jljCvPBOhnumANzfU8CstCB5HGsbDp6xZVB4jNkrZik0YbW6vGyF-t9Ihjp4VyOR2oxRnCnt8v1xTCOcuEyFh67OSoX6kywO1JZF7g9VMMameoogNnYa0DtFjNW8hrs-RQoZC_tduXMyQm6BrpCTZNhQxpzI37njNU-0strNuB6l6XleSY_OqGDb2Tga6rnDE8TyIpwjVRzS7w3ajxwf6W7EdamngSXj"
            />
          </button>
          <button
            aria-label="Nintendo Switch 2 - side view"
            className="aspect-square bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors p-0"
            type="button"
          >
            <img
              alt=""
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhfvjfEOTHuFAdujRbdODmqQih42WO9YSPQiCJes2xa7Omi5ZoCU6VK1dO6cpgHHvoUjSed4y4Kyk5eZK_snAOgX-24_AxXGZ98_XJpi6jCy_iRt-Bga5VgWHlTZjSKBVguxkKfeIAPcwEOy4ttXFZHpqvBkXWDXDuzhExJ_dz9sIN7VsOyRCM1whrkfTGaZ4acXJ_W2GuDxyG0IWjwy6DMAiEEnHKnIEIDGjqBkzX9YLwz28WJK7GsdhoUMkuixekqkkU34_5vgiB"
            />
          </button>
          <button
            aria-label="Nintendo Switch 2 - docked view"
            className="aspect-square bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors p-0"
            type="button"
          >
            <img
              alt=""
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-T8T94FjMoVeLmN_MnAPZGj49O_WdtNktpjUBNff1HwRL8VvEqD9CEtV463Gkk9zYVOjdqrWlNwa4ClvhNgWysjrpXPHJlm2Vm6No3jDWQHcXdHzO05UOW4IfapNrv5QQyninbsiYhrN-Cl9SPFsA8EZ6La1UJxYuVK2_55J0mPdDvOOt5F_nUiyUt2l22NqfoIVfqCPSNCbyQ9CrWIeyromskWj8PbyOcjzNHFVA9BWchCssiU_ggZDbQyuj9lim8c5JvqRxGQOH"
            />
          </button>
          <button
            aria-label="Nintendo Switch 2 - accessories view"
            className="aspect-square bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors p-0"
            type="button"
          >
            <img
              alt=""
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqjZlQN8DQznDAHfLuxpHuSmxVD_5rjhib76fYD5CW_lQlqZhtA8yI1ILitR19IrxjlZxNHvjEUS2zY0YhRoI3bu1DE_fFsvGUTLAVQo_NnQUOTkbWgIL2gOIyITasUHczU8pwcpC_jdNjS3SGeFFx7Qq1wyVqODy_bJZRkeBkjtclyirBaz9NqksYThsqF9CBynwpNCRfmGll4mCxuLtl6nrherGCgMUCQB8JeWo72Qjq8EUeQUVRHgUXF5PHiXA01n81Vxl4fPqw"
            />
          </button>
        </div>
      </div>
      <div className="lg:col-span-4 flex flex-col gap-lg">
        <header>
          <div className="flex items-center gap-sm mb-base justify-between">
            <p className="bg-primary text-on-primary text-label-md px-2 py-0.5 rounded font-bold uppercase">
              Pre-order
            </p>
            <p className="text-on-tertiary-fixed-variant font-label-md">
              Release: Winter 2024
            </p>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">
            Nintendo Switch 2 - 8" OLED Edition
          </h1>
          <div className="flex items-center gap-sm justify-between">
            <div
              aria-label="4.5 out of 5 stars"
              className="flex text-surface-tint"
              role="img"
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                aria-hidden="true"
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                aria-hidden="true"
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                aria-hidden="true"
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span
                aria-hidden="true"
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star_half
              </span>
            </div>
            <span className="text-body-sm text-secondary">(2,451 reviews)</span>
          </div>
        </header>
        <p className="text-body-md text-secondary leading-relaxed">
          Experience the next generation of handheld gaming. The Nintendo Switch
          2 features a stunning 8-inch OLED display, enhanced processing power
          for 4K TV output, and backward compatibility with your favorite
          Switch titles.
        </p>
      </div>
    </article>
  );
}

export { Product };
