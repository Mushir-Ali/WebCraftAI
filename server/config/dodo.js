import dotenv from 'dotenv';
dotenv.config();
import DodoPayments from "dodopayments";

const dodo = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: "test_mode",
});

export default dodo;