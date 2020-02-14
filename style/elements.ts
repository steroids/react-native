import ButtonStyles from '../ui/form/Button/ButtonViewStyles';
import {mixinBorderRadius} from "@steroidsjs/native/style/mixins/border-radius";

export default (variables, classes) => {
    classes = {
        ...classes,
        ...ButtonStyles,
    };

    return classes;
};

