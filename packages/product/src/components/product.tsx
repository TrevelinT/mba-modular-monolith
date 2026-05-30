import { ImageCarousel } from "./image-carousel";

function Product() {
	return (
		<article className="contents">
			<div className="lg:col-span-5 flex flex-col gap-md">
				<ImageCarousel />
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
					for 4K TV output, and backward compatibility with your favorite Switch
					titles.
				</p>
			</div>
		</article>
	);
}

export { Product };
