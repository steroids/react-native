import React from 'react';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";
import {IDropDownFieldViewProps} from "@steroidsjs/core/ui/form/DropDownField/DropDownField";
import InputFieldView from "@steroidsjs/native/ui/form/InputField/InputFieldView";

import styles from './DropDownFieldViewStyles';
import {
    FlatList, Image,
    KeyboardAvoidingView, Modal, Platform,
    SafeAreaView, Text, TouchableNativeFeedback,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import ButtonView from "@steroidsjs/native/ui/form/Button/ButtonView";

interface IProps extends IDropDownFieldViewProps, IBemHocOutput {
    label: boolean | number,
    hint: string,
    required: boolean,
    placeholder: string,
    isInvalid: boolean,
    searchPlaceholder: string,
    size: Size,
    disabled: boolean,
    className: string,
    searchInputProps: object,
    searchAutoFocus: boolean,
    multiple: boolean,
    autoComplete: boolean,
}

interface IState {
    isOpened: boolean,
    selectedItems: Array<any>
}

@bem('DropDownFieldView', styles)
export default class DropDownFieldView extends React.PureComponent<IProps, IState> {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: this.props.isOpened || false,
            selectedItems: this.props.selectedItems || []
        }
    }

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
            <TouchableNativeFeedback onPress={() => this.onReset()}>
                <Image
                    style={bem(bem.element('reset-icon'))}
                    source={require('../../../assets/close-icon.png')}
                />
            </TouchableNativeFeedback>
        );
    }

    onReset() {
        this.setState({selectedItems: []});
    }

    onOpen() {
        this.setState({isOpened: true});
        this.props.onOpen && this.props.onOpen();
    }

    onItemClick(item) {
        this.selectItem(item);
        this.props.onItemClick && this.props.onItemClick(item);
    }

    selectItem(newItem) {
        if (this.props.multiple) {
            // remove from selected if it's there (tap on selected item handling)
            const itemIndex = this.state.selectedItems.findIndex((item) => newItem.id === item.id);

            if (itemIndex !== -1) {
                let newSelectedItems = [...this.state.selectedItems];
                newSelectedItems.splice(itemIndex, 1);
                this.setState({selectedItems: newSelectedItems});
            } else {
                this.setState({selectedItems: [
                    ...this.state.selectedItems,
                    newItem
                ]});
            }
        } else {
            this.setState({selectedItems: [newItem]});
            this.setState({isOpened: false});
        }
    }

    render() {
        const bem = this.props.bem;
        return (
            <View style={bem(bem.block())}>
                <TouchableWithoutFeedback
                    style={bem(bem.element('input'))}
                    onPress={() => !this.props.disabled && this.onOpen()}
                >
                    <View>
                        <InputFieldView
                            editable={false}
                            placeholder={this.props.placeholder}
                            suffixElement={this.state.selectedItems.length > 0 && this.props.showReset ? this.renderResetIcon() : this.renderArrowIcon()}
                            size={this.props.size}
                            value={this.state.selectedItems.map(item => item.label).join((' '))}
                            isInvalid={this.props.isInvalid}
                            disabled={this.props.disabled}
                        />
                    </View>
                </TouchableWithoutFeedback>
                {this.state.isOpened && (
                    <DropDownOptionsList
                        items={this.props.items}
                        selectedItems={this.state.selectedItems}
                        onCancel={() => this.setState({isOpened: false})}
                        onItemClick={item => this.onItemClick(item)}
                        searchInputProps={this.props.searchInputProps}
                        disabled={this.props.disabled}
                    />
                )}
            </View>
        );
    }
}

@bem('DropDownOptionsList')
class DropDownOptionsList extends React.PureComponent<any, any> {

    static defaultProps = {
        placeholderText: __('Поиск...'),
        cancelButtonText: __('Отмена'),
        noResultsText: __('Нет совпадений'),
        visible: true,
        keyboardShouldPersistTaps: 'never',
        selectedItems: [],
        items: [],
    };

    static keyExtractor(item, index) {
        return index
    }

    constructor(props, ctx) {
        super(props, ctx);

        this.state = {
            filter: "",
            ds: props.items,
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.items !== newProps.items) {
            this.setState({
                ds: newProps.items,
            })
        }
    }

    render() {
        const {
            renderList,
            renderCancelButton,
            visible,
            onCancel
        } = this.props;

        const bem = this.props.bem;
        return (
            <Modal
                onRequestClose={onCancel}
                visible={visible}
                supportedOrientations={['portrait', 'landscape']}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    style={bem(bem.element('overlay'))}
                    enabled={Platform.OS === 'ios'}
                >
                    <SafeAreaView style={bem(bem.block())}>
                        {(renderList || this.renderList)()}
                        <View style={bem(bem.element('cancel-container'))}>
                            {(renderCancelButton || this.renderCancelButton)()}
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </Modal>
        )
    }

    renderList = () => {
        const {placeholderText} = this.props;

        const bem = this.props.bem;
        const filter = (
            <View style={bem(bem.element('filter-container'))}>
                <InputFieldView
                    placeholder={placeholderText}
                    style={bem(bem.element('filter-text'))}
                    inputProps={this.props.searchInputProps}
                />
            </View>
        );

        return (
            <View style={bem(bem.element('list-container'))}>
                {filter}
                {this.renderOptionList()}
            </View>
        )
    };

    renderOptionList = () => {
        const {
            noResultsText,
            selectedItems,
            keyExtractor,
            keyboardShouldPersistTaps
        } = this.props;

        const { ds } = this.state;

        const bem = this.props.bem;
        if (!ds.length) {
            return (
                <FlatList
                    data={ds}
                    keyExtractor={keyExtractor || this.constructor.keyExtractor}
                    renderItem={() => (
                        <View style={bem(bem.element('no-results'))}>
                            <Text style={bem(bem.element('no-results-text'))}>
                                {noResultsText}
                            </Text>
                        </View>
                    )}
                />
            )
        }
        return (
            <FlatList
                keyExtractor={keyExtractor || this.constructor.keyExtractor}
                data={ds}
                extraData={selectedItems}
                renderItem={this.renderOption}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            />
        )
    };

    isSelected(checkingItem) {
        return Boolean(this.props.selectedItems.find(item => item.id === checkingItem.id));
    }

    renderOption = ({ item }) => {
        const bem = this.props.bem;
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={bem(bem.element('option', {selected: this.isSelected(item)}))}
                onPress={() => this.props.onItemClick(item)}
            >
                <Text style={bem(bem.element('option-text'))}>
                    {item.label}
                </Text>
            </TouchableOpacity>
        )
    };

    renderCancelButton = () => {
        const {cancelButtonText} = this.props;

        const bem = this.props.bem;
        return (
            <ButtonView
                onClick={this.props.onCancel}
                size={'md'}
                outline={true}
                color={'white'}
                style={bem(bem.element('cancel'))}
            >
                {cancelButtonText}
            </ButtonView>
        )
    };
}

