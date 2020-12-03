import React from "react";
import {Text, View, Switch, StyleProp} from "react-native";
import {bem} from "@steroidsjs/core/hoc";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {ICheckboxFieldProps} from "@steroidsjs/core/ui/form/CheckboxField/CheckboxField";
import Touchable from "../../../utils/Touchable/Touchable";

interface IProps extends ICheckboxFieldProps, IBemHocOutput {
    stylesContainer: any
    stylesText: any
}

@bem('CheckboxFieldView')
export default class CheckboxFieldView extends React.PureComponent <IProps> {
    render() {
        const bem = this.props.bem;
        const {onChange, checked} = this.props.inputProps;
        return  (
            <View style={bem(bem.block(), this.props.stylesContainer)}>
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
                    <Text style={bem(bem.element('label'), this.props.stylesText)}>
                        {this.props.label}
                    </Text>
                </Touchable>
            </View>
            )
    }
}