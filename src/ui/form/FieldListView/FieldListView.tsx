import React, { ReactNode, PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import ButtonView from '../Button';
import useBemNative from '../../../hooks/useBemNative';

interface IProps {
    label: string | boolean,
    hint: string,
    size: Size,
    required: boolean,
    items: {
        label: string | boolean | ReactNode,
        hint: string | boolean | ReactNode,
        attribute: string,
        prefix: string,
        model: string | object | (() => void),
        component: any, // TODO
        required: boolean,
        size: Size,
        placeholder: string,
        disabled: boolean,
        onChange: () => void,
        className: string,
        headerClassName: string,
        view: ReactNode,
    }[],
    showAdd: boolean,
    showRemove: boolean,
    onAdd: (e: any) => void,
    renderField: () => void,
    disabled: boolean,
    className: string,
    style: any;
}

const FieldListView: React.FunctionComponent<PropsWithChildren<IProps>> = (props) => {
    const bem = useBemNative('FieldListView');
    return (
        <View style={bem(bem.block(), props.style)}>
            <View style={bem(bem.element('items'))}>
                <View style={bem('row')}>
                    {props.items.map((field, rowIndex) => (
                        <View
                            key={rowIndex}
                            style={bem(
                                bem.element('table-cell-header'),
                                field.headerClassName,
                            )}
                        >
                            <Text>{field.label}</Text>
                        </View>
                    ))}
                </View>
                <View>
                    {props.children}
                </View>
            </View>
            {props.showAdd && !props.disabled && (
                <ButtonView
                    style={bem.element('add-btn')}
                    onClick={(e) => {
                        e.preventDefault();
                        props.onAdd(e);
                    }}
                    size={'sm'}
                    color={'transparent'}
                    textColor={'blue'}
                >
                    <Text>{__('Добавить ещё')}</Text>
                </ButtonView>
            )}
        </View>
    );
};

export default FieldListView;
