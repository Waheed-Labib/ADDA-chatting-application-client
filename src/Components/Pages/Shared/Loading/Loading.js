import React from 'react';
import './Loading.css'

const Loading = ({ position }) => {
    return (
        <div className='loading'>
            <h2>Loading
                <span className='dot'>.</span>
                <span className='dot'>.</span>
                <span className='dot'>.</span>
            </h2>
        </div>
    );
};

export default Loading;