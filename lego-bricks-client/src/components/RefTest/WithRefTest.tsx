import React, { useRef } from 'react';
import RTE from './RefTest';

export const withRefTest = BaseComponent => props => {
    return (<BaseComponent
        {...props}
        ref={props.myRef}
        name="New Name"
    />);
}

export const WithRefTestEnchecr = withRefTest(RTE)

export const WithRefTest = (props) => {
    const myRef = useRef<any>(null);
    const handleFocusWiths = () => {
        myRef.current.focus()
    }

    return <WithRefTestEnchecr {
        ...{
            handleFocusWiths,
            myRef
        }
    } />
}


