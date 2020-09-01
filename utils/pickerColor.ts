import color from 'color'

interface PickerColorProps {
    bgColor: string
    lightColor: string
    darkColor: string
}

export const pickerColor = ({bgColor, lightColor, darkColor}: PickerColorProps) => {

    const isDark = bgColor === 'transparent'
        ? false
        : !color(bgColor).isLight()

    return isDark ? lightColor : darkColor;

}