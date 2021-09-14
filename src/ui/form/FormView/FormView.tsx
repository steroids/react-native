import * as React from 'react';
import { StyleProp, View } from 'react-native';
import useBemNative from '../../../hooks/useBemNative';

interface IProps {
    label: boolean | string,
    hint: boolean | string,
    required: boolean,
    isInvalid: boolean,
    layout: FormLayout,
    size: Size,
    onSubmit?: (...args: any[]) => any;
    style?: StyleProp<any>
}

const FormView: React.FunctionComponent<React.PropsWithChildren<IProps>> = (props) => {
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
