function Cart() {
	return (
		<div className="relative group">
			<button
				aria-controls="cart-panel"
				aria-expanded="false"
				aria-haspopup="true"
				aria-label="Shopping cart, 1 item"
				className="p-2 hover:bg-surface-container rounded-full transition-colors relative"
				type="button"
			>
				<span
					aria-hidden="true"
					className="material-symbols-outlined text-on-surface"
				>
					shopping_cart
				</span>
				<span
					aria-hidden="true"
					className="absolute top-1 right-1 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
				>
					1
				</span>
			</button>
			<section
				className="absolute right-0 top-full mt-2 w-80 bg-surface border border-outline-variant rounded-xl shadow-2xl z-50 p-4 transition-all duration-200"
				id="cart-panel"
				aria-label="Cart preview"
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="font-headline-md text-on-surface m-0">Your Cart</h2>
					<p className="text-body-sm text-secondary">1 Item</p>
				</div>
				<div className="flex gap-4 mb-6">
					<div className="w-20 h-20 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant shrink-0">
						<img
							alt="Nintendo Switch 2"
							className="w-full h-full object-cover"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQbHyeGMFNKPhxM_LwW1marbXI_827qzjF8NVgxO2k-WNFigFZg0sAT2r3nF3MW5i6KwztMUE-L146VtDjA3g5XwMW2cOA_00tLXl7Rr1RaW-_ayt96MtDz0-OZa4Vn0VppAUA69IRFkjhi-g-QRf9URKQZJ7k0Fia17FndBAhl0MRbTryaEksh1gBZQBe2FZMplv9Qin-C9KgBXFTkh7_hOQlYOGZdYQlnxQQKZjk8fKNkUsL0KPffiHQDt7iGuNYN55fPDAeKDgr"
						/>
					</div>
					<div className="flex flex-col justify-between min-w-0 flex-1">
						<div>
							<p className="font-bold text-body-sm line-clamp-1">
								Nintendo Switch 2 - 8" OLED
							</p>
							<p className="text-body-sm text-secondary">Quantity: 1</p>
						</div>
						<p className="font-bold text-primary text-body-md">$499.99</p>
					</div>
				</div>
				<div className="border-t border-outline-variant pt-4 flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<span className="text-body-md text-on-surface">Subtotal</span>
						<span className="font-price-lg text-headline-md">$499.99</span>
					</div>
					<button
						className="w-full bg-primary-container text-on-primary py-3 rounded font-bold text-body-md hover:bg-primary transition-colors"
						type="button"
					>
						Checkout
					</button>
					<button
						className="w-full text-secondary hover:text-on-surface py-1 text-body-sm transition-colors text-center font-medium"
						type="button"
					>
						View Cart
					</button>
				</div>
			</section>
		</div>
	);
}

export { Cart };
