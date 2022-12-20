import bgAndTextColors from "./generators/bgAndTextColors";
import titles from "./generators/titles";
import layout from "./generators/layout";

import createVariables from './variables';

export function getDefaultComponentsStyles() {
    return [
        require('../ui/form/AutoCompleteField/AutoCompleteFieldViewStyles').default,
        require('../ui/form/Button/ButtonViewStyles').default,
        require('../ui/form/CheckboxField/CheckboxFieldViewStyles').default,
        require('../ui/form/CheckboxListField/CheckboxListFieldViewStyles').default,
        require('../ui/form/DateField/DateFieldViewStyles').default,
        require('../ui/form/DropDownField/DropDownFieldViewStyles').default,
        require('../ui/form/FieldLayout/FieldLayoutViewStyles').default,
        require('../ui/form/FieldListView/FieldListViewStyles').default,
        require('../ui/form/FormView/FormViewStyles').default,
        require('../ui/form/InputField/InputFieldViewStyles').default,
        require('../ui/form/RadioListField/RadioFieldListViewStyles').default,
        require('../ui/form/TimeField/TimeFieldViewStyles').default,
    ];
}

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
