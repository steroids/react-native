import * as React from 'react';

import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {StyleProp, View} from "react-native";

interface IProps extends IBemHocOutput{
    label: boolean | string,
    hint: boolean | string,
    required: boolean,
    isInvalid: boolean,
    layout: FormLayout,
    size: Size,
    onSubmit?: (...args: any[]) => any;
    style?: StyleProp<any>
}

@bem('FormView')
export default class FormView extends React.PureComponent<IProps> {
    render() {
        const bem = this.props.bem;
        return (
            <View
                style={bem(
                    bem.block(),
                    this.props.style,
                )}
            >
                {this.props.children}
            </View>
        );
    }

}
