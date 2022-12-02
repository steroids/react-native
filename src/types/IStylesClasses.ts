import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export interface IStylesClasses {
    [key: string]: ViewStyle | TextStyle | ImageStyle,
}
