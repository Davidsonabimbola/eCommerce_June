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

    async checkout_item(){
        await this.page.getByRole('button',{name:'Checkout'}).click()
    }

    async clear_card_number_field(cardNumber:string){
        await this.page.locator('[class="input txt text-validated"]').nth(0).clear()
        await this.page.locator('[class="input txt text-validated"]').nth(0).fill(cardNumber)
    }


    async fillcardName(cardName:string){
        await this.page.locator('input[class="input txt"]').nth(1).fill(cardName)
    }

    async fill_cvvNumber(cardCVV:string){
        await this.page.locator('input[class="input txt"]').nth(0).fill(cardCVV)
    }

    async selectCountry(){
        await  expect(await this.page.locator('[class="input txt text-validated"]').nth(1)).toBeVisible()
        await this.page.locator('[class="input txt text-validated"]').nth(1).fill('Nigeria')
        await this.page.getByRole('button',{name:' Nigeria'}).click()
       
        // await expect(await this.page.locator('section[class="ta-results list-group ng-star-inserted"]')).toBeVisible()
        // const Search_Results = await this.page.locator('[class="ta-results list-group ng-star-inserted"]')
        // const searchfield = await Search_Results.locator('[class="ta-item list-group-item ng-star-inserted"]')


      
    }

    async placeOrder(){
        await this.page.locator('[class="btnn action__submit ng-star-inserted"]').click()
    }

    async validate_successfulOrder(){
        const success_ordertext = await this.page.getByText(' Thankyou for the order. ')
        const downloadReceipt = await this.page.getByRole('button',{name:'Click To Download Order Details in CSV'})
        await expect(await success_ordertext).toBeVisible()
        await expect(await downloadReceipt).toBeVisible()
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