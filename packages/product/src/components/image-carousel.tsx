import { useEffect, useState } from "react";

const HOVER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";

const PRODUCT_IMAGES = [
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
] as const;

function useCanHover() {
	const [canHover, setCanHover] = useState(false);

	useEffect(function syncCanHoverWithMediaQuery() {
		const mediaQuery = window.matchMedia(HOVER_MEDIA_QUERY);
		setCanHover(mediaQuery.matches);

		function handleChange(event: MediaQueryListEvent) {
			setCanHover(event.matches);
		}

		mediaQuery.addEventListener("change", handleChange);
		return function removeCanHoverMediaQueryListener() {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return canHover;
}

function ImageCarousel() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const canHover = useCanHover();
	const selectedImage = PRODUCT_IMAGES[selectedIndex];

	function handleThumbnailClick(index: number) {
		setSelectedIndex(index);
	}

	function handleThumbnailMouseEnter(index: number) {
		if (canHover) {
			setSelectedIndex(index);
		}
	}

	return (
		<>
			<div className="aspect-[4/3] w-full bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden group">
				<img
					alt={selectedImage.alt}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					src={selectedImage.src}
				/>
			</div>
			<div className="grid grid-cols-4 gap-sm">
				{PRODUCT_IMAGES.map(function renderThumbnail(image, index) {
					const isSelected = index === selectedIndex;

					return (
						<button
							aria-current={isSelected ? "true" : undefined}
							aria-label={`Nintendo Switch 2 - ${image.label}`}
							className={
								isSelected
									? "aspect-square bg-surface-container-low border-2 border-primary rounded-lg overflow-hidden cursor-pointer p-0"
									: "aspect-square bg-surface-container-low border border-outline-variant rounded-lg overflow-hidden cursor-pointer hover:border-primary transition-colors p-0"
							}
							key={image.label}
							onClick={function handleClick() {
								handleThumbnailClick(index);
							}}
							onMouseEnter={function handleMouseEnter() {
								handleThumbnailMouseEnter(index);
							}}
							type="button"
						>
							<img
								alt=""
								className="w-full h-full object-cover"
								src={image.src}
							/>
						</button>
					);
				})}
			</div>
		</>
	);
}

export { ImageCarousel, PRODUCT_IMAGES };
