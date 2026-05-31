function BuyBoxViewSkeleton() {
	return (
		<article
			aria-busy="true"
			aria-label="Loading buy box offer"
			className="lg:col-span-3 flex flex-col gap-lg animate-pulse"
			role="status"
		>
			<div className="bg-surface-container-low p-lg border border-outline-variant rounded-xl flex flex-col gap-lg">
				<div className="flex flex-col gap-xs">
					<div className="h-4 w-24 rounded bg-outline-variant" />
					<div className="h-8 w-40 rounded bg-outline-variant" />
					<div className="h-4 w-48 rounded bg-outline-variant mt-1" />
				</div>
				<div className="flex flex-col gap-sm">
					<div className="h-4 w-20 rounded bg-outline-variant" />
					<div className="h-10 w-full max-w-[140px] rounded border border-outline-variant bg-surface-container-low" />
				</div>
				<div className="h-14 w-full rounded bg-outline-variant" />
				<div className="h-4 w-56 rounded bg-outline-variant" />
			</div>
			<div className="grid grid-cols-3 gap-sm">
				{[1, 2, 3].map(function renderTrustBadgePlaceholder(key) {
					return (
						<div className="flex flex-col items-center gap-xs" key={key}>
							<div className="h-6 w-6 rounded bg-outline-variant" />
							<div className="h-3 w-16 rounded bg-outline-variant" />
						</div>
					);
				})}
			</div>
		</article>
	);
}

export { BuyBoxViewSkeleton };
