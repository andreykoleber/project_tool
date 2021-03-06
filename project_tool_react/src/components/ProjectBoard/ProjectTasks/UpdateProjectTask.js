import React, { Component } from 'react';
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjectTask, updateProjectTask } from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            summary: "",
            acceptanceCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier: "",
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const projectTask = {
            id: this.state.id,
            summary: this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            projectSequence: this.state.projectSequence,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            createdDate: this.state.createdDate
        };
        console.log(projectTask);
        this.props.updateProjectTask(this.state.projectIdentifier, this.state.projectSequence, projectTask, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
        const { id, projectSequence, summary, acceptanceCriteria, status, priority, dueDate, projectIdentifier, createdDate } = nextProps.projectTask;
        this.setState({ id, projectSequence, summary, acceptanceCriteria, status, priority, dueDate, projectIdentifier, createdDate });
    }

    componentDidMount() {
        const { projectSequence, projectIdentifier } = this.props.match.params;
        this.props.getProjectTask(projectIdentifier, projectSequence, this.props.history);
    }

    render() {
        const { projectIdentifier, projectSequence } = this.props.match.params;
        const { errors } = this.state;
        return (
            <div className="add-PBI">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to={`/projectBoard/${projectIdentifier}`} className="btn btn-light">Back to Project Board</Link>
                            <h4 className="display-4 text-center">Update Project Task</h4>
                            <p className="lead text-center">Project Name {projectIdentifier} ProjectTask {projectSequence}</p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.summary
                                        })}
                                        name="summary"
                                        placeholder="Project Task summary"
                                        onChange={this.onChange}
                                        value={this.state.summary} />
                                    {errors.summary && (
                                        <div className="invalid-feedback">{errors.summary}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control form-control-lg"
                                        placeholder="Acceptance Criteria"
                                        name="acceptanceCriteria"
                                        onChange={this.onChange}
                                        value={this.state.acceptanceCriteria}></textarea>
                                </div>
                                <h6>Due Date</h6>
                                <div className="form-group">
                                    <input type="date"
                                        className="form-control form-control-lg"
                                        name="dueDate"
                                        onChange={this.onChange}
                                        value={this.state.dueDate} />
                                </div>
                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="priority" value={this.state.priority} onChange={this.onChange}>
                                        <option value={0}>Select Priority</option>
                                        <option value={1}>High</option>
                                        <option value={2}>Medium</option>
                                        <option value={3}>Low</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <select className="form-control form-control-lg" name="status" value={this.state.status} onChange={this.onChange}>
                                        <option value="">Select Status</option>
                                        <option value="TO_DO">TO DO</option>
                                        <option value="IN_PROGRESS">IN PROGRESS</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    projectTask: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    projectTask: state.backlog.projectTask,
    errors: state.errors
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(UpdateProjectTask);
