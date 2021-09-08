import color from 'color'

export default (bgColor: string, lightColor: string, darkColor: string) => {
    const isDark = bgColor === 'transparent'
        ? false
        : !color(bgColor).isLight();

    return isDark ? lightColor : darkColor;
};