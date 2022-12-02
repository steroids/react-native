import {IStylesClasses} from '../../types/IStylesClasses';
import {Platform} from 'react-native';

export default (variables: any, classes: IStylesClasses) => {
    classes = {
        ...classes,

        Touchable: {},

        Touchable_pressed: {
            opacity: Platform.OS !== 'android' ? 0.8 : 1,
        },
    };

    return classes;
};
