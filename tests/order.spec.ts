import { test } from "../fixtures/Fixtures"
import { expect } from '@playwright/test';
import { OrderFeatures } from "../pages/Order";
import * as single_order_data from "../fixtures/data/singleorder.json";
import * as multi_order_data from "../fixtures/data/multipleorder.json"
import { toast_messages } from "../utils/Order_Messages";
import { paymentDetails } from "../utils/Payment";

let order_features: OrderFeatures



const User = paymentDetails.Payer()

const UserName = User.cardName
const UserNumber = User.cardNumber
const UserCVV = User.cardCVV

test.beforeEach(async ({ loggedInPage }) => {
  order_features = new OrderFeatures(loggedInPage)
})


test.describe('Single order', () => {

  test('successful place an order', async () => {
    const singleOrder_data = single_order_data
    await order_features.select_single_order(singleOrder_data.orderName)
    await order_features.assert_selected_order(toast_messages.product_sucess)
    await order_features.select_cart()
    await order_features.checkout_item()
    await order_features.fillcardName(UserName)
    await order_features.fill_cvvNumber(UserCVV)
    //await order_features.clear_card_number_field(UserNumber)
    await order_features.selectCountry()
    await order_features.placeOrder()


    // const productContainer = await loggedInPage.locator('[class="card-body"]')
    //   const item =  productContainer.filter({has: loggedInPage.getByText('ZARA COAT 3')})
    //   await item.locator('button').filter({hasText:' Add To Cart'}).click()
    //   const toastMessage = await loggedInPage.getByText('Product Added to Cart')
    //   await expect(await toastMessage).toBeTruthy()

    //   const cartButton = await loggedInPage.getByRole('button',{name:/Cart/i}).nth(0)
    //   //const cartButton = await loggedInPage.getByRole('button', { name: /^\s* Cart\s*$/i });
    //   await cartButton.click()


  })





  test('successful place multiple orders', async () => {

    const multiOrder_data = multi_order_data
    const itemsToOrder = [multiOrder_data.first_order, multiOrder_data.second_order, multiOrder_data.third_order];
    await order_features.select_multiple_order(itemsToOrder)
    await order_features.select_cart()


    // const productContainer =await loggedInPage.locator('.card-body');
    // const productContainerCount = await productContainer.count();
    // console.log(`Number of product cards: ${productContainerCount}`);
    // const orderPrice:number[] = []

    // const itemsToOrder = ['ADIDAS ORIGINAL', 'IPHONE 13 PRO', 'ZARA COAT 3'];

    // for (const itemName of itemsToOrder) {
    //   for (let i = 0; i < productContainerCount; i++) {
    //     const product = productContainer.nth(i);
    //     const title = await product.locator('h5').textContent();

    //     if (title?.trim() === itemName) {
    //       // remove all characters except digits and dots
    //       const itemPriceText = await product.locator('.text-muted').textContent();
    //       const itemPrice = itemPriceText ? parseFloat(itemPriceText.replace(/[^\d.]/g, '')) : 0;
    //       console.log(await itemPrice)
    //       orderPrice.push(await itemPrice)

    //       await product.locator('button', { hasText: 'Add To Cart' }).click();
    //       const sumOf_items =  orderPrice.reduce((accumulator,currentValue)=>{
    //           return accumulator + currentValue;
    //       }, 0)

    //       await expect(await loggedInPage.getByText('Product Added To Cart')).toBeVisible()
    //       console.log(`Clicked Add to Cart for: ${itemName}`);
    //       console.log(`The prices of all orders are: ${await orderPrice}`)
    //       console.log(`The sum of the items is: $${sumOf_items}`)
    //       break; // Stop loop once item is found
    //     }
    //   }
    // }

    // console.log('All requested items added to cart');


  });



  test('filter orders', async ({ loggedInPage }) => {
    await loggedInPage.locator('[name="minPrice"]').nth(1).fill('2000')
    await loggedInPage.locator('input[name="maxPrice"]').nth(1).fill('54544')
    //await loggedInPage.locator('#sidebar').getByText('Search', { exact: true }).click()
    //await expect(await loggedInPage.getByText('No Products Found')).toBeVisible()
  })

})