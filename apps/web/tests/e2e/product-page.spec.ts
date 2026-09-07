import { expect, test } from "../fixtures";

test.describe("Product page", () => {
	test("displays product title and empty cart", async ({ page }) => {
		await expect(
			page.getByRole("heading", {
				name: "Nintendo Switch 2 - Bundle Mario Kart World",
			}),
		).toBeVisible();
		await expect(
			page.getByRole("button", { name: "Carrinho de compras, vazio" }),
		).toBeVisible();
	});

	test("increases quantity and adds item to cart", async ({ page }) => {
		await page.getByRole("button", { name: "Aumentar quantidade" }).click();
		await expect(page.getByRole("status")).toHaveText("2");

		await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
		await expect(
			page.getByRole("button", { name: "Carrinho de compras, 2 itens" }),
		).toBeVisible({ timeout: 5000 });

		await page
			.getByRole("button", { name: /Carrinho de compras, 2 itens/ })
			.click();
		await expect(
			page.getByRole("heading", { name: "Seu carrinho" }),
		).toBeVisible();
		await expect(
			page.getByLabel("Pré-visualização do carrinho").getByRole("status"),
		).toHaveText("2");
	});

	test("edits quantity and deletes item from cart", async ({ page }) => {
		await page.getByRole("button", { name: "Aumentar quantidade" }).click();
		await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
		await expect(
			page.getByRole("button", { name: "Carrinho de compras, 2 itens" }),
		).toBeVisible({ timeout: 5000 });

		await page
			.getByRole("button", { name: /Carrinho de compras, 2 itens/ })
			.click();
		const cartPanel = page.getByLabel("Pré-visualização do carrinho");
		await expect(cartPanel.getByRole("status")).toHaveText("2");

		await page.getByRole("button", { name: /Aumentar quantidade de / }).click();
		await expect(cartPanel.getByRole("status")).toHaveText("3");
		await expect(
			page.getByRole("button", { name: "Carrinho de compras, 3 itens" }),
		).toBeVisible();

		await page.getByRole("button", { name: /Diminuir quantidade de / }).click();
		await expect(cartPanel.getByRole("status")).toHaveText("2");

		await page.getByRole("button", { name: /Diminuir quantidade de / }).click();
		await expect(cartPanel.getByRole("status")).toHaveText("1");
		await expect(
			page.getByRole("button", { name: /Diminuir quantidade de / }),
		).toBeDisabled();

		await page.getByRole("button", { name: /Remover .+ do carrinho/ }).click();
		await expect(
			page.getByRole("button", { name: "Carrinho de compras, vazio" }),
		).toBeVisible();
		await expect(page.getByText("Seu carrinho está vazio.")).toBeVisible();
	});

	test("switches product image via carousel", async ({ page }) => {
		await page
			.getByRole("button", {
				name: "Nintendo Switch 2 - Jogador com o Nintendo Switch 2 na mão",
			})
			.click();

		await expect(
			page.getByRole("button", {
				name: "Nintendo Switch 2 - Jogador com o Nintendo Switch 2 na mão",
			}),
		).toHaveAttribute("aria-current", "true");
	});
});

test.describe("@visual Product page", () => {
	test("displays product title and empty cart", async ({ page }) => {
		await expect(
			page.getByRole("heading", {
				name: "Nintendo Switch 2 - Bundle Mario Kart World",
			}),
		).toBeVisible();
		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot("e2e-01-product-and-empty-cart.png");
	});

	test("increases quantity and adds item to cart", async ({ page }) => {
		await page.getByRole("button", { name: "Aumentar quantidade" }).click();
		await expect(page.getByRole("status")).toHaveText("2");
		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot("e2e-02-quantity-increased.png");

		await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
		await expect(
			page.getByRole("button", { name: "Carrinho de compras, 2 itens" }),
		).toBeVisible({ timeout: 5000 });

		await page
			.getByRole("button", { name: /Carrinho de compras, 2 itens/ })
			.click();
		await expect(
			page.getByRole("heading", { name: "Seu carrinho" }),
		).toBeVisible();
		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot("e2e-03-cart-with-two-items.png");
	});

	test("switches product image via carousel", async ({ page }) => {
		await page
			.getByRole("button", {
				name: "Nintendo Switch 2 - Jogador com o Nintendo Switch 2 na mão",
			})
			.click();

		await expect(
			page.getByRole("button", {
				name: "Nintendo Switch 2 - Jogador com o Nintendo Switch 2 na mão",
			}),
		).toHaveAttribute("aria-current", "true");

		await page.evaluate(() => document.fonts.ready);
		await expect(page).toHaveScreenshot(
			"e2e-04-carousel-thumbnail-selected.png",
		);
	});
});
