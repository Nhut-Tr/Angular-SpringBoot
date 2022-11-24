import { ProductClass } from './product-class.model';
export interface Cart {
     id?: any;
     productId?: any;
     userId?: any;
     quantity?: any;
     price?: any;
     products?: ProductClass;
     createDate?: Date;
     checkout?: boolean;
}
