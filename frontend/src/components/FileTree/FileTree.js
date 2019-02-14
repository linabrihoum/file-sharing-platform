import React from 'react';
import DirectoryIcon from '../DirectoryIcon/DirectoryIcon';

const fileTree = props => {
    
    const folderIcon = {
      margin : "0 2px 0 0"
    };
    
    
    return(
      <DirectoryIcon name="Main Project Directory">
        <DirectoryIcon name="Folder 1"/>
        <DirectoryIcon name="Folder 2"/>
        <DirectoryIcon name="Folder 3"/>
        <DirectoryIcon name="Folder 4"/>
      </DirectoryIcon>
    );
};

export default fileTree;