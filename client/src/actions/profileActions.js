import axios from 'axios';
import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';  
// get current profile

export const getCurrentProfile = () => dispatch => { 
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err => 
            dispatch({
                type: GET_PROFILE, 
                payload: {} 
            })
        )
}
//get by handle profile
export const getProfileByHandle = (slug) => dispatch => { 
    dispatch(setProfileLoading());
    axios.get(`/api/profile/slug/${slug}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        ).catch(err => 
            dispatch({
                type: GET_PROFILE,  
                payload: null
            })
        )
}

//create profile 
export const createProf = (profileData, history) => dispatch => {    
    axios
        .post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data 
            })
        )
}

//loading profile
export const setProfileLoading = () => { 
    return {
        type: PROFILE_LOADING
    }
}
//clear profile
export const clearCurrentProfile = () => {  
    return {
        type: CLEAR_CURRENT_PROFILE 
    }
}
//add exp
export const addExperience = (expData, history) => dispatch => {
    axios
        .post('/api/profile/experience', expData)
        .then(res => history.push('/dashboard'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) 
        );
}

//delete account
export const deleteAccount = () => dispatch => {
    if(window.confirm('are you sure? this can`t be undone')) {
        axios
            .delete('/api/profile')
            .then(res => 
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {}
                })
            ).catch(err => 
                dispatch({
                    type: GET_ERRORS, 
                    payload: err.response.data
                })
            )
    }
}
//delete exp
export const deleteExperience = (id) => dispatch => {
    axios
        .delete(`/api/profile/experience/${id}`) 
        .then(res =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data 
            })
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }) 
        );
}



//get all profiles
export const getProfiles = () => dispatch => { 
    dispatch(setProfileLoading());
    axios
        .get('/api/profile/all')  
        .then(res =>
            dispatch({
                type: GET_PROFILES, 
                payload: res.data 
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILES, 
                payload: null
            }) 
        );
}


