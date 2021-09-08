export default custom => {
    let customThemeColors = custom.themeColors;
    let customColors = custom.colors;

    let palette = {
        colors: {
            // Colors
            white: '#fff',
            gray100: '#f8f9fa',
            gray200: '#e9ecef',
            gray300: '#dee2e6',
            gray400: '#ced4da',
            gray500: '#adb5bd',
            gray600: '#6c757d',
            gray700: '#495057',
            gray800: '#343a40',
            gray900: '#212529',
            black: '#000',
            blue: '#007bff',
            cyan: '#17a2b8',
            red: '#dc3545',
            yellow: '#ffc107',
            green: '#28a745',
            indigo: '#6610f2',
            purple: '#6f42c1',
            pink: '#e83e8c',
            orange: '#fd7e14',
            teal: '#20c997',

            ...customColors,
        },
        themeColors: {},
    };

    palette.colors = {
        error: palette.colors.red,
        ...palette.colors,
    },

        palette.colors = {
            ...palette.colors,

            grays: {
                '100': palette.colors.gray100,
                '200': palette.colors.gray200,
                '300': palette.colors.gray300,
                '400': palette.colors.gray400,
                '500': palette.colors.gray500,
                '600': palette.colors.gray600,
                '700': palette.colors.gray700,
                '800': palette.colors.gray800,
                '900': palette.colors.gray900,
            },
            primary: palette.colors.blue,
            secondary: palette.colors.gray600,
            success: palette.colors.green,
            info: palette.colors.cyan,
            warning: palette.colors.yellow,
            danger: palette.colors.red,
            light: palette.colors.gray100,
            dark: palette.colors.gray800,
        };

    palette.themeColors = {
        primary: palette.colors.primary,
        secondary: palette.colors.secondary,
        success: palette.colors.success,
        info: palette.colors.info,
        warning: palette.colors.warning,
        danger: palette.colors.danger,
        light: palette.colors.light,
        dark: palette.colors.dark,

        ...customThemeColors,
    };

    return palette;
}