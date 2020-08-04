import React, { Component } from 'react';
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            "username": "",
            "fullName": "",
            "password": "",
            "confirmPassword": "",
            "errors": {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            "username": this.state.username,
            "fullName": this.state.fullName,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword
        };
        this.props.createNewUser(newUser, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        if (this.props.security.validToken) {
            this.props.history.push("/dashboard")
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account</p>
                            <form action="create-profile.html" onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input onChange={this.onChange}
                                        type="text"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.fullName
                                        })}
                                        placeholder="Full name"
                                        name="fullName"
                                        value={this.state.fullName} />
                                    {errors.fullName && (
                                        <div className="invalid-feedback">{errors.fullName}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange}
                                        type="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address (Username)"
                                        name="username"
                                        value={this.state.username} />
                                    {errors.username && (
                                        <div className="invalid-feedback">{errors.username}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange}
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password} />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input onChange={this.onChange}
                                        type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.confirmPassword
                                        })}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword} />
                                    {errors.confirmPassword && (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(mapStateToProps, { createNewUser })(Register);