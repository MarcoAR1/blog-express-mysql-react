import { Blogresponse } from '../services/blogServices'

export interface BlogState {
  blogs: [] | Blogresponse[]
  fetching: boolean
}

interface BlogAction {
  type: string
  payload: {
    blogs: [] | Blogresponse[]
    fetching: boolean
  }
}

const ACTION_TYPE = {
  FETCH_BLOGS: 'FETCH_BLOGS',
  CONCAT_FETCH_BLOGS: 'CONCAT_FETCH_BLOGS',
}

export const blogReducer = (
  state: BlogState = { blogs: [], fetching: false },
  { type, payload }: BlogAction
): BlogState => {
  if (type === ACTION_TYPE.FETCH_BLOGS)
    return {
      blogs: payload.blogs,
      fetching: payload.fetching,
    }

  if (type === ACTION_TYPE.CONCAT_FETCH_BLOGS)
    return {
      ...state,
      blogs: [...state.blogs, ...payload.blogs],
    }

  return state
}

export const actionFetchBlogs = (blogs: Blogresponse[]): BlogAction => ({
  type: ACTION_TYPE.FETCH_BLOGS,
  payload: { blogs, fetching: true },
})

export const actionConcatFetchBlogs = (blogs: Blogresponse[]): BlogAction => ({
  type: ACTION_TYPE.CONCAT_FETCH_BLOGS,
  payload: { blogs, fetching: true },
})
