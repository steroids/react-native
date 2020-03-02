import React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {View, Text} from "react-native";
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";

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

@bem('FieldLayoutView')
export default class FieldLayoutView extends React.PureComponent <IProps, IState> {

    static defaultProps = {
        required: false,
        label: false,
        hint: false,
        errors: false,
        layout: 'default',
        layoutProps: null,
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
                this.props.layout === 'inline' && 'form-inline mb-0'
            )}>
                {this.props.label && (
                    <Text style={bem(
                        bem.element('label', {
                            required: this.props.required
                        }),
                        this.props.layout === 'horizontal' && 'col-form-label text-right',
                        this.props.layout === 'horizontal' && 'col-' + this.props.layoutProps.cols[0],
                        this.props.layout === 'inline' && 'sr-only',
                    )}>
                        {this.props.label + ':'}
                    </Text>
                )}
                <View
                    style={bem(
                        bem.element('field'),
                        this.props.layout === 'horizontal' && 'col-' + this.props.layoutProps.cols[1],
                        this.props.layout === 'horizontal' && !this.props.label && 'offset-' + this.props.layoutProps.cols[0],
                        this.props.layout === 'inline' && 'w-100'
                    )}
                >
                    {this.props.children}
                    {this.props.errors && (
                        <View style={bem(bem.element('invalid-feedback'), 'invalid-feedback')}>
                            {[].concat(this.props.errors).map((error, index) => (
                                <View key={index}>
                                    <Text style={bem('invalid-feedback-text')}>{error}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                    {!this.props.errors && this.props.layout !== 'inline'  && this.props.hint && (
                        <View style={bem(bem.element('hint'), 'text-muted')}>
                            <Text>{this.props.hint}</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
