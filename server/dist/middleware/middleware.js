"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentVerification = void 0;
const paymentVerification = (req, res, next) => {
    try {
        const storeId = process.env.STORE_ID;
        const storePass = process.env.STORE_PASS;
        if (!storeId || !storePass) {
            res.status(500).json({ message: "Please Provide Store Id and Store Password" });
            return;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.paymentVerification = paymentVerification;
