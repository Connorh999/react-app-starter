import React from 'react';

import classes from './app.module.scss';

const App = () => {
    return (
        <div className={classes.root}>
            <div className={classes.text}>
                React App Starter!
            </div>
            <div className={classes.image}></div>
        </div>
    );
};

export default App;
