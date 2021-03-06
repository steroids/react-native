import React from 'react';

import {IIconViewProps} from '@steroidsjs/core/ui/icon/Icon';
import {bem} from '@steroidsjs/core/hoc';
import {IBemHocOutput} from '@steroidsjs/core/hoc/bem';
import {Image, StyleProp} from "react-native";

interface IIconViewInnerProps extends IIconViewProps, IBemHocOutput {
    style?: StyleProp<any>;
    iconProps: any;
}

@bem('IconView')
export default class Icon extends React.PureComponent<IIconViewInnerProps> {
    render() {
        const Icon = React.isValidElement(this.props.icon) || typeof this.props.icon === 'function'
            ? this.props.icon
            : null;

        const bem = this.props.bem;
        return Icon
            ? (
                <Icon
                    {...this.props}
                    {...this.props.iconProps}
                    style={bem(bem.block(), this.props.style)}
                />
            ) : (
                <Image
                    {...this.props.iconProps}
                    source={this.props.icon}
                    {...this.props}
                    style={bem(bem.block(), this.props.style)}
                />
            );
    }
}
