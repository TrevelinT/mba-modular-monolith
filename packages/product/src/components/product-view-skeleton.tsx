function ProductViewSkeleton() {
	return (
		<article
			aria-busy="true"
			aria-label="Loading product details"
			className="contents animate-pulse"
			role="status"
		>
			<div className="lg:col-span-5 flex flex-col gap-md">
				<div className="aspect-[4/3] w-full rounded-lg bg-surface-container-low border border-outline-variant" />
				<div className="grid grid-cols-4 gap-sm">
					{[1, 2, 3, 4].map(function renderThumbnailPlaceholder(key) {
						return (
							<div
								className="aspect-square rounded-lg bg-surface-container-low border border-outline-variant"
								key={key}
							/>
						);
					})}
				</div>
			</div>
			<div className="lg:col-span-4 flex flex-col gap-lg">
				<header className="flex flex-col gap-sm">
					<div className="h-5 w-24 rounded bg-outline-variant" />
					<div className="h-8 w-full max-w-md rounded bg-outline-variant" />
					<div className="h-8 w-3/4 max-w-sm rounded bg-outline-variant" />
					<div className="flex items-center justify-between gap-sm">
						<div className="h-5 w-28 rounded bg-outline-variant" />
						<div className="h-4 w-20 rounded bg-outline-variant" />
					</div>
				</header>
				<div className="flex flex-col gap-sm">
					<div className="h-4 w-full rounded bg-outline-variant" />
					<div className="h-4 w-full rounded bg-outline-variant" />
					<div className="h-4 w-4/5 rounded bg-outline-variant" />
				</div>
			</div>
		</article>
	);
}

export { ProductViewSkeleton };
