import React from "react";

import bem from '../../../hoc/bemNative';
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {IDateTimeFieldViewProps} from "@steroidsjs/core/ui/form/DateTimeField/DateTimeField";
import {View} from "react-native";

interface IProps extends IDateTimeFieldViewProps, IBemHocOutput {}
interface IState {}

@bem('DateTimeFieldView')
export default class DateTimeFieldView extends React.PureComponent<IProps, IState> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block(), 'row', this.props.style)}>
                <View style={bem(bem.element('date'), 'col-7')}>
                    {this.props.dateField}
                </View>
                <View style={bem(bem.element('time'), 'col-5')}>
                    {this.props.timeField}
                </View>
            </View>
        );
    }
}
