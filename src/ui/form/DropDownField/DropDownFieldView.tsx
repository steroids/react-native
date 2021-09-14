import * as React from 'react';
import { IDropDownFieldViewProps } from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import InputFieldView from '../InputField/InputFieldView';
import OptionsList from '../..//shared/OptionsList';
import {
    Image, TextInputProps, TouchableNativeFeedback,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends IDropDownFieldViewProps {
    inputProps: TextInputProps,
    items: any,
}

const DropDownFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('DropDownFieldView');

    const renderArrowIcon = () => {
        const bem = props.bem;
        return (
            <Image
                style={bem(bem.element('arrow-icon'))}
                source={require('../../../assets/arrow-down.png')}
            />
        );
    };

    const renderResetIcon = () => {
        const bem = props.bem;
        return (
            <TouchableNativeFeedback onPress={() => props.onReset()}>
                <Image
                    style={bem(bem.element('reset-icon'))}
                    source={require('../../../assets/close-icon.png')}
                />
            </TouchableNativeFeedback>
        );
    };

    return (
        <View style={bem(bem.block(), props.style)}>
            <TouchableWithoutFeedback
                style={bem(bem.element('input'))}
                onPress={() => !props.disabled && props.onOpen()}
            >
                <View>
                    <InputFieldView
                        autoFocus={false}
                        editable={false}
                        placeholder={props.placeholder}
                        suffixElement={
                            props.selectedItems.length > 0 && props.showReset
                                ? renderResetIcon()
                                : renderArrowIcon()
                        }
                        size={props.size}
                        value={props.selectedItems.map(item => item.label).join((' '))}
                        isInvalid={props.isInvalid}
                        disabled={props.disabled}
                        inputProps={props.inputProps}
                    />
                </View>
            </TouchableWithoutFeedback>

            {props.isOpened && (
                <OptionsList
                    items={props.items}
                    selectedItems={props.selectedItems}
                    onClose={props.onClose}
                    onItemClick={item => props.onItemClick(item)}
                    searchInputProps={props.searchInputProps}
                    inputFieldIcon={require('../../../assets/search-icon.png')}
                    appearanceType={'fade'}
                />
            )}
        </View>
    );
};

DropDownFieldView.defaultProps = {
    label: null,
    hint: null,
    required: false,
    placeholder: null,
    isInvalid: false,
    searchPlaceholder: null,
    size: 'md',
    disabled: false,
    className: '',
    searchInputProps: null,
    searchAutoFocus: false,
    multiple: false,
    autoComplete: false,
    inputProps: null,
};

export default DropDownFieldView;
