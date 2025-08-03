import { Locator, Page, expect } from "@playwright/test";

export class OrderFeatures {
    private page: Page

    constructor(page: Page) {
        this.page = page

    }


    async select_single_order(orderName: string) {
        const productContainer = await this.page.locator('[class="card-body"]')
        const item = productContainer.filter({ has: this.page.getByText(orderName) })
        await item.locator('button').filter({ hasText: ' Add To Cart' }).click()
    }


    async assert_selected_order(toastText: string) {
        const toastMessage = await this.page.getByText(toastText)
        await expect(await toastMessage).toBeTruthy()
    }

    async select_cart() {
        const cartButton = await this.page.getByRole('button', { name: /Cart/i }).nth(0)
        await cartButton.click()
    }

    async select_multiple_order(orders:string[]) {
        const productContainer = await this.page.locator('.card-body');
        const productContainerCount = await productContainer.count();
        console.log(`Number of product cards: ${productContainerCount}`);
        const orderPrice: number[] = []

       // const itemsToOrder = ['ADIDAS ORIGINAL', 'IPHONE 13 PRO', 'ZARA COAT 3'];

        for (const order of orders) {
            for (let i = 0; i < productContainerCount; i++) {
                const product = productContainer.nth(i);
                const title = await product.locator('h5').textContent();

                if (title?.trim() === order) {
                    // remove all characters except digits and dots
                    const itemPriceText = await product.locator('.text-muted').textContent();
                    const itemPrice = itemPriceText ? parseFloat(itemPriceText.replace(/[^\d.]/g, '')) : 0;
                    console.log(await itemPrice)
                    orderPrice.push(await itemPrice)

                    await product.locator('button', { hasText: 'Add To Cart' }).click();

                    // use reducer function
                    const sumOf_items = orderPrice.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue;
                    }, 0)

                    await expect(await this.page.getByText('Product Added To Cart')).toBeVisible()
                    console.log(`Clicked Add to Cart for: ${order}`);
                    console.log(`The prices of all orders are: ${await orderPrice}`)
                    console.log(`The sum of the items is: $${sumOf_items}`)
                    break; // Stop loop once item is found
                }
            }
        }

        console.log('All requested items added to cart');
    }


}