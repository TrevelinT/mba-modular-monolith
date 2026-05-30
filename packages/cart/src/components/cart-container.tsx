import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getCartItems, getCartSummary, subscribeToCartStore } from "../api";
import { CartView } from "./cart-view";

const HOVER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";

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

function CartContainer() {
	const [isOpen, setIsOpen] = useState(false);
	const canHover = useCanHover();
	const containerRef = useRef<HTMLDivElement>(null);
	const items = useSyncExternalStore(
		subscribeToCartStore,
		getCartItems,
		getCartItems,
	);
	const { itemCount, subtotal } = getCartSummary(items);
	const isEmpty = itemCount === 0;

	const cartAriaLabel = isEmpty
		? "Shopping cart, empty"
		: `Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`;

	useEffect(
		function closeCartOnOutsideClick() {
			if (!isOpen || canHover) {
				return;
			}

			function handleClickOutside(event: MouseEvent) {
				if (!containerRef.current?.contains(event.target as Node)) {
					setIsOpen(false);
				}
			}

			document.addEventListener("click", handleClickOutside);
			return function removeOutsideClickListener() {
				document.removeEventListener("click", handleClickOutside);
			};
		},
		[isOpen, canHover],
	);

	function handleMouseEnter() {
		if (canHover) {
			setIsOpen(true);
		}
	}

	function handleMouseLeave() {
		if (canHover) {
			setIsOpen(false);
		}
	}

	function handleButtonClick() {
		if (!canHover) {
			setIsOpen(toggleOpen);
		}
	}

	function toggleOpen(open: boolean) {
		return !open;
	}

	return (
		<CartView
			cartAriaLabel={cartAriaLabel}
			containerRef={containerRef}
			isEmpty={isEmpty}
			isOpen={isOpen}
			itemCount={itemCount}
			items={items}
			onButtonClick={handleButtonClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			subtotal={subtotal}
		/>
	);
}

export { CartContainer };
