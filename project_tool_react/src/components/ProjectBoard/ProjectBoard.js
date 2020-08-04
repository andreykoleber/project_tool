import React, { Component } from 'react';
import { Link, StaticRouter } from "react-router-dom";
import Backlog from './Backlog';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getBacklog(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { id } = this.props.match.params;
        const { projectTasks } = this.props.backlog;
        const { errors } = this.state;
        let boardContent;
        const boardAlgorithm = (errors, projectTasks) => {
            if (projectTasks.length === 0) {
                if (errors.projectNotFound) {
                    return (<div className="alert alert-danger text-center">{errors.projectNotFound}</div>)
                } else if (errors.projectIdentifier) {
                    return (<div className="alert alert-danger text-center">{errors.projectIdentifier}</div>)
                } else {
                    return <div className="alert alert-info text-center">No Project Task on this board</div>
                }
            } else {
                return <Backlog projectTasks={projectTasks} />
            }
        }

        boardContent = boardAlgorithm(errors, projectTasks);
        return (
            <div className="container">
                <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
                    <i className="fas fa-plus-circle"> Create Project Task</i>
                </Link>
                <br />
                <hr />
                {boardContent}
            </div>
        )
    }
}

ProjectBoard.props = {
    backlog: PropTypes.object.isRequired,
    getBacklog: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    backlog: state.backlog,
    errors: state.errors
});

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
