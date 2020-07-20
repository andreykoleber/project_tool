import React, { Component } from 'react'
import ProjectTask from './ProjectTasks/ProjectTask'

class Backlog extends Component {
    render() {
        const { projectTasks } = this.props;

        let inTodo = projectTasks && projectTasks.filter(projectTask => projectTask.status === 'TO_DO').map(projectTask => (
            <ProjectTask key={projectTask.id} projectTask={projectTask} />
        ));

        let inProgress = projectTasks && projectTasks.filter(projectTask => projectTask.status === 'IN_PROGRESS').map(projectTask => (
            <ProjectTask key={projectTask.id} projectTask={projectTask} />
        ));

        let inDone = projectTasks && projectTasks.filter(projectTask => projectTask.status === 'DONE').map(projectTask => (
            <ProjectTask key={projectTask.id} projectTask={projectTask} />
        ));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {inTodo}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {inProgress}
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                        </div>
                        {inDone}
                    </div>
                </div>
            </div>
        )
    }
}

export default Backlog;