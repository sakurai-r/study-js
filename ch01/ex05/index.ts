export function abs(x: number) {
    if (x >= 0) {
        return x;
    } else {
        return -x;
    }
}

export function sum(array: number[]) {
    let sum = 0;
    for (const x of array) {
        sum += x;
    }
    return sum;
}

export function factorial(n: number) {
    let product = 1;
    while (n > 1) {
        product *= n;
        n--;
    }
    return product;
}
