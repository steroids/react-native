import {bem} from "@steroidsjs/core/hoc";
import React from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import InputFieldView from "@steroidsjs/native/ui/form/InputField/InputFieldView";
import ButtonView from "@steroidsjs/native/ui/form/Button/ButtonView";
import styles from './DropDownOptionListViewStyles';
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
        onChange: (e: Event) => void,
        value: string | number,
        placeholder: string,
        disabled: string,
    },
    noResultsText: string,
    cancelButtonText: string
    readyButtonText: string
}

interface IState {

}

@bem('DropDownOptionsList', styles)
export default class DropDownOptionsListView extends React.PureComponent<IProps, IState> {

    static defaultProps = {
        placeholderText: __('Поиск...'),
        cancelButtonText: __('Отмена'),
        readyButtonText: __('Готово'),
        noResultsText: __('Нет совпадений'),
        visible: true,
        selectedItems: [],
        items: [],
    };

    static keyExtractor(item, index) {
        return index.toString()
    }

    render() {
        const {onClose} = this.props;

        const bem = this.props.bem;
        return (
            <Modal
                onRequestClose={onClose}
                supportedOrientations={['portrait', 'landscape']}
            >
                <KeyboardAvoidingView
                    behavior="padding"
                    style={bem(bem.element('overlay'))}
                    enabled={Platform.OS === 'ios'}
                >
                    <SafeAreaView style={bem(bem.block())}>
                        {this.renderList()}
                        <View style={bem(bem.element('cancel-container'))}>
                            {this.renderCancelButton()}
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
                    suffixElement={require('../../../../assets/search-icon.png')}
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
        const {selectedItems, noResultsText, items} = this.props;

        const bem = this.props.bem;
        if (!items.length) {
            return (
                <FlatList
                    data={items}
                    keyExtractor={this.constructor['keyExtractor']}
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
                keyExtractor={this.constructor['keyExtractor']}
                data={items}
                extraData={selectedItems}
                renderItem={this.renderOption}
                keyboardShouldPersistTaps={'never'}
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
        const {cancelButtonText, readyButtonText} = this.props;

        const bem = this.props.bem;
        return (
            <ButtonView
                onClick={this.props.onClose}
                size={'md'}
                outline={true}
                color={'white'}
                style={bem(bem.element('cancel'))}
            >
                {!!this.props.selectedItems.length ? readyButtonText : cancelButtonText}
            </ButtonView>
        )
    };
}