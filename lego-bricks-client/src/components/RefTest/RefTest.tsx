import React, { useRef } from 'react';


function mergeRefs(refs) {
    return value => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(value)
            } else if (ref != null) {
                ref.current = value
            }
        })
    }
}

const RTE = React.forwardRef((props: any, ref: any) => {
    const myRef = useRef(null);
    function handleFocus() {
        props.handleFocusWiths()
    }

    return (
        <div> <span>test 1</span>
            <input ref={mergeRefs([myRef, ref])} placeholder="Input Here..." />
            <button onClick={handleFocus}>Focus Input</button>
        </div>
    )
})

export default RTE