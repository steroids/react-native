import React from 'react';
import { View } from 'react-native';
import { IFieldListItemViewProps } from '@steroidsjs/core/ui/form/FieldList/FieldList';
import ButtonView from '../Button';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends IFieldListItemViewProps {
    renderField: any;
}

const FieldListItemView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('FieldListItemView');

    return (
        <View style={bem(bem.block(), 'row')}>
            <View style={bem(`col-${props.showRemove ? 11 : 12}`)}>
                {props.items.map((field, index) => (
                    <View
                        key={index}
                        style={bem(
                            bem.element('field'),
                            field.className,
                        )}
                    >
                        {props.renderField(field, props.prefix)}
                    </View>
                ))}
            </View>
            {props.showRemove && (
                <View style={bem('col-1')}>
                    {(!props.required || props.rowIndex > 0) && (
                        <ButtonView
                            style={bem(bem.element('remove-btn'))}
                            icon="closeIcon"
                            onClick={() => props.onRemove(props.rowIndex)}
                            color={'transparent'}
                            size={'sm'}
                        />
                    )}
                </View>
            )}
        </View>
    );
};

export default FieldListItemView;
