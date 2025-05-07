export const toWholeNumber = (value: number): number => {
    return Number((value * 100).toFixed(1));
};
