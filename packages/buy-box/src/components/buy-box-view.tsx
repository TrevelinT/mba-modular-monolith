import { formatPrice } from "../api/format-price";

export interface BuyBoxViewProps {
	salePrice: number;
	listPrice: number;
	installmentText: string;
	quantity: number;
	onDecreaseQuantity: () => void;
	onIncreaseQuantity: () => void;
	onPreOrder: () => void;
}

function MinusIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-6"
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
			className="size-6"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
		</svg>
	);
}

function CheckCircleIcon({ className }: { className?: string }) {
	return (
		<svg
			aria-hidden="true"
			className={className ?? "size-6"}
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
		</svg>
	);
}

function LocalShippingIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-6 text-secondary"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
		</svg>
	);
}

function VerifiedUserIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-6 text-secondary"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
		</svg>
	);
}

function SyncIcon() {
	return (
		<svg
			aria-hidden="true"
			className="size-6 text-secondary"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
		</svg>
	);
}

function BuyBoxView({
	salePrice,
	listPrice,
	installmentText,
	quantity,
	onDecreaseQuantity,
	onIncreaseQuantity,
	onPreOrder,
}: BuyBoxViewProps) {
	return (
		<div className="lg:col-span-3 flex flex-col gap-lg">
			<div className="bg-surface-container-low p-lg border border-outline-variant rounded-xl flex flex-col gap-lg">
				<div className="flex flex-col gap-xs">
					<div className="flex flex-col gap-xs">
						<s className="text-body-md text-secondary">
							{formatPrice(listPrice)}
						</s>
						<span className="font-price-lg text-price-lg text-on-surface">
							{formatPrice(salePrice)}
						</span>
					</div>
					<p className="text-body-sm text-secondary font-medium mt-1">
						{installmentText}
					</p>
				</div>
				<div className="flex flex-col gap-sm">
					<label
						className="font-label-md text-on-surface uppercase tracking-wider"
						htmlFor="quantity"
					>
						Quantidade
					</label>
					<div
						className="flex items-center w-full max-w-[140px] border border-outline-variant rounded"
						id="quantity"
					>
						<button
							aria-label="Diminuir quantidade"
							className="p-2 hover:bg-surface-container transition-colors"
							onClick={onDecreaseQuantity}
							type="button"
						>
							<MinusIcon />
						</button>
						<span
							aria-live="polite"
							className="flex-1 text-center font-bold"
							role="status"
						>
							{quantity}
						</span>
						<button
							aria-label="Aumentar quantidade"
							className="p-2 hover:bg-surface-container transition-colors"
							onClick={onIncreaseQuantity}
							type="button"
						>
							<PlusIcon />
						</button>
					</div>
				</div>
				<div className="flex flex-col gap-md pt-base">
					<button
						className="w-full bg-primary-container hover:bg-primary py-lg rounded text-on-primary font-headline-md transition-all active:opacity-80"
						onClick={onPreOrder}
						type="button"
					>
						Adicionar ao carrinho
					</button>
				</div>
				<div className="flex items-center gap-sm text-body-sm font-medium text-on-surface pt-sm">
					<CheckCircleIcon className="size-6 text-surface-tint" />
					Frete grátis e entrega expressa
				</div>
			</div>
			<div className="grid grid-cols-3 gap-sm">
				<div className="flex flex-col items-center text-center gap-xs">
					<LocalShippingIcon />
					<span className="text-[9px] font-bold uppercase text-secondary">
						Entrega rápida
					</span>
				</div>
				<div className="flex flex-col items-center text-center gap-xs">
					<VerifiedUserIcon />
					<span className="text-[9px] font-bold uppercase text-secondary">
						Garantia de 2 anos
					</span>
				</div>
				<div className="flex flex-col items-center text-center gap-xs">
					<SyncIcon />
					<span className="text-[9px] font-bold uppercase text-secondary">
						Devolução fácil
					</span>
				</div>
			</div>
		</div>
	);
}

export { BuyBoxView };
