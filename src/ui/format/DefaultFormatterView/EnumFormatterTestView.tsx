import {Text} from 'react-native';
import * as React from 'react';

interface IProps {
    value: string | number
}

export default class EnumFormatterTestView extends React.PureComponent<IProps> {
    render() {
        return <Text>123 !! {this.props.value} !! 123</Text>;
    }
}
