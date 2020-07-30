import {Text} from 'react-native';
import React from 'react';

interface IProps {
    value: string | number
}

export default class DefaultFormatterView extends React.PureComponent<IProps> {
    render() {
        return <Text>{this.props.value}</Text>;
    }
}