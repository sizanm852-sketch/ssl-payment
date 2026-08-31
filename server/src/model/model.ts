import mongoose, { Schema } from 'mongoose';
import { ITransaction } from '../utils/type';

// Define the interface for the SSLCommerz Transaction


// Define the schema
const TransactionSchema: Schema = new Schema(
  {
    tran_id: {
      type: String,
      required: true,
      unique: true,
    },
    val_id: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'BDT',
    },
    status: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'],
      default: 'PENDING',
    },
    cus_name: {
      type: String,
      required: true,
    },
    cus_email: {
      type: String,
      required: true,
    },
    cus_phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);
