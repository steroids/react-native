import * as React from 'react';
import { Text, View, TextProps } from 'react-native';
import bem, { IBemHocOutput } from '../../../hoc/bemNative';
import { IRadioListFieldViewProps } from '@steroidsjs/core/ui/form/RadioListField/RadioListField';
import styles from './RadioFieldListViewStyles';
import Touchable from '../../../utils/Touchable';

interface IProps extends IRadioListFieldViewProps, IBemHocOutput {
    textProps: TextProps,
    onItemClick: (item: any) => void,
}

@bem('RadioListFieldView', styles)
export default class RadioListFieldView extends React.PureComponent <IProps> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                <View style={bem.element('group')}>
                    {this.props.items.map(item => (
                        <Touchable
                            key={item.id.toString()}
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
