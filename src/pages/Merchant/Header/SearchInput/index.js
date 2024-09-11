import React from 'react';
import icon_search from '../../assets/icon/icon_search.svg';
import './index.scss';

const Index = ({ placeholder = '', ...props }) => {
    return (
        <div className="search">
            <input
                placeholder={placeholder}
                className="search-input"
                {...props}
            />
            <img src={icon_search} alt="search" />
        </div>
    );
};

export default Index;
