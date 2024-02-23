import { createSlice } from "@reduxjs/toolkit";
import blogRequests from "../requests/blogs"
import loginService from "../requests/login";

const userSlice = createSlice({
    name: "user",
    initialState: null, 
    reducers: {
        setLoggedinUser(state, action) {
            return action.payload
        }
    }
})

export const { setLoggedinUser, deleteUser } = userSlice.actions

export const loginUser = (userObject) => {
    return async(doAction) => {
        const user = await loginService.login(userObject)
        const token = blogRequests.setToken(user.token)
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
        doAction(setLoggedinUser(user))
    }
}
export const setUser = (user) => {
    return (doAction) => {
        doAction(setLoggedinUser(user))
    }
}
export const removeUser = () => {
    return (doAction) => {
        doAction(setLoggedinUser(null))
    }
}

export default userSlice.reducer