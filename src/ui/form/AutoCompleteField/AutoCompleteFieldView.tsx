import * as React from 'react';
import InputFieldView from '../InputField/InputFieldView';
import OptionsList from '../../shared/OptionsList';
import {TouchableWithoutFeedback, View} from 'react-native';
import {IAutoCompleteFieldViewProps} from '@steroidsjs/core/ui/form/AutoCompleteField/AutoCompleteField';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends IAutoCompleteFieldViewProps {
    style: any;
    items: any;
    inputProps: any;
}

const AutoCompleteFieldView: React.FunctionComponent<IProps> = ({
    required = false,
    placeholder = null,
    isInvalid = false,
    disabled = false,
    size = 'md',
    ...props
    }) => {
    const bem = useBemNative('AutoCompleteFieldView');

    // TODO wtf? it should work without this
    const itemsFormatted = React.useMemo(() => props.items.map(item => {
        item.id = item.label;
        return item;
    }), [props.items]);

    return (
        <View style={props.style}>
            <TouchableWithoutFeedback
                onPress={() => !disabled && props.onOpen()}
            >
                <View>
                    <InputFieldView
                        autoFocus={false}
                        {...props.inputProps}
                        placeholder={placeholder}
                        disabled={disabled}
                        isInvalid={isInvalid}
                        required={required}
                        editable={false}
                        size={size}
                        inputProps={null}
                    />
                </View>
            </TouchableWithoutFeedback>

            {props.isOpened && (
                <OptionsList
                    items={itemsFormatted}
                    selectedItems={props.selectedItems}
                    onClose={props.onClose}
                    onItemClick={item => props.onItemClick(item)}
                    searchInputProps={props.inputProps}
                    placeholderText={props.placeholder || __('Начните вводить название...')}
                    noResultsText={__('Нет совпадений, введите свое значение')}
                    selectRequired={false}
                    appearanceType={'fade'}
                    focusInputOnOpen={true}
                />
            )}
        </View>
    );
};

export default AutoCompleteFieldView;
