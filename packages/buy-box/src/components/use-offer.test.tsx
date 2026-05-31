import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as offerApi from "../api/offer";
import { useOffer } from "./use-offer";

function OfferProbe() {
	const { offer, isLoading } = useOffer();

	return (
		<div>
			<span data-testid="loading">{isLoading ? "yes" : "no"}</span>
			<span data-testid="sale-price">{offer?.salePrice ?? ""}</span>
		</div>
	);
}

describe("useOffer", () => {
	it("starts loading then exposes the fetched offer", async () => {
		const offer = await offerApi.getOffer({ latencyMs: 0 });
		const getOfferSpy = vi.spyOn(offerApi, "getOffer").mockResolvedValue(offer);

		render(<OfferProbe />);

		expect(screen.getByTestId("loading")).toHaveTextContent("yes");
		expect(screen.getByTestId("sale-price")).toHaveTextContent("");

		expect(await screen.findByText("4099.99")).toBeInTheDocument();
		expect(screen.getByTestId("loading")).toHaveTextContent("no");

		getOfferSpy.mockRestore();
	});
});
