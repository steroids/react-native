import * as React from 'react';
import { View, Text, TextProps } from 'react-native';
import useBemNative from '../../../hooks/useBemNative';

interface IProps {
    label: string | boolean;
    hint: string | boolean;
    errors: string | string[] | false;
    required: boolean;
    layout: any;
    layoutProps: any;
    size: Size;
    layoutstyle: string | false;
    fieldTextProps: TextProps,
}

const FieldLayoutView: React.FunctionComponent<React.PropsWithChildren<IProps>> = ({
   layout = {
       layout: 'default',
       cols: [5, 7],
   },
   size = 'md',
    ...props
}) => {
    const bem = useBemNative('FieldLayoutView');
    return (
        <View style={bem(
            bem.block({
                layout: layout.layout,
                size,
            }),
            layout.layout === 'horizontal' && 'row',
            layout.style,
        )}>
            {props.label && (
                <View style={bem(
                    bem.element('label', {
                        horizontal: layout.layout === 'horizontal',
                    }),
                    layout.layout === 'horizontal' && 'col-' + layout.cols[0],
                )}>
                    <Text
                        {...props.fieldTextProps}
                        style={bem(bem.element('label-text'))}>
                        {props.label + ':'}
                        {props.required &&
                        <Text
                            {...props.fieldTextProps}
                            style={bem('text-error')}>*</Text>
                        }
                    </Text>
                </View>
            )}
            <View
                style={bem(
                    bem.element('field', {horizontal: layout.layout === 'horizontal'}),
                    layout.layout === 'horizontal' && 'col-' + layout.cols[1],
                    layout.layout === 'inline' && 'w-100',
                )}
            >
                {props.children}
                {props.errors && (
                    <View style={bem(bem.element('invalid-feedback'))}>
                        {[].concat(props.errors).map((error, index) => (
                            <Text
                                {...props.fieldTextProps}
                                key={index}
                                style={bem('text-error w-100')}>
                                {error}
                            </Text>
                        ))}
                    </View>
                )}
                {!props.errors && layout.layout !== 'inline' && props.hint && (
                    <View>
                        <Text
                            {...props.fieldTextProps}
                            style={bem(bem.element('hint'))}>
                            {props.hint}
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default FieldLayoutView;
