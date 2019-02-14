import React from 'react';

const fileTree = props => {
    
    const folderIcon = {
      margin : "0 2px 0 0"
    };
    
    
    return(
      <ul>
        <li>
          <i class="fas fa-folder-open" style={folderIcon}></i>Project folder
          <ul>
            <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
            <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
            <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
            <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
            <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
            <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
            <li><i class="fas fa-folder" style={folderIcon}></i>Folder 1</li>
          </ul>
        </li>
      </ul>
    );
};

export default fileTree;