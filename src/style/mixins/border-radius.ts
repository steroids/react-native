export const mixinBorderRadius = (
    variables,
    radius,
) => (variables.enableRounded ? {
    borderRadius: radius === undefined ? variables.borderRadius : radius,
} : {});