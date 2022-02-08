import { ProductDTO } from "./dtos/product.dto";
import Cpf from '../common/helpers/cpf'

export default class Sale {
    calculateOrderProductWithDiscount = (product: ProductDTO, cpfParams: string, discountCoupon: number): number | boolean => {
        const cpf = new Cpf();
        if (!cpf.validateCpf(cpfParams)) return false;
        const orderDetails: ProductDTO = {
            price: product.price,
            description: product.description,
            amount: product.amount,
        }
        const discount = this.calculateDiscount(orderDetails, discountCoupon);
        return (orderDetails.price * orderDetails.amount) - discount
    }

    calculateDiscount = ({price, amount}: ProductDTO, discountCoupon: number): number => {
        return (price * amount) * discountCoupon;
    }
}