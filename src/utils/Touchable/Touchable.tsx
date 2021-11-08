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

const Touchable: React.FunctionComponent<IProps> = (props) => {
    const Touchable = Platform.select<any>({
        android: TouchableNativeFeedback,
        ios: TouchableHighlight,
        default: TouchableHighlight,
    });

    return (
        <Touchable {...props}>
            {props.children}
        </Touchable>
    );
};

Touchable.defaultProps = {
    delayPressIn: 0,
    useForeground: true,
    background: TouchableNativeFeedback.Ripple('#adb5bd', false),
    underlayColor: '#adb5bd',
    activeOpacity: 0.75,
};

export default Touchable;
