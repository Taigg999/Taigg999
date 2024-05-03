// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function MySrc({ imageSrc }) {
    const divStyle = {
        position: 'relative',
        paddingTop: '100%',
        backgroundImage: `url(${imageSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
    };
    return <div style={divStyle}></div>;
}

export default MySrc;
