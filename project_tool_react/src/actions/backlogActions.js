import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from "./types";

export const addProjectTask = (backlogId, projectTask, history) => async dispatch => {
    try {
        await axios.post(`/api/backlog/${backlogId}`, projectTask);
        history.push(`/projectBoard/${backlogId}`)
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getBacklog = backlogId => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}`)
        dispatch({
            type: GET_BACKLOG,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const getProjectTask = (backlogId, projectSequence, history) => async dispatch => {
    try {
        const res = await axios.get(`/api/backlog/${backlogId}/${projectSequence}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        history.push("/dashboard");
    }
}

export const updateProjectTask = (backlogId, projectSequence, projectTask, history) => async dispatch => {
    try {
        await axios.patch(`/api/backlog/${backlogId}/${projectSequence}`, projectTask);
        history.push(`/projectBoard/${backlogId}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const deleteProjectTask = (backlogId, projectSequence) => async dispatch => {
    if (window.confirm(`Are you sure you want to delete project task ${projectSequence}. This action cannot be undone.`)) {
        await axios.delete(`/api/backlog/${backlogId}/${projectSequence}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: projectSequence
        })
    }
}