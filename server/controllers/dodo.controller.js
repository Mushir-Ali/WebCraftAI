import User from "../models/user.model.js";
import crypto from "crypto";

export const dodoWebhook = async (req, res) => {
    try {
        console.log("\n========== 🔔 WEBHOOK RECEIVED ==========");
        console.log("Type:", req.body?.type);
        console.log("Headers received:", Object.keys(req.headers));
        console.log("X-Dodo-Signature:", req.headers['x-dodo-signature'] ? '✅ Present' : '❌ Missing');
        console.log("X-Dodo-Timestamp:", req.headers['x-dodo-timestamp'] ? '✅ Present' : '❌ Missing');
        console.log("Raw body available:", req.rawBody ? '✅ Yes' : '❌ No');
        
        // Verify webhook signature if headers are present
        if (req.headers['x-dodo-signature'] && req.headers['x-dodo-timestamp'] && req.rawBody) {
            const signature = req.headers['x-dodo-signature'];
            const timestamp = req.headers['x-dodo-timestamp'];
            const secret = process.env.DODO_WEBHOOK_SECRET;
            const signedContent = `${timestamp}.${req.rawBody}`;
            const expectedSignature = crypto
                .createHmac("sha256", secret)
                .update(signedContent)
                .digest("hex");

            console.log("Signature match:", signature === expectedSignature ? '✅ Valid' : '❌ Invalid');
            
            if (signature !== expectedSignature) {
                console.error("❌ Webhook signature verification failed");
                return res.status(401).json({ message: "Unauthorized" });
            }
            console.log("✅ Webhook signature verified successfully");
        } else {
            console.warn("⚠️ Signature verification skipped - headers not present");
        }

        const event = req.body;
        if (event.type !== "payment.succeeded") {
            console.log("⏭️ Ignoring non-payment event:", event.type);
            return res.status(200).json({ message: "Ignored" });
        }

        const metadata = event.data?.metadata;

        if (!metadata) {
            console.error("❌ No metadata found in payload");
            return res.status(400).json({ message: "No metadata" });
        }

        console.log("📦 Metadata:", { userId: metadata.userId, credits: metadata.credits, plan: metadata.plan });

        const userId = metadata.userId;
        const credits = parseInt(metadata.credits);
        const plan = metadata.plan;

        if (!userId || !credits) {
            console.error("❌ Invalid metadata - missing userId or credits");
            return res.status(400).json({ message: "Invalid metadata" });
        }

        console.log("💾 Updating user:", userId);
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $inc: { credits: credits },
            $set: { plan: plan },
        }, { new: true });
        
        console.log("✅ User updated successfully. New credits:", updatedUser?.credits, "Plan:", updatedUser?.plan);
        console.log("========================================\n");

        return res.status(200).json({ received: true });

    } catch (err) {
        console.error("\n❌ WEBHOOK ERROR:", err.message);
        console.error("Stack:", err.stack);
        console.error("========================================\n");
        return res.status(500).json({ error: err.message });
    }
};