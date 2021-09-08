import useBemNative, { IBem } from '../hooks/useBemNative';
import { StyleProp } from 'react-native';

export interface IBemHocOutput {
    bem?: IBem
}

export default (namespace: string, styles?: StyleProp<any>): any => WrappedComponent => function BemNativeHoc(props) {
    const bem = useBemNative(namespace, styles);
    return (
        <WrappedComponent
            {...props}
            bem={bem}
        />
    );
};
