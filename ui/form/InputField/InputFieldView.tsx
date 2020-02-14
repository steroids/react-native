import React from 'react';
import {TextInput, View} from 'react-native';

import {bem} from '@steroidsjs/core/hoc';

interface IState {
    focused: Boolean
}

@bem('InputFieldView')
export default class InputFieldView extends React.PureComponent<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            focused: true
        };
    }
    static defaultProps = {
        type: 'text',
        disabled: false,
        required: false,
        className: "",
        placeholder: "",
        errors: []
    };

    render() {
        const bem = this.props.bem;
        return (
            <View>
                <TextInput
                    style={bem(
                        bem.block({
                            size: this.props.size,
                        }),
                        'form-control',
                        'form-control-' + this.props.size,
                        this.props.isInvalid && 'is-invalid',
                        this.state.focused && 'form-control:focus',
                        this.props.style
                    )}
                    {...this.props.inputProps}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    editable={!this.props.disabled}
                    required={this.props.required}
                    onFocus={(e) => console.log("FOCUSED", e)}
                    onChange={(e) => {
                        this.props.inputProps.onChange(e.nativeEvent.text);
                    }}
                />
            </View>
        );
    }
}

