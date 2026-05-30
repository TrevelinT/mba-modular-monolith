export const PRODUCT_ID = "nintendo-switch-2";

export interface ProductPhoto {
	src: string;
	alt: string;
	label: string;
}

export interface ProductReviews {
	rating: number;
	count: number;
}

export interface ProductPage {
	id: string;
	title: string;
	description: string;
	photos: ProductPhoto[];
	reviews: ProductReviews;
	badge?: string;
}

const PRODUCT_PHOTOS: ProductPhoto[] = [
	{
		src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLWQW3LVR2W4XYm0K6HTaxmu1dnm4cd3_liiYmDqL9zZd0jljCvPBOhnumANzfU8CstCB5HGsbDp6xZVB4jNkrZik0YbW6vGyF-t9Ihjp4VyOR2oxRnCnt8v1xTCOcuEyFh67OSoX6kywO1JZF7g9VMMameoogNnYa0DtFjNW8hrs-RQoZC_tduXMyQm6BrpCTZNhQxpzI37njNU-0strNuB6l6XleSY_OqGDb2Tga6rnDE8TyIpwjVRzS7w3ajxwf6W7EdamngSXj",
		alt: "Nintendo Switch 2 Main View",
		label: "front view",
	},
	{
		src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhfvjfEOTHuFAdujRbdODmqQih42WO9YSPQiCJes2xa7Omi5ZoCU6VK1dO6cpgHHvoUjSed4y4Kyk5eZK_snAOgX-24_AxXGZ98_XJpi6jCy_iRt-Bga5VgWHlTZjSKBVguxkKfeIAPcwEOy4ttXFZHpqvBkXWDXDuzhExJ_dz9sIN7VsOyRCM1whrkfTGaZ4acXJ_W2GuDxyG0IWjwy6DMAiEEnHKnIEIDGjqBkzX9YLwz28WJK7GsdhoUMkuixekqkkU34_5vgiB",
		alt: "Nintendo Switch 2 Side View",
		label: "side view",
	},
	{
		src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-T8T94FjMoVeLmN_MnAPZGj49O_WdtNktpjUBNff1HwRL8VvEqD9CEtV463Gkk9zYVOjdqrWlNwa4ClvhNgWysjrpXPHJlm2Vm6No3jDWQHcXdHzO05UOW4IfapNrv5QQyninbsiYhrN-Cl9SPFsA8EZ6La1UJxYuVK2_55J0mPdDvOOt5F_nUiyUt2l22NqfoIVfqCPSNCbyQ9CrWIeyromskWj8PbyOcjzNHFVA9BWchCssiU_ggZDbQyuj9lim8c5JvqRxGQOH",
		alt: "Nintendo Switch 2 Docked View",
		label: "docked view",
	},
	{
		src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqjZlQN8DQznDAHfLuxpHuSmxVD_5rjhib76fYD5CW_lQlqZhtA8yI1ILitR19IrxjlZxNHvjEUS2zY0YhRoI3bu1DE_fFsvGUTLAVQo_NnQUOTkbWgIL2gOIyITasUHczU8pwcpC_jdNjS3SGeFFx7Qq1wyVqODy_bJZRkeBkjtclyirBaz9NqksYThsqF9CBynwpNCRfmGll4mCxuLtl6nrherGCgMUCQB8JeWo72Qjq8EUeQUVRHgUXF5PHiXA01n81Vxl4fPqw",
		alt: "Nintendo Switch 2 Accessories View",
		label: "accessories view",
	},
];

export function getProductPage(): ProductPage {
	return {
		id: PRODUCT_ID,
		title: 'Nintendo Switch 2 - 8" OLED Edition',
		description:
			"Experience the next generation of handheld gaming. The Nintendo Switch 2 features a stunning 8-inch OLED display, enhanced processing power for 4K TV output, and backward compatibility with your favorite Switch titles.",
		photos: PRODUCT_PHOTOS,
		reviews: { rating: 4.5, count: 2451 },
		badge: "Pre-order",
	};
}
