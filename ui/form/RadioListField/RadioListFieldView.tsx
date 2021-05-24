import React from 'react';
import { Text, View, TextProps } from 'react-native';
import { bem } from '@steroidsjs/core/hoc';
import { IBemHocOutput } from '@steroidsjs/core/hoc/bem';
import { IRadioListFieldViewProps } from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import styles from './RadioFieldListViewStyles';
import Touchable from '../../../utils/Touchable';

interface IProps extends IRadioListFieldViewProps, IBemHocOutput {
    textProps: TextProps,
}

@bem('RadioListFieldView')
export default class RadioListFieldView extends React.PureComponent <IProps> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                <View style={bem.element('group')}>
                    {this.props.items.map(item => (
                        <Touchable
                            key={item.id}
                            onPress={() => this.props.onItemClick(item)}
                        >
                            <View style={bem(bem.element('item'), item.isSelected && {backgroundColor: '#0084FF'})}>
                                <Text {...this.props.textProps} style={bem.element('label')}>{item.label}</Text>
                            </View>
                        </Touchable>
                    ))}
                </View>
            </View>
        );
    }
}