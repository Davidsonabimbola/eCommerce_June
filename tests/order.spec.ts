import {test} from "../fixtures/Fixtures"
import {expect } from '@playwright/test';


test.describe('Single order',()=>{



    test('successful place an order', async({loggedInPage})=>{
        const productContainer = await loggedInPage.locator('[class="card-body"]')
        const item =  productContainer.filter({has: loggedInPage.getByText('ZARA COAT 3')})
        await item.locator('button').filter({hasText:' Add To Cart'}).click()
        const toastMessage = await loggedInPage.getByText('Product Added to Cart')
        await expect(await toastMessage).toBeTruthy()

        const cartButton = await loggedInPage.getByRole('button',{name:/Cart/i}).nth(0)
        //const cartButton = await loggedInPage.getByRole('button', { name: /^\s* Cart\s*$/i });

        await cartButton.click()
    })

})