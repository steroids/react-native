import React from "react";
import {Text, View} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import {bem} from "../../../../react/hoc";
import {IBemHocOutput} from "../../../../react/hoc/bem";
import {ICheckboxFieldProps} from "../../../../react/ui/form/CheckboxField/CheckboxField";
import styles from './CheckboxFieldViewStyles'
import Touchable from "../../../utils/Touchable/Touchable";

@bem('CheckboxFieldView', styles)
export default class CheckboxFieldView extends React.PureComponent <ICheckboxFieldProps & IBemHocOutput> {
    render() {
        const bem = this.props.bem;
        const {onChange, checked} = this.props.inputProps;
        return (
            <View style={bem.block()}>
                <CheckBox
                    value={checked}
                    onValueChange={onChange}
                    tintColors={{true: '#0085FF', false: '#0085FF'}}
                />
                <Touchable onPress={onChange}>
                    <Text style={bem.element('label')}>{this.props.label}</Text>
                </Touchable>
            </View>
        )
    }
}