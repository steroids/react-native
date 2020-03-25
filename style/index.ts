import bgAndTextColors from "./generators/bgAndTextColors";
import titles from "./generators/titles";
import layout from "./generators/layout";

import createVariables from './variables';

export default function (customVariables, classes = {}) {
    const variables = createVariables(customVariables);

    return {
        variables: variables,
        classes: {
            ...bgAndTextColors(variables),
            ...titles(variables),
            ...layout(variables),
        }
    }
}