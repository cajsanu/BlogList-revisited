import { createSlice } from "@reduxjs/toolkit";
import blogRequests from '../requests/blogs'

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            state.push(action.payload)
            return state
        },
        removeBlog(state, action) {
            return state.filter(b => b.id !== action.payload)
        },
        like(state, action) {
            console.log(action)
            return state.map(b => b.id !== action.payload.id ? b : action.payload.likedBlog)
        }
    }
})

export const {setBlogs, addBlog, removeBlog, like} = blogSlice.actions

export const initialiseBlogs = () => {
    return async (doAction) => {
        const blogs = await blogRequests.getAll()
        doAction(setBlogs(blogs))
    }
}
export const createBlog = (blog) => {
    return async (doAction) => {
        const newBlog = await blogRequests.createBlog(blog)
        doAction(addBlog(newBlog))
    }
}
export const deleteBlog = (id) => {
    return async (doAction) => {
        const response = await blogRequests.deleteBlog(id)
        doAction(removeBlog(id))
    }
}
export const likeBlog = (id) => {
    return async (doAction) => {
        const likedBlog = await blogRequests.updateLikes(id)
        doAction(like({ id, likedBlog }))
    }
}

export default blogSlice.reducer