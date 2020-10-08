import React from 'react';
import {Text} from 'react-native';

export default function (element: any, style?: any) {
   if (typeof element === 'string') {
       return (
           <Text style={style}>
               element
           </Text>
       )
   }
   if (typeof element === 'function') {
       return element()
   }
   if (React.isValidElement(element)) {
       return element
   }


}