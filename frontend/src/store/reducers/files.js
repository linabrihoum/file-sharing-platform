import React from 'react';

import * as actionTypes from '../actions';
import ProjectData from '../../Data';

// Current project data is being imported from another file, but eventually it will be loaded from server
const initialState = {
    files : ProjectData
}

const reducer = (state = initialState, action) => {

    return state;
}

export default reducer;
