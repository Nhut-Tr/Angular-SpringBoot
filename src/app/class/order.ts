import { Checkout } from './checkout';
export class Order {
  id: any;
  status?: number;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  checkout?: Checkout;
  total?: number;
}
