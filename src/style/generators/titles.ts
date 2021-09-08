export default function (variables) {
    const titleSizes = [1, 2, 3, 4, 5, 6];

    let classes = {};

    titleSizes.map((size) => {
        classes[`h${size}`] = {
            fontSize: variables[`h${size}FontSize`],
            marginTop: variables.headingsMarginBottom,
            marginBottom: variables.headingsMarginTop,
            fontFamily: variables.headingsFontFamily,
            fontWeight: variables.headingsFontWeight,
            color: variables.headingsColor,
        };
    });

    return classes;
}