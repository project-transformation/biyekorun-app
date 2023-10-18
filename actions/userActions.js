import axiosInstance from "../lib/axiosInstance";
import store from "../store";

export const getUser = () => {
    axiosInstance.get('/user/mychats')
        .then(async res => {
            store.dispatch({
                type: "SET_USER",
                payload: res.data
            })

        })
        .catch(err => {
            console.log(err);
        })
}