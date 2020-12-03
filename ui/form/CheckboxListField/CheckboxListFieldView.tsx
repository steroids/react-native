import React from "react";
import {Text, View} from "react-native";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {ICheckboxListFieldViewProps} from "@steroidsjs/core/ui/form/CheckboxListField/CheckboxListField";
import {bem} from "@steroidsjs/core/hoc";
import Touchable from "../../../utils/Touchable";

@bem('CheckboxListFieldView')
export default class CheckboxListFieldView extends React.PureComponent <ICheckboxListFieldViewProps & IBemHocOutput> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                {this.props.items.map(item => (
                    <Touchable onPress={() => this.props.onItemClick(item)}>
                        <View style={bem.element('item', {selected: item.isSelected})}>
                            <Text style={bem.element('label')}>
                                {item.label}
                            </Text>
                        </View>
                    </Touchable>
                ))}
            </View>
        )
    }
}