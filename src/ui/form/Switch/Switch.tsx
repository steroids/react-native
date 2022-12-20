import React from 'react';
import { Pressable, View } from 'react-native';
import { MotiTransitionProp, MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import DropShadow from 'react-native-drop-shadow';

import {ICheckboxFieldViewProps} from '@steroidsjs/core/ui/form/CheckboxField/CheckboxField';
import useBemNative from '../../../hooks/useBemNative';

import styles from './SwitchSyles';

const BACKGROUND_COLOR_ACTIVE = '#34C759';
const BACKGROUND_COLOR_NOT_ACTIVE = 'rgba(120, 120, 128, 0.16)';
const THUMB_COLOR = '#FFFFFF';
const TRACK_WIDTH = 51;
const TRACK_HEIGHT = 31;
const THUMB_SIZE = 27;
const PADDING_HORIZONTAL = 2;

const DEFAULT_TRANSITION: MotiTransitionProp = {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.ease),
};

export default function Switch(props: ICheckboxFieldViewProps) {
    const bem = useBemNative('Switch', styles);
    const onPress = React.useCallback(() => props.inputProps?.onChange?.call(null, !props.inputProps.checked),
        [props.inputProps.checked, props.inputProps.onChange]);

    return (
        <Pressable
            onPress={onPress}
            style={bem.block()}
            disabled={props.inputProps.disabled}
        >
            <MotiView
                animate={{
                    backgroundColor: props.inputProps?.checked ? BACKGROUND_COLOR_ACTIVE : BACKGROUND_COLOR_NOT_ACTIVE,
                }}
                transition={DEFAULT_TRANSITION}
                style={{
                    width: TRACK_WIDTH,
                    height: TRACK_HEIGHT,
                    borderRadius: TRACK_WIDTH / 2,
                }}
            />
            <MotiView
                transition={DEFAULT_TRANSITION}
                animate={{
                    left: props.inputProps?.checked ? TRACK_WIDTH - THUMB_SIZE - PADDING_HORIZONTAL : PADDING_HORIZONTAL,
                }}
                style={bem.element('thumb')}
            >
                <DropShadow style={bem.element('shadow-one')}>
                    <DropShadow style={bem.element('shadow-two')}>
                        <View
                            style={{
                                backgroundColor: THUMB_COLOR,
                                width: THUMB_SIZE,
                                height: THUMB_SIZE,
                                borderRadius: THUMB_SIZE / 2,
                            }}
                        />
                    </DropShadow>
                </DropShadow>
            </MotiView>
        </Pressable>
    );
}
