import React, { Component } from 'react';

import InnerNav from '../InnerNav/InnerNav';
import FileDisplay from '../FileDisplay/FileDisplay';

class FileManagementContainer extends Component {

    state = {
        filesSelected: []
    }

    render(){
        
        return(
            <React.Fragment>
                <InnerNav uploading={this.props.uploading} />
                <FileDisplay height={this.props.height} />
            </React.Fragment>
        );
    }
}

export default FileManagementContainer;