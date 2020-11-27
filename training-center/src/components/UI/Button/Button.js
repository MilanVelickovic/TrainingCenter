import React from 'react';

import './Button.css';

const Button = (props) => {
    
    let button;

    switch (props.for) {
        case "signInOption":
            button = <button type="submit" className="Button signIn">{props.children}</button>;
            break;
        case "reserveOption":
        case "backOption":
            button = <button className="Button backAndReserve" onClick={() => props.onClickFunction()}>{props.children}</button>;
            break;
        default:
            button = null;
    }

    return button;

}

export default Button;