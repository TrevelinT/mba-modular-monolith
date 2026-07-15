import { Cart } from "@repo/cart";

function Header() {
	return (
		<header className="bg-surface dark:bg-surface-container-low border-b border-outline-variant dark:border-outline fixed top-0 w-full z-50">
			<div className="flex items-center max-w-max-width mx-auto px-margin-mobile md:px-gutter h-16 justify-between">
				<a
					aria-label="Go to homepage"
					className="block h-10 text-on-surface"
					href="/"
				>
					<img
						alt="Game Store"
						className="h-full w-auto object-contain"
						height={40}
						src="/game-store-logo.svg"
						width={160}
					/>
				</a>
				<Cart />
			</div>
		</header>
	);
}

export { Header };
