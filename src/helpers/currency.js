export const formatCurrency = (number) => {
    return number === 0 ? 'Free' : new Intl.NumberFormat().format(number);
}