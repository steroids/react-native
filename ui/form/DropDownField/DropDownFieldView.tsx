import React from 'react';
import { bem } from '@steroidsjs/core/hoc';
import { IBemHocOutput } from '@steroidsjs/core/hoc/bem';
import { IDropDownFieldViewProps } from '@steroidsjs/core/ui/form/DropDownField/DropDownField';
import InputFieldView from '../../form/InputField/InputFieldView';
import OptionsList from '../..//shared/OptionsList';

import {
    Image, TextInputProps, TouchableNativeFeedback,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

interface IProps extends IDropDownFieldViewProps, IBemHocOutput {
    inputProps: TextInputProps,
}

@bem('DropDownFieldView')
export default class DropDownFieldView extends React.PureComponent<IProps> {

    static defaultProps = {
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

    renderArrowIcon() {
        const bem = this.props.bem;
        return (
            <Image
                style={bem(bem.element('arrow-icon'))}
                source={require('../../../assets/arrow-down.png')}
            />
        );
    }

    renderResetIcon() {
        const bem = this.props.bem;
        return (
            <TouchableNativeFeedback onPress={() => this.props.onReset()}>
                <Image
                    style={bem(bem.element('reset-icon'))}
                    source={require('../../../assets/close-icon.png')}
                />
            </TouchableNativeFeedback>
        );
    }

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block(), this.props.style)}>
                <TouchableWithoutFeedback
                    style={bem(bem.element('input'))}
                    onPress={() => !this.props.disabled && this.props.onOpen()}
                >
                    <View>
                        <InputFieldView
                            editable={false}
                            placeholder={this.props.placeholder}
                            suffixElement={
                                this.props.selectedItems.length > 0 && this.props.showReset
                                    ? this.renderResetIcon()
                                    : this.renderArrowIcon()
                            }
                            size={this.props.size}
                            value={this.props.selectedItems.map(item => item.label).join((' '))}
                            isInvalid={this.props.isInvalid}
                            disabled={this.props.disabled}
                            inputProps={this.props.inputProps}
                        />
                    </View>
                </TouchableWithoutFeedback>

                {this.props.isOpened && (
                    <OptionsList
                        items={this.props.items}
                        selectedItems={this.props.selectedItems}
                        onClose={this.props.onClose}
                        onItemClick={item => this.props.onItemClick(item)}
                        searchInputProps={this.props.searchInputProps}
                        inputFieldIcon={require('../../../assets/search-icon.png')}
                        appearanceType={'fade'}
                    />
                )}
            </View>
        );
    }
}