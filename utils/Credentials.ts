import * as dotenv from 'dotenv';
dotenv.config();

export interface loginDetails {
        email : string
        password : string
        
    }


    export class Credentials{


        public static validCredentials(): loginDetails{
            return {
                email: process.env.EMAIL || 'defaultUsername',
                password : process.env.PASSWORD || 'defaultPassword'
            }
        }


        public static invalidCredentials(): loginDetails{
            return {
                email: 'timmy_001@example.com',
                password : '12.Nopassword.13'
            }

        }
    }
    export default Credentials