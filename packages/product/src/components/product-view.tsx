import type { ProductPhoto, ProductReviews } from "../api/product";
import { ImageCarousel } from "./image-carousel";

export interface ProductViewProps {
	title: string;
	badge?: string;
	description: string;
	reviews: ProductReviews;
	photos: ProductPhoto[];
}

type StarSlot = { id: string; kind: "full" | "half" | "empty" };

function buildStarSlots(rating: number): StarSlot[] {
	const fullStars = Math.floor(rating);
	const hasHalf = rating % 1 >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
	const slots: StarSlot[] = [];

	for (let position = 1; position <= fullStars; position += 1) {
		slots.push({ id: `star-full-${position}`, kind: "full" });
	}
	if (hasHalf) {
		slots.push({ id: "star-half", kind: "half" });
	}
	for (let position = 1; position <= emptyStars; position += 1) {
		slots.push({ id: `star-empty-${position}`, kind: "empty" });
	}

	return slots;
}

function StarIcon({ filled }: { filled: boolean }) {
	return (
		<svg
			aria-hidden="true"
			className="size-6"
			fill={filled ? "currentColor" : "none"}
			stroke="currentColor"
			strokeWidth={filled ? 0 : 1.5}
			viewBox="0 0 24 24"
		>
			<path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
		</svg>
	);
}

function StarHalfIcon() {
	return (
		<svg aria-hidden="true" className="size-6" viewBox="0 0 24 24">
			<defs>
				<clipPath id="star-half-clip">
					<rect height="24" width="12" x="0" y="0" />
				</clipPath>
			</defs>
			<path
				d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
			/>
			<path
				clipPath="url(#star-half-clip)"
				d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
				fill="currentColor"
			/>
		</svg>
	);
}

function StarRating({ rating }: { rating: number }) {
	const starSlots = buildStarSlots(rating);

	return (
		<div
			aria-label={`${rating} out of 5 stars`}
			className="flex text-surface-tint"
			role="img"
		>
			{starSlots.map(function renderStar(slot) {
				if (slot.kind === "half") {
					return <StarHalfIcon key={slot.id} />;
				}

				return <StarIcon filled={slot.kind === "full"} key={slot.id} />;
			})}
		</div>
	);
}

function ProductView({
	title,
	badge,
	description,
	reviews,
	photos,
}: ProductViewProps) {
	return (
		<article className="contents">
			<div className="lg:col-span-5 flex flex-col gap-md">
				<ImageCarousel photos={photos} />
			</div>
			<div className="lg:col-span-4 flex flex-col gap-lg">
				<header>
					{badge ? (
						<p className="w-fit bg-primary text-on-primary text-label-md px-2 py-0.5 rounded font-bold uppercase mb-base">
							{badge}
						</p>
					) : null}
					<h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">
						{title}
					</h1>
					<div className="flex items-center gap-sm justify-between">
						<StarRating rating={reviews.rating} />
						<span className="text-body-sm text-secondary">
							({reviews.count.toLocaleString()} reviews)
						</span>
					</div>
				</header>
				<p className="text-body-md text-secondary leading-relaxed">
					{description}
				</p>
			</div>
		</article>
	);
}

export { ProductView };
