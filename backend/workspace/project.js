const State = require('./state');

module.exports = class WorkspaceProject {
    
    constructor(tmpDir) {
        this.state = State.UNLOADED;
        this.dir = tmpDir;
    }


}