import ButtonStyles from '../ui/form/Button/ButtonViewStyles';

export default (variables, classes) => {
    classes = {
        ...classes,
        ...ButtonStyles(variables, classes),
    };

    return classes;
};

