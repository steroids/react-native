export default function (variables) {
    const colors = {
        ...variables.colors,
        ...variables.themeColors
    };

    let classes = {};

    Object.keys(colors).map((colorName) => {
        classes[`bg-${colorName}`] = {
            backgroundColor: colors[colorName]
        };

        classes[`text-${colorName}`] = {
            color: colors[colorName]
        };

        classes[`border-${colorName}`] = {
            color: colors[colorName]
        };
    });

    return classes;
}