import React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {View, Text} from "react-native";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import styles from "./FieldLayoutViewStyles";

type LayoutsTypes = 'default' | 'horizontal' | 'inline';

interface IProps extends IBemHocOutput{
    label: string | boolean;
    hint: string | boolean;
    errors: string | string[] | false;
    required: boolean;
    layout: LayoutsTypes;
    layoutProps: any;
    size: Size;
    // TODO, probably not needed
    layoutstyle: string | false;
}

interface IState {}

@bem('FieldLayoutView', styles)
export default class FieldLayoutView extends React.PureComponent <IProps, IState> {

    static defaultProps = {
        required: false,
        label: false,
        hint: false,
        errors: false,
        layout: 'default',
        layoutProps: {
            cols: [5, 7]
        },
        size: 'md',
        layoutstyle: false
    };

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(
                bem.block({
                    layout: this.props.layout
                }),
                this.props.layoutstyle,
                this.props.layout === 'horizontal' && 'row',
            )}>
                {this.props.label && (
                    <View style={bem(
                        bem.element('label', {
                            horizontal: this.props.layout === 'horizontal'
                        }),
                        this.props.layout === 'horizontal' && 'col-' + this.props.layoutProps.cols[0],
                    )}>
                        <Text style={bem(bem.element('label-text'))}>
                            {this.props.label + ':'}
                            {this.props.required &&
                                <Text style={bem('text-danger')}>*</Text>
                            }
                        </Text>
                    </View>
                )}
                <View
                    style={bem(
                        bem.element('field', {horizontal: this.props.layout === 'horizontal'}),
                        this.props.layout === 'horizontal' && 'col-' + this.props.layoutProps.cols[1],
                        this.props.layout === 'inline' && 'w-100'
                    )}
                >
                    {this.props.children}
                    {this.props.errors && (
                        <View style={bem(bem.element('invalid-feedback'))}>
                            {[].concat(this.props.errors).map((error, index) => (
                                <Text key={index} style={bem('text-danger w-100')}>{error}</Text>
                            ))}
                        </View>
                    )}
                    {!this.props.errors && this.props.layout !== 'inline' && this.props.hint && (
                        <View>
                            <Text style={bem(bem.element('hint'))}>{this.props.hint}</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
