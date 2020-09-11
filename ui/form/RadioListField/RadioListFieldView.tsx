import React from 'react'
import {Text, View} from "react-native";
import {bem} from "@steroidsjs/core/hoc";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {IRadioListFieldViewProps} from "@steroidsjs/core/ui/form/RadioListField/RadioListField";
import styles from './RadioFieldListViewStyles'
import Touchable from "../../../utils/Touchable";

@bem('RadioListFieldView', styles)
export default class RadioListFieldView extends React.PureComponent <IRadioListFieldViewProps & IBemHocOutput> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                {this.props.items.map(item => (
                    <Touchable onPress={() => this.props.onItemClick(item)}>
                        <View style={bem(bem.element('item'), item.isSelected && {backgroundColor: '#0084FF'})}>
                            <Text style={bem.element('label')}>{item.label}</Text>
                        </View>
                    </Touchable>
                ))}
            </View>
        )
    }
}