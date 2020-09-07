import React from 'react'
import {Text, TouchableNativeFeedback, View} from "react-native";
import {bem} from "../../../../react/hoc";
import {IBemHocOutput} from "../../../../react/hoc/bem";
import {IRadioListFieldViewProps} from "../../../../react/ui/form/RadioListField/RadioListField";
import styles from './RadioFieldListViewStyles'

@bem('RadioListFieldView', styles)
export default class RadioListFieldView extends React.PureComponent <IRadioListFieldViewProps & IBemHocOutput> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                {this.props.items.map(item => (
                    <TouchableNativeFeedback onPress={() => this.props.onItemClick(item)}>
                        <View style={bem(bem.element('item'), item.isSelected && {backgroundColor: '#0084FF'})}>
                            <Text style={bem.element('text')}>{item.label}</Text>
                        </View>
                    </TouchableNativeFeedback>
                ))}
            </View>
        )
    }
}