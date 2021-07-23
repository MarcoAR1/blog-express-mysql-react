interface User {
  user_id: number
  name: string
  author: string
  username: string
  token: string
  avatar: string
}

export interface UserReducerState {
  isFetching: boolean
  user: User
}

interface UserAction {
  type: string
  payload: User
}

const ACTION_TYPE = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
}

export const userReducer = (
  state: UserReducerState = {
    isFetching: false,
    user: {
      user_id: 0,
      name: '',
      author: '',
      username: '',
      token: '',
      avatar: '',
    },
  },
  { type, payload }: UserAction
): UserReducerState => {
  if (type === ACTION_TYPE.USER_LOGIN)
    return {
      ...state,
      user: payload,
      isFetching: true,
    }

  if (type === ACTION_TYPE.USER_LOGOUT)
    return {
      ...state,
      user: {
        user_id: 0,
        name: '',
        author: '',
        username: '',
        token: '',
        avatar: '',
      },
      isFetching: false,
    }

  return state
}

export const actionUserLogin = (data: User): UserAction => ({
  type: ACTION_TYPE.USER_LOGIN,
  payload: data,
})

export const actionUserLogOut = (): UserAction => ({
  type: ACTION_TYPE.USER_LOGOUT,
  payload: null,
})
