import React from "react";
import {Text, View, Switch} from "react-native";
import {bem} from "@steroidsjs/core/hoc";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {ICheckboxFieldProps} from "@steroidsjs/core/ui/form/CheckboxField/CheckboxField";
import Touchable from "../../../utils/Touchable/Touchable";

@bem('CheckboxFieldView')
export default class CheckboxFieldView extends React.PureComponent <ICheckboxFieldProps & IBemHocOutput> {
    render() {
        const bem = this.props.bem;
        const {onChange, checked} = this.props.inputProps;
        return  (
            <View style={bem.block()}>
                <Switch
                    trackColor={{
                        false: bem.variable('trackSelectedFalseBg'),
                        true: bem.variable('trackSelectedTrueBg')
                    }}
                    thumbColor={checked ? bem.variable('thumbSelectedTrueBg') : bem.variable('thumbSelectedFalseBg')}
                    onValueChange={onChange}
                    value={checked}
                />
                <Touchable onPress={onChange}>
                    <Text style={bem.element('label')}>
                        {this.props.label}
                    </Text>
                </Touchable>
            </View>
            )
    }
}