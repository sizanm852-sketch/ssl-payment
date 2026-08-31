import express from 'express';
import { initiatePayment, paymentSuccess, paymentFailed, paymentCancel, refundQueryController } from '../controller/paymentController';

const router = express.Router();

router.post('/initiate', initiatePayment);
router.post('/success', paymentSuccess);
router.post('/fail', paymentFailed);
router.post('/cancel', paymentCancel);
router.get('/refund-query', refundQueryController);

export default router;
