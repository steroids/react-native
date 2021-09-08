import * as React from 'react';

import bem, { IBemHocOutput } from '../../../hoc/bemNative';
import { Text, View } from 'react-native';

import styles from './DetailViewStyles';

interface IProps extends IBemHocOutput {
    styles: any,
    items?: any,
}

@bem('DetailView', styles)
export default class DetailView extends React.PureComponent<IProps> {
    renderSafely(value, attributes = {}) {
        return !(React.isValidElement(value) || typeof value === 'function')
            ? <Text {...attributes}>{value}</Text>
            : value;
    }

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block(), this.props.styles)}>
                {this.props.items && this.props.items.map((item, index) => (
                    <View
                        key={item.attribute || index}
                        style={bem(bem.element('field-container'), 'row', this.props.styles)}
                    >
                        <View style={bem('col-5')}>
                            {this.renderSafely(item.label, {style: bem(bem.element('field-label'))})}
                        </View>
                        <View style={bem('col-7')}>
                            {this.renderSafely(item.value)}
                        </View>
                    </View>
                ))}
            </View>
        );
    }
}
