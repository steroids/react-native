import React from 'react';
import PropTypes from 'prop-types';

import {bem} from '@steroidsjs/core/hoc';
import {View, Text} from "react-native";

@bem('FieldLayoutView')
export default class FieldLayoutView extends React.PureComponent <any, any> {

    static propTypes = {
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        hint: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
        errors: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string),
        ]),
        required: PropTypes.bool,
        layout: PropTypes.oneOfType([
            PropTypes.oneOf(['default', 'inline', 'horizontal']),
            PropTypes.string,
            PropTypes.bool,
        ]),
        layoutProps: PropTypes.object,
        size: PropTypes.oneOf(['sm', 'md', 'lg']),
        layoutstyle: PropTypes.string,
    };

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(
                bem.block({
                    layout: this.props.layout
                }),
                'form-group',
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
