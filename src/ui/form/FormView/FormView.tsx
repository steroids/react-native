import * as React from 'react';
import { StyleProp, View } from 'react-native';
import useBemNative from '../../../hooks/useBemNative';
import {IFormViewProps} from '@steroidsjs/core/ui/form/Form/Form';
const FormView: React.FunctionComponent<React.PropsWithChildren<IFormViewProps>> = (props) => {
    const bem = useBemNative('FormView');
    return (
        <View
            style={bem(
                bem.block(),
                props.style,
            )}
        >
            {props.children}
        </View>
    );
};

export default FormView;
