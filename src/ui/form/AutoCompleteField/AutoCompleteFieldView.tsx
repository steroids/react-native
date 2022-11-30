import * as React from 'react';
import InputFieldView from '../InputField/InputFieldView';
import OptionsList from '../../shared/OptionsList';
import { TouchableWithoutFeedback, View } from 'react-native';
import { IAutoCompleteFieldViewProps } from '@steroidsjs/core/ui/form/AutoCompleteField/AutoCompleteField';
import useBemNative from '../../../hooks/useBemNative';

interface IProps extends IAutoCompleteFieldViewProps {
    style: any;
    items: any;
    inputProps: any;
}

const AutoCompleteFieldView: React.FunctionComponent<IProps> = (props) => {
    const bem = useBemNative('AutoCompleteFieldView');

    // TODO wtf? it should work without this
    const itemsFormatted = React.useMemo(() => props.items.map(item => {
        item.id = item.label;
        return item;
    }), [props.items]);

    return (
        <View style={bem(bem.block(), props.style)}>
            <TouchableWithoutFeedback
                style={bem(bem.element('input'))}
                onPress={() => !props.disabled && props.onOpen()}
            >
                <View>
                    <InputFieldView
                        autoFocus={false}
                        {...props.inputProps}
                        placeholder={props.placeholder}
                        disabled={props.disabled}
                        isInvalid={props.isInvalid}
                        required={props.required}
                        editable={false}
                        size={props.size}
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
                    placeholderText={props.placeholder || 'Начните вводить название...'}
                    noResultsText={'Нет совпадений, введите свое значение'}
                    selectRequired={false}
                    appearanceType={'fade'}
                    focusInputOnOpen={true}
                />
            )}
        </View>
    );
};

AutoCompleteFieldView.defaultProps = {
    required: false,
    placeholder: null,
    isInvalid: false,
    disabled: false,
    size: 'md',
};

export default AutoCompleteFieldView;
