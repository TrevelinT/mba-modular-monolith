import { useEffect, useState } from "react";
import type { ProductPhoto } from "../api/product";

const HOVER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";

export interface ImageCarouselProps {
	photos: ProductPhoto[];
}

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

function ImageCarousel({ photos }: ImageCarouselProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const canHover = useCanHover();
	const selectedImage = photos[selectedIndex];

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
				{photos.map(function renderThumbnail(image, index) {
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

export { ImageCarousel };
