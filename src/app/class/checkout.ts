import { ProductClass } from 'src/app/class/product-class.model';
export class Checkout {
    id?:number;
    quantity?:number;
    price?:any;
    deliveryAddress?:string;
    orderDate?:Date;
    products?:ProductClass;
}
