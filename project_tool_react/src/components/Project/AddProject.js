import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";

class AddProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            projectIdentifier: "",
            description: "",
            startDate: "",
            endDate: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newProject = {
            projectName: this.state.projectName,
            projectIdentifier: this.state.projectIdentifier,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        console.log(newProject);
        this.props.createProject(newProject, this.props.history);

    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create / Edit Project form</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input onChange={this.onChange} name="projectName" value={this.state.projectName} type="text" className="form-control form-control-lg " placeholder="Project Name" />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange} name="projectIdentifier" value={this.state.projectIdentifier} type="text" className="form-control form-control-lg" placeholder="Unique Project ID" />
                                </div>

                                <div className="form-group">
                                    <textarea onChange={this.onChange} name="description" value={this.state.description} className="form-control form-control-lg" placeholder="Project Description"></textarea>
                                </div>
                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input onChange={this.onChange} name="startDate" value={this.state.startDate} type="date" className="form-control form-control-lg" />
                                </div>
                                <h6>Estimated End Date</h6>
                                <div className="form-group">
                                    <input onChange={this.onChange} name="endDate" value={this.state.endDate} type="date" className="form-control form-control-lg" />
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

AddProject.propTypes = {
    createProject: PropTypes.func.isRequired
}

export default connect(
    null, { createProject }
)(AddProject);