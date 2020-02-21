import ButtonStyles from '../ui/form/Button/ButtonViewStyles';
import InputFieldStyles from '../ui/form/InputField/InputFieldViewStyles';

export default (variables, classes) => {
    classes = {
        ...classes,
        ...ButtonStyles(variables, classes),
        ...InputFieldStyles(variables, classes)
    };

    return classes;
};

