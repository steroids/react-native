import * as React from 'react';
import {Image, StyleProp} from 'react-native';
import {IIconViewProps} from '@steroidsjs/core/ui/content/Icon/Icon';
import bem from '../../../hoc/bemNative';

interface IIconViewInnerProps extends IIconViewProps {
    style?: StyleProp<any>;
    iconProps: any;
    icon: any,
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
                    {...this.props.dataIcon}
                    style={bem(bem.block(), this.props.style)}
                />
            ) : (
                <Image
                    {...this.props}
                    source={this.props.icon}
                    {...this.props.dataIcon}
                    style={bem(bem.block(), this.props.style)}
                />
            );
    }
}
