import React from 'react';
import {
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableHighlightProps,
    TouchableNativeFeedbackProps} from 'react-native';

export default class Touchable extends React.PureComponent <TouchableHighlightProps & TouchableNativeFeedbackProps> {
    render() {
        let Touchable;
        switch (Platform.OS) {
            case "android":
                Touchable = TouchableNativeFeedback;
                break
            case "ios":
            default:
                Touchable = TouchableHighlight;

        }
        return (
            <Touchable {...this.props}>
                {this.props.children}
            </Touchable>
        )
    }
}