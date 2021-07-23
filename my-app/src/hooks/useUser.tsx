import { useDispatch, useSelector } from 'react-redux'
import { actionUserLogin, actionUserLogOut, UserReducerState } from '../reducers/userReducer'
import Login from '../services/loginService'
import { initialState } from '../store'

export interface IuseUserReturn {
    handleLogin: ({ e, handleMessageNotification, username, password }: IhandleLoginParams) => void
    handleLogOut: () => void
    User: UserReducerState
}

export interface IhandleLoginParams {
    e: Event
    handleMessageNotification: (message: string) => void
    username: string
    password: string
}


export const useUser = (): IuseUserReturn => {
    const User = useSelector(({ user }: initialState) => user)
    const dispatch = useDispatch()

    const handleStateLogIn = (user) => {
        dispatch(actionUserLogin(user))
    }

    const handleLogin = async ({ e, handleMessageNotification, username, password }) => {
        e.preventDefault()
        const data = await Login({ username, password })
        if (data.message) {
            return handleMessageNotification(data.message)
        }
        window.localStorage.setItem('infoUser', JSON.stringify(data))
        return handleStateLogIn(data)
    }

    const handleLogOut = (): void => {
        dispatch(actionUserLogOut())
    }


    return { handleLogin, handleLogOut, User }
}


