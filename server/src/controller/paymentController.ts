import {Request,Response} from 'express';
import { orderID } from '../utils/functions';
import SSLCommerzPayment from 'sslcommerz-lts';
import "dotenv/config";
import { Transaction } from '../model/model';

    const storeId=process.env.STORE_ID;
    const storePass=process.env.STORE_PASS;
    const currency=process.env.CURRENCY;
    const successUrl=process.env.SUCCESS_URL;
    const failUrl=process.env.FAIL_URL;
    const cancelUrl=process.env.CANCEL_URL;
    const isLive=false;

export const initiatePayment = async (req: Request, res: Response): Promise<void> => {
    const { amount, name, email, phone, address } = req.body;

    try {
        const data: any = {
            total_amount: amount,
            tran_id: orderID(),
            currency,
            success_url: successUrl,
            fail_url: failUrl,
            cancel_url: cancelUrl,
            cus_name: name || "Customer",
            cus_email: email || "customer@example.com",
            cus_phone: phone || "01700000000",
            cus_add1: address || "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            shipping_method: "NO",
            num_of_item: 1,
            product_name: "Order",
            product_category: "General",
            product_profile: "general",
        };

        const sslcz = new SSLCommerzPayment(storeId!, storePass!, isLive);
        
        // Save pending transaction to database
        await Transaction.create({
            tran_id: data.tran_id,
            amount: data.total_amount,
            currency: data.currency,
            status: 'PENDING',
            cus_name: data.cus_name,
            cus_email: data.cus_email,
            cus_phone: data.cus_phone
        });

        const apiResponse = await sslcz.init(data);

        const GatewayPageURL = apiResponse.GatewayPageURL;
        if (GatewayPageURL) {
            console.log('Sending URL to client: ', GatewayPageURL);
            res.json({ url: GatewayPageURL });
        } else {
            res.status(400).json({ message: 'Failed to get payment URL', response: apiResponse });
        }

    } catch (error: any) {
        console.error('Payment initiation error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message || error.toString() });
    }
}
export const paymentSuccess = async (req: Request, res: Response) => {
    try {
        const { tran_id, val_id } = req.body;

        if (!val_id) {
            res.status(400).json({ message: 'Validation ID not found' });
            return;
        }

        // Initialize SSLCommerz
        const sslcz = new SSLCommerzPayment(storeId!, storePass!, isLive);

        // Validate the transaction using val_id
        const validationResponse = await sslcz.validate({ val_id });

        // SSLCommerz validation response status is usually 'VALID' or 'VALIDATED'
        if (validationResponse.status === 'VALID' || validationResponse.status === 'VALIDATED') {
            await Transaction.findOneAndUpdate(
                { tran_id },
                { status: 'SUCCESS', val_id }
            );
            res.redirect(`http://localhost:5173/success/${tran_id}`);
        } else {
            // If validation fails, mark as failed
            await Transaction.findOneAndUpdate(
                { tran_id },
                { status: 'FAILED' }
            );
            res.redirect(`http://localhost:5173/failed`);
        }
    } catch (error) {
        console.error('Payment success error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const paymentFailed = async (req: Request, res: Response) => {
    try {
        const { tran_id } = req.body;
        await Transaction.findOneAndUpdate(
            { tran_id },
            { status: 'FAILED' }
        );
        res.redirect(`http://localhost:5173/failed`);
    } catch (error) {
        console.error('Payment failure error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const paymentCancel = async (req: Request, res: Response) => {
    try {
        const { tran_id } = req.body;
        await Transaction.findOneAndUpdate(
            { tran_id },
            { status: 'CANCELLED' }
        );
        res.redirect(`http://localhost:5173/cancel`);
    } catch (error) {
        console.error('Payment cancel error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const refundQueryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { refund_ref_id } = req.query;

        if (!refund_ref_id || typeof refund_ref_id !== 'string') {
             res.status(400).json({ message: 'Refund reference ID (refund_ref_id) is required' });
             return;
        }

        const sslcz = new SSLCommerzPayment(storeId!, storePass!, isLive);
        
        // Query the refund status from SSLCommerz
        const response = await sslcz.refundQuery({ refund_ref_id });
        
        res.json({ success: true, data: response });
    } catch (error: any) {
        console.error('Refund query error:', error);
        res.status(500).json({ message: 'Failed to query refund', error: error.message || error.toString() });
    }
}