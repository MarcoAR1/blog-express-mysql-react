import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { blogReducer, BlogState } from './reducers/blogReducer'
import { userReducer } from './reducers/userReducer'
import { UserReducerState } from './reducers/userReducer'

const reducer = combineReducers({
    user: userReducer,
    blog: blogReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store

export interface initialState {
    user: UserReducerState
    blog: BlogState
}