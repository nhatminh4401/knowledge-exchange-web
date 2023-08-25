import React from 'react';

const MenuItem = ({ title, link }) => {
    return (
        <a href={link}>{title}</a>
    );
}

export default MenuItem;