import button from './button';
import input from './input';
import common from './common';

import createVariables from './createVariables';

export {
    common,
    input,
    button,
    createVariables,
};

export default function (customVariables, classes = {}) {
    const variables = createVariables(customVariables);

    return {
        variables: variables,
        classes: {
            ...common(variables, classes),
            ...input(variables, classes),
            ...button(variables, classes),
        }
    }
}