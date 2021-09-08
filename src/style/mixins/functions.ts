import Color from 'color';

export const getScreens = (breakpoints, size) => (
    // ascending list of screens ("active" breakpoints)
    Object.keys(breakpoints)
        .sort((a, b) => (breakpoints[a] > breakpoints[b] ? 1 : -1))
        .map(item => [item, breakpoints[item]])
        .filter(item => item[1] <= size)
        .map(item => item[0])
);

export const colorLevel = (variables, color, level = 0) => (
    Color(color || variables.primary).mix(
        Color(level > 0 ? variables.black : variables.white),
        Math.abs(level) * variables.themeColorInterval,
    ).hex()
);