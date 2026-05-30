import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ImageCarousel, PRODUCT_IMAGES } from "./image-carousel";

function mockMatchMedia(canHover: boolean) {
	let matches = canHover;
	const listeners = new Set<(event: MediaQueryListEvent) => void>();

	window.matchMedia = vi.fn().mockImplementation(function mockMediaQuery(
		query: string,
	) {
		return {
			get matches() {
				return matches;
			},
			media: query,
			addEventListener(
				_type: string,
				handler: (event: MediaQueryListEvent) => void,
			) {
				listeners.add(handler);
			},
			removeEventListener(
				_type: string,
				handler: (event: MediaQueryListEvent) => void,
			) {
				listeners.delete(handler);
			},
		};
	});

	return {
		changeDeviceSize(nextCanHover: boolean) {
			matches = nextCanHover;
			const event = { matches: nextCanHover } as MediaQueryListEvent;

			for (const listener of listeners) {
				listener(event);
			}
		},
	};
}

describe("ImageCarousel", () => {
	afterEach(function cleanupDom() {
		cleanup();
	});

	it("shows the first slide by default with the first thumbnail selected", () => {
		mockMatchMedia(false);
		render(<ImageCarousel />);

		const mainImage = screen.getByRole("img", {
			name: PRODUCT_IMAGES[0].alt,
		});
		expect(mainImage).toHaveAttribute("src", PRODUCT_IMAGES[0].src);

		const frontThumbnail = screen.getByRole("button", {
			name: /front view/i,
		});
		expect(frontThumbnail).toHaveClass("border-primary", "border-2");
		expect(frontThumbnail).toHaveAttribute("aria-current", "true");
	});

	it("updates the main image and selection when a thumbnail is clicked", () => {
		mockMatchMedia(false);
		render(<ImageCarousel />);

		const sideThumbnail = screen.getByRole("button", { name: /side view/i });
		fireEvent.click(sideThumbnail);

		const mainImage = screen.getByRole("img", {
			name: PRODUCT_IMAGES[1].alt,
		});
		expect(mainImage).toHaveAttribute("src", PRODUCT_IMAGES[1].src);
		expect(sideThumbnail).toHaveClass("border-primary", "border-2");
		expect(sideThumbnail).toHaveAttribute("aria-current", "true");

		const frontThumbnail = screen.getByRole("button", {
			name: /front view/i,
		});
		expect(frontThumbnail).not.toHaveAttribute("aria-current");
	});

	it("updates the main image on thumbnail hover in desktop mode", () => {
		mockMatchMedia(true);
		render(<ImageCarousel />);

		const dockedThumbnail = screen.getByRole("button", {
			name: /docked view/i,
		});
		fireEvent.mouseEnter(dockedThumbnail);

		const mainImage = screen.getByRole("img", {
			name: PRODUCT_IMAGES[2].alt,
		});
		expect(mainImage).toHaveAttribute("src", PRODUCT_IMAGES[2].src);
		expect(dockedThumbnail).toHaveAttribute("aria-current", "true");
	});

	it("does not update the main image on hover in mobile mode", () => {
		mockMatchMedia(false);
		render(<ImageCarousel />);

		const sideThumbnail = screen.getByRole("button", { name: /side view/i });
		fireEvent.mouseEnter(sideThumbnail);

		const mainImage = screen.getByRole("img", {
			name: PRODUCT_IMAGES[0].alt,
		});
		expect(mainImage).toHaveAttribute("src", PRODUCT_IMAGES[0].src);

		fireEvent.click(sideThumbnail);
		expect(mainImage).toHaveAttribute("src", PRODUCT_IMAGES[1].src);
	});
});
