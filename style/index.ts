import button from './button';
import input from './input';
import common from './common';

// TODO should be done automatically in future
import elements from './elements';

import createVariables from './createVariables';

export {
    common,
    input,
    button,
    createVariables,
    elements,
};

export default function (customVariables, classes = {}) {
    const variables = createVariables(customVariables);

    return {
        variables: variables,
        classes: {
            ...common(variables, classes),
            ...input(variables, classes),
            ...button(variables, classes),
            ...elements(variables, classes),
        }
    }
}