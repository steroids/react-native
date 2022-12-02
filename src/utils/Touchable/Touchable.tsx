import * as React from 'react';
import {
    Pressable,
    PressableProps,
} from 'react-native';
import useBemNative from '../../hooks/useBemNative';
import styles from './TouchableStyles';

interface ITouchableProps extends PressableProps {
    disableRipple?: boolean,
    rippleColor?: string,
}

const Touchable: React.FunctionComponent<ITouchableProps> = (props) => {
    const bem = useBemNative('Touchable', styles);

    return (
        <Pressable
            android_ripple={!props.disableRipple && {
                color: props.rippleColor || bem.variable('rippleColor'),
                foreground: true,
            }}
            unstable_pressDelay={100}
            {...props}
            style={(options) => bem(
                bem.block({pressed: options.pressed}),
                typeof props.style === 'function'
                    ? props.style(options)
                    : props.style,
            )}
        >
            {props.children}
        </Pressable>
    );
};

export default Touchable;
