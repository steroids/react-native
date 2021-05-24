import React from 'react';
import { bem } from '@steroidsjs/core/hoc';
import { View, Text, TextProps } from 'react-native';
import { IBemHocOutput } from '@steroidsjs/core/hoc/bem';

interface IProps extends IBemHocOutput {
    label: string | boolean;
    hint: string | boolean;
    errors: string | string[] | false;
    required: boolean;
    layout: FormLayout;
    layoutProps: any;
    size: Size;
    layoutstyle: string | false;
    fieldTextProps: TextProps,
}

interface IState {}

@bem('FieldLayoutView')
export default class FieldLayoutView extends React.PureComponent <IProps, IState> {

    static defaultProps = {
        required: false,
        label: false,
        hint: false,
        errors: false,
        layout: {
            layout: 'default',
            cols: [5, 7],
        },
        size: 'md',
        layoutstyle: false,
    };

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(
                bem.block({
                    layout: this.props.layout.layout,
                    size: this.props.size,
                }),
                this.props.layout.layout === 'horizontal' && 'row',
                this.props.layoutstyle,
            )}>
                {this.props.label && (
                    <View style={bem(
                        bem.element('label', {
                            horizontal: this.props.layout.layout === 'horizontal',
                        }),
                        this.props.layout.layout === 'horizontal' && 'col-' + this.props.layout.cols[0],
                    )}>
                        <Text
                            {...this.props.fieldTextProps}
                            style={bem(bem.element('label-text'))}>
                            {this.props.label + ':'}
                            {this.props.required &&
                            <Text
                                {...this.props.fieldTextProps}
                                style={bem('text-error')}>*</Text>
                            }
                        </Text>
                    </View>
                )}
                <View
                    style={bem(
                        bem.element('field', {horizontal: this.props.layout.layout === 'horizontal'}),
                        this.props.layout.layout === 'horizontal' && 'col-' + this.props.layout.cols[1],
                        this.props.layout.layout === 'inline' && 'w-100',
                    )}
                >
                    {this.props.children}
                    {this.props.errors && (
                        <View style={bem(bem.element('invalid-feedback'))}>
                            {[].concat(this.props.errors).map((error, index) => (
                                <Text
                                    {...this.props.fieldTextProps}
                                    key={index}
                                    style={bem('text-error w-100')}>
                                    {error}
                                </Text>
                            ))}
                        </View>
                    )}
                    {!this.props.errors && this.props.layout.layout !== 'inline' && this.props.hint && (
                        <View>
                            <Text
                                {...this.props.fieldTextProps}
                                style={bem(bem.element('hint'))}>
                                {this.props.hint}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}
