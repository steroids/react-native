import * as React from 'react';
import {
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableHighlightProps,
    TouchableNativeFeedbackProps,
} from 'react-native';

interface IProps
    extends TouchableHighlightProps,
        TouchableNativeFeedbackProps {}

export const defaultTouchableOptions = {
    delayPressIn: 0,
    useForeground: true,
    background: TouchableNativeFeedback.Ripple('#007bff', false),
    underlayColor: '#00e5ff',
    activeOpacity: 0.75,
};

export default function Touchable(props: React.PropsWithChildren<IProps>) {
    const Touchable = Platform.select<any>({
        android: TouchableNativeFeedback,
        ios: TouchableHighlight,
        default: TouchableHighlight,
    });

    return (
        <Touchable {...defaultTouchableOptions} {...props}>
            {props.children}
        </Touchable>
    );
};
