import { Order } from './order';
import { ProductClass } from 'src/app/class/product-class.model';
export class Checkout {
  id?: number;
  quantity?: number;
  price?: any;
  deliveryAddress?: string;
  orderDate?: Date;
  phoneNumber?: string;
  description?: string;
  products?: ProductClass;
  order?: Order;
}
