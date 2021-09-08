import React from 'react';
import bem, { IBemHocOutput } from '../../../hoc/bemNative';
import { View } from 'react-native';
import { IFieldListItemViewProps } from '@steroidsjs/core/ui/form/FieldList/FieldList';
import ButtonView from '../Button';

interface IProps extends IFieldListItemViewProps, IBemHocOutput {
    renderField: any;
}

@bem('FieldListItemView')
export default class FieldListItemView extends React.PureComponent<IProps> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block(), 'row')}>
                <View style={bem(`col-${this.props.showRemove ? 11 : 12}`)}>
                    {this.props.items.map((field, index) => (
                        <View
                            key={index}
                            style={bem(
                                bem.element('field'),
                                field.className,
                            )}
                        >
                            {this.props.renderField(field, this.props.prefix)}
                        </View>
                    ))}
                </View>
                {this.props.showRemove && (
                    <View style={bem('col-1')}>
                        {(!this.props.required || this.props.rowIndex > 0) && (
                            <ButtonView
                                showLabelOnLoading
                                style={bem(bem.element('remove-btn'))}
                                icon="closeIcon"
                                onClick={() => this.props.onRemove(this.props.rowIndex)}
                                color={'transparent'}
                                size={'sm'}
                            />
                        )}
                    </View>
                )}
            </View>
        );
    }
}
