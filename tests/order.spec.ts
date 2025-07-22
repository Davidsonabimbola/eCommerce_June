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





    test.only('successful place multiple orders', async ({ loggedInPage }) => {
  const productContainer =await loggedInPage.locator('.card-body');
  const productContainerCount = await productContainer.count();
  console.log(`Number of product cards: ${productContainerCount}`);

  const itemsToOrder = ['ADIDAS ORIGINAL', 'IPHONE 13 PRO'];

  for (const itemName of itemsToOrder) {
    for (let i = 0; i < productContainerCount; i++) {
      const product = productContainer.nth(i);
      const title = await product.locator('h5').textContent();

      if (title?.trim() === itemName) {
        await product.locator('button', { hasText: 'Add To Cart' }).click();
        console.log(`Clicked Add to Cart for: ${itemName}`);
        break; // Stop loop once item is found
      }
    }
  }

  console.log('All requested items added to cart');
});

})