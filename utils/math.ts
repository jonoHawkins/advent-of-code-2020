export function sum(...a: number[]) {
    return a.reduce((sum, next) => sum + next, 0);
}
export function multiply(...a: number[]) {
    const [first, ...rest] = a;

    return rest.reduce((sum, next) => {
        return sum * next;
    }, first);
}
