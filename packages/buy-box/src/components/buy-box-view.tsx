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
							<span aria-hidden="true" className="material-symbols-outlined">
								remove
							</span>
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
							<span aria-hidden="true" className="material-symbols-outlined">
								add
							</span>
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
					<span
						aria-hidden="true"
						className="material-symbols-outlined text-surface-tint"
					>
						check_circle
					</span>
					Frete grátis e entrega expressa
				</div>
			</div>
			<div className="grid grid-cols-3 gap-sm">
				<div className="flex flex-col items-center text-center gap-xs">
					<span
						aria-hidden="true"
						className="material-symbols-outlined text-secondary text-[24px]"
					>
						local_shipping
					</span>
					<span className="text-[9px] font-bold uppercase text-secondary">
						Entrega rápida
					</span>
				</div>
				<div className="flex flex-col items-center text-center gap-xs">
					<span
						aria-hidden="true"
						className="material-symbols-outlined text-secondary text-[24px]"
					>
						verified_user
					</span>
					<span className="text-[9px] font-bold uppercase text-secondary">
						Garantia de 2 anos
					</span>
				</div>
				<div className="flex flex-col items-center text-center gap-xs">
					<span
						aria-hidden="true"
						className="material-symbols-outlined text-secondary text-[24px]"
					>
						sync
					</span>
					<span className="text-[9px] font-bold uppercase text-secondary">
						Devolução fácil
					</span>
				</div>
			</div>
		</div>
	);
}

export { BuyBoxView };
