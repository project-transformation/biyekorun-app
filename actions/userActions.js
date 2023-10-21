import axiosInstance from "../lib/axiosInstance";
import { logout, setProfile } from "../store/reducer/authSlice";
// import store from "../store";

export const getUserData = () => {
    return (dispatch) => {
        axiosInstance.get('/user')
            .then(async res => {
                dispatch(setProfile(res.data.data))

            })
            .catch(err => {
                dispatch(logout())
                console.log(err);
            })
    }

}