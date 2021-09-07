import * as React from 'react';
import {Text} from 'react-native';

export default function (element: any, props?: any) {
   if (typeof element === 'string') {
       return (
           <Text {...props}>
               {element}
           </Text>
       )
   }
   if (typeof element === 'function') {
       const Element = element()
       return <Element/>
   }
   if (React.isValidElement(element)) {
       return element
   }


}
