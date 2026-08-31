"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../controller/paymentController");
const router = express_1.default.Router();
router.post('/initiate', paymentController_1.initiatePayment);
router.post('/success', paymentController_1.paymentSuccess);
router.post('/fail', paymentController_1.paymentFailed);
router.post('/cancel', paymentController_1.paymentCancel);
router.get('/refund-query', paymentController_1.refundQueryController);
exports.default = router;
