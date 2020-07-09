import React, { Component } from 'react';
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const updateProject = {
            id: this.state.id,
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            startDate: this.startDate,
            endDate: this.endDate
        }
        this.props.createProject(updateProject, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
        const { id, projectName, projectIdentifier, description, startDate, endDate } = nextProps.project;
        this.setState({ id, projectName, projectIdentifier, description, startDate, endDate });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getProject(id, this.props.history);
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input onChange={this.onChange}
                                        value={this.state.projectName}
                                        name="projectName"
                                        type="text"
                                        className={classnames("form-control form-control-lg ",
                                            { "is-invalid": errors.projectName }
                                        )}
                                        placeholder="Project Name" />
                                    {errors.projectName && (
                                        <div className="invalid-feedback">{errors.projectName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange}
                                        value={this.state.projectIdentifier}
                                        name="projectIdentifier"
                                        type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Unique Project ID"
                                        disabled />
                                </div>

                                <div className="form-group">
                                    <textarea onChange={this.onChange}
                                        value={this.state.description}
                                        name="description"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.description
                                        })}
                                        placeholder="Project Description"></textarea>
                                    {errors.description && (
                                        <div className="invalid-feedback">{errors.description}</div>
                                    )}
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input onChange={this.onChange} value={this.state.startDate} name="startDate" type="date" className="form-control form-control-lg" />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input onChange={this.onChange} value={this.state.endDate} name="endDate" type="date" className="form-control form-control-lg" />
                                </div>
                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

UpdateProject.propTypes = {
    getProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    project: state.project.project,
    errors: state.errors
});

export default connect(mapStateToProps, { getProject, createProject })(UpdateProject);