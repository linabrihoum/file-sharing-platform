import React from 'react';

import { SELECT_DIRECTORY, TOGGLE_DIRECTORY, OPEN_ROOT,UPDATE_PROJECT_FILES } from '../actions/actionTypes'
// import ProjectData from '../../Data';

// Current project data is being imported from another file, but eventually it will be loaded from server
const initialState = {
    files : null,
    selected: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case SELECT_DIRECTORY:
            return{
                ...state,
                selected: action.path
            }
        case TOGGLE_DIRECTORY:
            return{
                ...state,
                files: action.files
            }
        case OPEN_ROOT:
            return{
                ...state,
                selected : null
            }
        case UPDATE_PROJECT_FILES:
            return{
                ...state,
                files: action.files
            }

    }
    return state;
}

export default reducer;
