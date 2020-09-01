import React from "react";
import {Text, View, CheckBox} from "react-native";
import {bem} from "../../../../react/hoc";
import {IBemHocOutput} from "../../../../react/hoc/bem";

@bem('CheckboxFieldView')
export default class CheckboxFieldView extends React.PureComponent <IBemHocOutput> {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        }
    }

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem.block()}>
                <CheckBox value={this.state.isSelected} onValueChange={value => console.log(value)}>MyCheckBox</CheckBox>
            </View>
        )
    }
}