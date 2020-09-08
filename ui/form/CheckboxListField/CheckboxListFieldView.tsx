import React from "react";
import {Text, View} from "react-native";
import {IBemHocOutput} from "../../../../react/hoc/bem";
import {ICheckboxListFieldViewProps} from "../../../../react/ui/form/CheckboxListField/CheckboxListField";
import {bem} from "../../../../react/hoc";
import styles from './CheckboxListFieldViewStyles'
import Touchable from "../../../utils/Touchable";

@bem('CheckboxListFieldView', styles)
export default class CheckboxListFieldView extends React.PureComponent <ICheckboxListFieldViewProps & IBemHocOutput> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                {this.props.items.map(item => (
                    <Touchable onPress={() => this.props.onItemClick(item)}>
                        <View style={bem(bem.element('item'), item.isSelected && {backgroundColor: '#0085FF'})}>
                            <Text style={bem.element('text')}>{item.label}</Text>
                        </View>
                    </Touchable>
                ))}
            </View>
        )
    }
}