const Project = require('./project');
const State = require('./state');
const sc = require('../components/sourceControl');

module.exports = class Workspace {
    constructor() {
        this.Projects = [];
        this.currentProjectID = null;
    }

    get currentProject() {
        return this.Projects[this.currentProjectID];
    }

    projectValid(projectID) {
        return (projectID in this.Projects);
    }

    // Add project to workspace.
    addProject(projectDir, projectID) {
        this.Projects[projectID] = new Project(projectDir);
    }

    // Set current workspace project.
    setProject(projectID, callback) {
        if (!this.projectValid(projectID)) {
            callback('Invalid project ID!');
        }

        // Set current project ID.
        this.currentProjectID = projectID;

        // Check if project isn't loaded.
        if (this.getState(projectID) == State.UNLOADED) {

            // Update project state.
            this.setState(projectID, State.LOADING);

            // Clone project.
            sc.cloneProject(this.Projects[projectID].dir, projectID, () => {

                // Update project state.
                this.setState(projectID, State.LOADED);

                callback(null);
            });

            return;
        }

        callback(null);
    }

    getState(projectID) {
        return this.Projects[projectID].state;
    }

    setState(projectID, state) {
        this.Projects[projectID].state = state;
    }
};