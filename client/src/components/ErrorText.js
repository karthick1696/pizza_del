import React from 'react';

const ErrorText = ({text = ''}) => {
    return (
        <p className={`text-danger mb-0 small ${text ? 'visible' : 'invisible'}`}>{text || 'Error'}</p>
    )
}

export default ErrorText;
