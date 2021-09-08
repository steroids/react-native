import * as React from 'react';
import { Text, TextProps, View } from 'react-native';
import { IBemHocOutput } from '@steroidsjs/core/hoc/bem';
import { ICheckboxListFieldViewProps } from '@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField';
import bem from '../../../hoc/bemNative';
import Touchable from '../../../utils/Touchable';

interface IProps extends ICheckboxListFieldViewProps, IBemHocOutput {
    textProps: TextProps,
}

@bem('CheckboxListFieldView')
export default class CheckboxListFieldView extends React.PureComponent <IProps> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                {this.props.items.map(item => (
                    <Touchable
                        onPress={() => this.props.onItemClick(item)}
                    >
                        <View style={bem.element('item', {selected: item.isSelected})}>
                            <Text {...this.props.textProps} style={bem.element('label')}>
                                {item.label}
                            </Text>
                        </View>
                    </Touchable>
                ))}
            </View>
        );
    }
}
