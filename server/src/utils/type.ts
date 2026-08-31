import { Document } from 'mongoose';

export interface ITransaction extends Document {
  tran_id: string;
  val_id?: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
  cus_name: string;
  cus_email: string;
  cus_phone: string;
  createdAt: Date;
  updatedAt: Date;
}
