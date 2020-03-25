import { Dimensions } from 'react-native'

export default (variables, classes) => {
    classes = {
        ...classes,

        'DropDownFieldView__arrow-icon': {
            width: 12,
            height: 12
        },
        'DropDownFieldView__reset-icon': {
            width: 12,
            height: 12
        }
    };

    return classes;
};