import React, {ReactNode} from "react";
import {bem} from '@steroidsjs/core/hoc';
import {Text, View} from "react-native";
import ButtonView from "../Button";

import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {IFieldListViewProps} from "@steroidsjs/core/ui/form/FieldList/FieldList";

interface IProps extends IFieldListViewProps, IBemHocOutput{
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
    onAdd: () => void,
    renderField: () => void,
    disabled: boolean,
    className: string,
}

@bem('FieldListView')
export default class FieldListView extends React.PureComponent<IProps> {
    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block(), this.props.style)}>
                <View style={bem(bem.element('items'))}>
                    <View style={bem('row')}>
                        {this.props.items.map((field, rowIndex) => (
                            <View
                                key={rowIndex}
                                style={bem(
                                    bem.element('table-cell-header'),
                                    field.headerClassName
                                )}
                            >
                                <Text>{field.label}</Text>
                            </View>
                        ))}
                    </View>
                    <View>
                        {this.props.children}
                    </View>
                </View>
                {this.props.showAdd && !this.props.disabled && (
                    <ButtonView
                        style={bem.element('add-btn')}
                        onClick={e => {
                            e.preventDefault();
                            this.props.onAdd(e);
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
    }
}