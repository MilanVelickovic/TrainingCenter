import React from 'react';

import './Button.css';

const Button = (props) => {
    
    let button;

    switch (props.for) {
        case "signInOption":
            button = <button type="submit" className="Button signIn">Prijavi se</button>;
            break;
        case "signOutOption":
            button = <button type="submit" className="Button signOut" onClick={() => props.onClickFunction()}>Odjavi se</button>;
            break;
        default:
            button = null;
    }

    return button;

}

export default Button;