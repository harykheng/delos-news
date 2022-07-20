export const oddOrEven = (number) => {
    if (!Number.isInteger(number)) {
        return false;
    }
    if (number % 2 === 0) {
        return 'even';
    } else {
        return 'odd';
    }
}