import React from 'react';
import {View, Text, ActivityIndicator, TouchableHighlight, TouchableNativeFeedback, Platform} from 'react-native';
import {bem} from '@steroidsjs/core/hoc';
import {IButtonProps} from "@steroidsjs/core/ui/form/Button/Button";

export interface IButtonViewProps extends IButtonProps {
    isLoading: boolean,
    url?: string,
    formId: string,
    layout?: string,
    layoutProps?: object,
    size?: string,
    disabled?: boolean,
    onClick?: (e: Event) => void,

}

@bem('ButtonView')
export default class ButtonView extends React.PureComponent <any, any>{

    render() {
        let RNButtonComponent = this.RNButtonComponent();

        console.log("BUTTON CLICK FUNCTION", this.props.onClick);
        console.log("BUTTON CLICK COLOR", this.props.color);
        console.log("BUTTON STYLES", this.props.styles);

        return (
            <RNButtonComponent
                disabled={this.props.disabled}
                onPress={this.props.onClick}
                background={TouchableNativeFeedback.Ripple(this.props.color, true)}
            >
                <View style={this._getStyle()}>
                    {this.renderLabel()}
                </View>
            </RNButtonComponent>
        )
    }

    RNButtonComponent() {
        let RNButtonComponent;

        switch (Platform.OS) {
            case "android":
                RNButtonComponent = TouchableNativeFeedback;
                break;
            case "ios":
            default:
                RNButtonComponent = TouchableHighlight;
        }

        return RNButtonComponent;
    }

    preloaderSize() {
        switch (this.props.size) {
            case 'lg':
            case 'xl':
                return 'large';
            default:
                return 'small';
        }
    }

    renderLabel() {
        const bem = this.props.bem;
        console.log("BUTTON SIZE", this.props.size);

        return (
            <View>
                {this.props.isLoading && /* TODO preloader color */(
                    <View style={bem.element('preloader')}>
                        <ActivityIndicator size={this.preloaderSize()} color="#fff" />
                    </View>
                ) || (
                    <View style={bem.element('label')}>
                        {this.props.icon && (
                            <View
                                style={bem(
                                    bem.element('icon', !this.props.label && 'without-label'),
                                    'material-icons'
                                )}
                                // TODO implement HTML title functionality, or it's not needed?
                                // title={_isString(this.props.label) ? this.props.label : null}
                            >
                                <Text>{this.props.icon}</Text>
                            </View>
                        )}
                        <Text style={{textAlign: 'center'}}>
                            {this.props.children}
                        </Text>
                    </View>
                )}
            </View>
        );
    }

    _getStyle(modifiers:any = {}) {
        const bem = this.props.bem;

        console.log("BEM button CLASSES", [
            bem.block({
                color: this.props.color,
                outline: this.props.outline,
                size: this.props.size,
                disabled: this.props.disabled,
                submitting: this.props.submitting,
                'is-loading': this.props.isLoading,
                ...modifiers,
            }),
            this.props.style,
            !this.props.link && 'btn',
            this.props.size && 'btn-' + this.props.size,
            'btn-' + (this.props.outline ? 'outline-' : '') + this.props.color,
            this.props.block && 'btn-block',
            this.props.link && 'btn-link',
        ]);
        console.log("BEM butTON STYLES", bem(
            bem.block({
                color: this.props.color,
                outline: this.props.outline,
                size: this.props.size,
                disabled: this.props.disabled,
                submitting: this.props.submitting,
                'is-loading': this.props.isLoading,
                ...modifiers,
            }),
            this.props.style,
            !this.props.link && 'btn',
            this.props.size && 'btn-' + this.props.size,
            'btn-' + (this.props.outline ? 'outline-' : '') + this.props.color,
            this.props.block && 'btn-block',
            this.props.link && 'btn-link',
        ));

        return bem(
            bem.block({
                color: this.props.color,
                outline: this.props.outline,
                size: this.props.size,
                disabled: this.props.disabled,
                submitting: this.props.submitting,
                'is-loading': this.props.isLoading,
                ...modifiers,
            }),
            !this.props.link && 'btn',
            this.props.size && 'btn-' + this.props.size,
            !this.props.link && 'btn-' + (this.props.outline ? 'outline-' : '') + this.props.color,
            this.props.block && 'btn-block',
            this.props.link && 'btn-link',
            this.props.style,
        );
    }
}
