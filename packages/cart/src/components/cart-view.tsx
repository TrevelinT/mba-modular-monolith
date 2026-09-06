import type { RefObject } from "react";
import type { CartLineItem } from "../api";
import { formatPrice } from "../api/format-price";

export interface CartViewProps {
	containerRef: RefObject<HTMLDivElement | null>;
	isOpen: boolean;
	items: CartLineItem[];
	itemCount: number;
	subtotal: number;
	isEmpty: boolean;
	cartAriaLabel: string;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	onButtonClick: () => void;
	onRemoveItem: (productId: string) => void;
	onIncreaseItem: (productId: string) => void;
	onDeleteItem: (productId: string) => void;
}

function MinusIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-4"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M19 13H5v-2h14v2z" />
		</svg>
	);
}

function PlusIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-4"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
		</svg>
	);
}

function TrashIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-4"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
		</svg>
	);
}

function ShoppingCartIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-6 text-on-surface"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
		</svg>
	);
}

function CartView({
	containerRef,
	isOpen,
	items,
	itemCount,
	subtotal,
	isEmpty,
	cartAriaLabel,
	onMouseEnter,
	onMouseLeave,
	onButtonClick,
	onRemoveItem,
	onIncreaseItem,
	onDeleteItem,
}: CartViewProps) {
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: wrapper spans button and panel for hover
		<div
			className="relative"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			ref={containerRef}
		>
			<button
				aria-controls="cart-panel"
				aria-expanded={isOpen}
				aria-haspopup="true"
				aria-label={cartAriaLabel}
				className={`p-2 rounded-full transition-colors relative cursor-pointer ${
					isOpen ? "bg-surface-container" : "hover:bg-surface-container"
				}`}
				onClick={onButtonClick}
				type="button"
			>
				<ShoppingCartIcon />
				{!isEmpty ? (
					<span
						aria-hidden="true"
						className="absolute top-1 right-1 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
					>
						{itemCount}
					</span>
				) : null}
			</button>
			<div
				className={`absolute right-0 top-full pt-2 z-50 ${
					isOpen ? "pointer-events-auto" : "pointer-events-none"
				}`}
			>
				<section
					aria-hidden={!isOpen}
					aria-label="Pré-visualização do carrinho"
					className={`w-80 bg-surface border border-outline-variant rounded-xl shadow-2xl p-4 transition-all duration-200 ${
						isOpen ? "opacity-100 visible" : "opacity-0 invisible"
					}`}
					id="cart-panel"
				>
					<div className="flex justify-between items-center mb-4">
						<h2 className="font-headline-md text-on-surface m-0">
							Seu carrinho
						</h2>
						{!isEmpty ? (
							<p className="text-body-sm text-secondary">
								{itemCount} {itemCount === 1 ? "item" : "itens"}
							</p>
						) : null}
					</div>
					{isEmpty ? (
						<p className="text-body-sm text-secondary mb-6">
							Seu carrinho está vazio.
						</p>
					) : (
						<>
							{items.map((item) => (
								<div className="flex gap-4 mb-6" key={item.productId}>
									<div className="w-20 h-20 bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant shrink-0">
										<img
											alt={item.name}
											className="w-full h-full object-cover"
											src={item.imageUrl}
										/>
									</div>
									<div className="flex flex-col justify-between min-w-0 flex-1">
										<div>
											<p className="font-bold text-body-sm line-clamp-1">
												{item.name}
											</p>
											<div className="flex items-center gap-2 mt-1">
												<div className="flex items-center border border-outline-variant rounded">
													<button
														aria-label={`Diminuir quantidade de ${item.name}`}
														className="p-1 hover:bg-surface-container transition-colors cursor-pointer text-secondary hover:text-on-surface disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-secondary"
														disabled={item.quantity === 1}
														onClick={() => onRemoveItem(item.productId)}
														type="button"
													>
														<MinusIcon />
													</button>
													<span
														aria-live="polite"
														className="min-w-6 text-center text-body-sm font-bold"
														role="status"
													>
														{item.quantity}
													</span>
													<button
														aria-label={`Aumentar quantidade de ${item.name}`}
														className="p-1 hover:bg-surface-container transition-colors cursor-pointer text-secondary hover:text-on-surface"
														onClick={() => onIncreaseItem(item.productId)}
														type="button"
													>
														<PlusIcon />
													</button>
												</div>
												<button
													aria-label={`Remover ${item.name} do carrinho`}
													className="p-1 rounded hover:bg-surface-container transition-colors cursor-pointer text-secondary hover:text-on-surface"
													onClick={() => onDeleteItem(item.productId)}
													type="button"
												>
													<TrashIcon />
												</button>
											</div>
										</div>
										<p className="font-bold text-primary text-body-md">
											{formatPrice(item.unitPrice * item.quantity)}
										</p>
									</div>
								</div>
							))}
							<div className="border-t border-outline-variant pt-4 flex flex-col gap-4">
								<div className="flex justify-between items-center">
									<span className="text-body-md text-on-surface">Subtotal</span>
									<span className="font-price-lg text-headline-md">
										{formatPrice(subtotal)}
									</span>
								</div>
								<button
									className="w-full bg-primary-container text-on-primary py-3 rounded font-bold text-body-md hover:bg-primary transition-colors cursor-pointer"
									type="button"
								>
									Finalizar compra
								</button>
								<button
									className="w-full text-secondary hover:text-on-surface py-1 text-body-sm transition-colors text-center font-medium cursor-pointer"
									type="button"
								>
									Ver carrinho
								</button>
							</div>
						</>
					)}
				</section>
			</div>
		</div>
	);
}

export { CartView };
