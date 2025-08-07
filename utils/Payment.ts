import {faker} from '@faker-js/faker'
export interface userDetails{
    cardName: string
    cardCVV : string
    cardNumber : string
}


export class paymentDetails{

    public static Payer(): userDetails{
        return{
            cardName: faker.person.fullName(),
            cardCVV : faker.finance.creditCardCVV(),
            cardNumber : faker.finance.creditCardNumber()
        }
    }
}