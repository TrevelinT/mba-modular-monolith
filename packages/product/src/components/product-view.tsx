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
					return (
						<span
							aria-hidden="true"
							className="material-symbols-outlined"
							key={slot.id}
							style={{ fontVariationSettings: "'FILL' 1" }}
						>
							star_half
						</span>
					);
				}

				const isFull = slot.kind === "full";
				return (
					<span
						aria-hidden="true"
						className="material-symbols-outlined"
						key={slot.id}
						style={isFull ? { fontVariationSettings: "'FILL' 1" } : undefined}
					>
						star
					</span>
				);
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
