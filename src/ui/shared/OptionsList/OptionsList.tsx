import {bem} from "@steroidsjs/core/hoc";
import React, {ReactNode} from "react";
import {
    FlatList, ImageSourcePropType,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import InputFieldView from "../../form/InputField/InputFieldView";
import ButtonView from "../../form/Button/ButtonView";
import styles from './OptionsListStyles';
import {IBemHocOutput} from "@steroidsjs/core/hoc/bem";

interface IProps extends IBemHocOutput {
    items: {
        id: number | string | boolean,
        label?: string,
        isSelected: boolean,
        isHovered: boolean,
    }[];
    selectedItems?: {
        id: number | string | boolean,
        label?: string
    }[];
    onClose: () => void,
    onItemClick: (item: any) => void,
    placeholderText: string,
    searchInputProps: {
        type: string,
        name: string,
        onChange: (value: string) => void,
        value: string | number,
        placeholder: string,
        disabled: string,
    },
    noResultsText: string,
    cancelButtonText: string
    readyButtonText: string,
    inputFieldIcon: ImageSourcePropType | ReactNode,
    selectRequired: boolean,
    appearanceType: 'fade' | 'slide' | 'none',
    focusInputOnOpen: boolean
}

@bem('OptionsList', styles)
export default class OptionsList extends React.PureComponent<IProps> {

    static defaultProps = {
        placeholderText: __('Поиск...'),
        cancelButtonText: __('Отмена'),
        readyButtonText: __('Готово'),
        noResultsText: __('Нет совпадений'),
        inputFieldIcon: null,
        visible: true,
        selectedItems: [],
        items: [],
        selectRequired: true,
        appearanceType: 'none',
        focusInputOnOpen: false
    };

    static keyExtractor(item, index) {
        return index.toString();
    }

    render() {
        const {onClose} = this.props;

        const bem = this.props.bem;
        return (
            <Modal
                onRequestClose={onClose}
                supportedOrientations={['portrait', 'landscape']}
                animationType={this.props.appearanceType}
                transparent={true}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    style={bem(bem.element('overlay1'))}
                    enabled={Platform.OS === 'ios'}
                >

                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={bem(bem.element('overlay2'))} />
                    </TouchableWithoutFeedback>

                    <SafeAreaView style={bem(bem.block())}>
                        {this.renderList()}
                        <View style={bem(bem.element('button-container'))}>
                            {this.renderCloseButton()}
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
                    {...this.props.searchInputProps}
                    placeholder={placeholderText}
                    style={bem(bem.element('filter-text'))}
                    suffixElement={this.props.inputFieldIcon}
                    inputProps={this.props.searchInputProps}
                    autoFocus={this.props.focusInputOnOpen}
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
        const {selectedItems, noResultsText, items} = this.props;

        const bem = this.props.bem;
        return (
            <FlatList
                keyExtractor={this.constructor['keyExtractor']}
                data={items}
                extraData={selectedItems}
                renderItem={this.renderOption}
                keyboardShouldPersistTaps={'never'}
                ListEmptyComponent={
                    <View style={bem(bem.element('no-results'))}>

                        <Text style={bem(bem.element('no-results-text'))}>
                            {!this.props.searchInputProps.value ? '' : noResultsText}
                        </Text>
                    </View>
                }
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

    renderCloseButton = () => {
        const {cancelButtonText, readyButtonText} = this.props;

        const bem = this.props.bem;
        const showCancel = !this.props.selectedItems.length && this.props.selectRequired;
        return (
            <ButtonView
                onClick={this.props.onClose}
                size={'md'}
                color={showCancel ? 'gray' : 'primary'}
                style={bem(bem.element('button'))}
            >
                {showCancel ? cancelButtonText : readyButtonText}
            </ButtonView>
        )
    };
}