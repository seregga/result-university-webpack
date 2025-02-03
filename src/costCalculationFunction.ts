interface FuncData {
    price: number
    discount: number
    isInstallment: boolean
    months: number
}

const totalPrice = ({ price, discount, isInstallment, months }:FuncData): number => {
    if (isInstallment) {
        return (price - (price * (discount/100))) / months
    } else {
        return price - (price * (discount/100))
    } 
};

const price = totalPrice({ price: 100000, discount: 25, isInstallment: true, months: 12 });
console.log(price); // 6250