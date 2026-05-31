import { useEffect, useState } from "react";
import type { Offer } from "../api/offer";
import { getOffer } from "../api/offer";

export interface UseOfferResult {
	offer: Offer | null;
	isLoading: boolean;
}

export function useOffer(): UseOfferResult {
	const [offer, setOffer] = useState<Offer | null>(null);

	useEffect(function fetchOfferOnMount() {
		let cancelled = false;

		void getOffer().then(function applyOffer(fetchedOffer) {
			if (!cancelled) {
				setOffer(fetchedOffer);
			}
		});

		return function cancelOfferFetch() {
			cancelled = true;
		};
	}, []);

	return {
		offer,
		isLoading: offer === null,
	};
}
