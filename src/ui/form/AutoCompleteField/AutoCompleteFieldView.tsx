import * as React from 'react';
import bem, { IBemHocOutput } from '../../../hoc/bemNative';
import InputFieldView from '../InputField/InputFieldView';
import OptionsList from '../../shared/OptionsList';
import { TouchableWithoutFeedback, View } from 'react-native';
import { IAutoCompleteFieldViewProps } from '@steroidsjs/core/ui/form/AutoCompleteField/AutoCompleteField';

interface IProps extends IAutoCompleteFieldViewProps, IBemHocOutput {
    style: any;
    items: any;
    inputProps: any;
}

@bem('AutoCompleteFieldView')
export default class AutoCompleteFieldView extends React.PureComponent<IProps> {

    static defaultProps = {
        required: false,
        placeholder: null,
        isInvalid: false,
        disabled: false,
        size: 'md',
    };

    render() {
        // TODO wtf? it should work without this
        const itemsFormatted = this.props.items.map(item => {
            item.id = item.label;
            return item;
        });

        const bem = this.props.bem;
        // @ts-ignore
        // @ts-ignore
        return (
            <View style={bem(bem.block(), this.props.style)}>
                <TouchableWithoutFeedback
                    style={bem(bem.element('input'))}
                    onPress={() => !this.props.disabled && this.props.onOpen()}
                >
                    <View>
                        <InputFieldView
                            autoFocus={false}
                            {...this.props.inputProps}
                            placeholder={this.props.placeholder}
                            disabled={this.props.disabled}
                            isInvalid={this.props.isInvalid}
                            required={this.props.required}
                            editable={false}
                            size={this.props.size}
                            inputProps={null}
                        />
                    </View>
                </TouchableWithoutFeedback>

                {this.props.isOpened && (
                    <OptionsList
                        items={itemsFormatted}
                        selectedItems={this.props.selectedItems}
                        onClose={this.props.onClose}
                        onItemClick={item => this.props.onItemClick(item)}
                        searchInputProps={this.props.inputProps}
                        placeholderText={this.props.placeholder || __('Начните вводить название...')}
                        noResultsText={__('Нет совпадений, введите свое значение')}
                        selectRequired={false}
                        appearanceType={'fade'}
                        focusInputOnOpen={true}
                    />
                )}
            </View>
        );
    }
}
