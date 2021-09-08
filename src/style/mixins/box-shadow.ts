export const mixinBoxShadow = (
    variables,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
) => (variables.enableShadows ? {
    shadowColor: shadowColor,
    shadowOffset: shadowOffset,
    shadowOpacity: shadowOpacity,
    shadowRadius: shadowRadius,
    elevation: 1,
} : {});