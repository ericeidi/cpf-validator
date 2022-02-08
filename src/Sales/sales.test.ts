import Cpf from "../common/helpers/cpf";
import Sale from "./sales";

const cpfValidInput = '035.734.521-59'
const cpfInvalidInput = '111.444.777-11'
const discountCouponInput = 0.10

const mockOrderInput = {
    price: 10,
    description: 'Lorem ipsum',
    amount: 5,
}

test("Should return the result of an order", function () {
    const sale = new Sale();
    expect(sale.calculateOrderProductWithDiscount(mockOrderInput, cpfValidInput, discountCouponInput)).toEqual(45);
});

test("Should calculate the discount", function () {
    const sale = new Sale();
    expect(sale.calculateDiscount(mockOrderInput, discountCouponInput)).toEqual(5);
});

test("Should return a valid cpf", function () {
    const cpf = new Cpf();
    expect(cpf.validateCpf(cpfValidInput)).toBe(true);
});

test("Should return a invalid cpf", function () {
    const cpf = new Cpf();
    expect(cpf.validateCpf(cpfInvalidInput)).toBe(false);
});
