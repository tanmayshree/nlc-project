import axios from "axios"

const API_BASE_URL = "http://localhost:5000"

export const API_Login_Request = async (dispatch) => {

    try {
        const { data } = await axios.get(API_BASE_URL + '/auth/login/success', { withCredentials: true })
        const _user = data;

        if (_user) {
            const { data } = await axios.post(API_BASE_URL + '/user/profile', { googleId: _user.googleId }, { withCredentials: true })
            const _profile = data
            if (_profile) {
                dispatch({
                    type: 'GOT_USER_PROFILE', payload: {
                        _user,
                        _profile,
                        msg: {
                            type: 'success',
                            text: 'Login Successful'
                        }
                    }
                })
            } else {
                dispatch({
                    type: 'GOT_USER', payload: {
                        _user,
                        msg: {
                            type: 'warning',
                            text: 'No Profile Found'
                        }
                    }
                })
            }
        }
    } catch (err) {

    }
}

export const Save_User_Profile = async (profileData) => {
    try {
        await axios.post(API_BASE_URL + '/user/profile', profileData, { withCredentials: true });
    } catch (error) {
        return error;
    }
}

export const RegisterForEvent = async (newData) => {
    const { data } = await axios.post(API_BASE_URL + '/user/register', newData, { withCredentials: true })
    return data;
}

export const Logout = async (dispatch) => {
    await axios.get(API_BASE_URL + '/auth/logout', { withCredentials: true })
    dispatch({ type: 'LOGOUT' })
}

export const Subscribe = async (email) => {
    return await axios.post(API_BASE_URL + '/subscribe', { "email": email }, { withCredentials: true });
}