console.log("👉 Importing dodo...");
import dodo from "../config/dodo.js";
import { PLANS } from "../config/plan.js";

export const billing = async (req, res) => {
    try {
        const { planType } = req.body;
        const user = req.user;

        const plan = PLANS[planType];

        if (!plan || plan.price === 0 || !plan.productId) {
            return res.status(400).json({ message: "Invalid plan type" });
        }
        const session = await dodo.checkoutSessions.create({
            product_cart: [
                {
                    product_id: plan.productId,
                    quantity: 1,
                },
            ],

            customer: {
                email: user.email,
                name: user.name || "User",
            },

            return_url: `${process.env.FRONTEND_URL}/`,

            metadata: {
                userId: user._id.toString(),
                credits: String(plan.credits), // ✅ FIX
                plan: String(plan.plan),       // (already string, but safe)
            }
        });
        return res.status(200).json({
            checkoutUrl: session.checkout_url,
        });

    } catch (err) {
    console.error("🔥 DODO FULL ERROR:", err.response?.data || err);

    return res.status(500).json({
        message: err.message,
    });
}
};