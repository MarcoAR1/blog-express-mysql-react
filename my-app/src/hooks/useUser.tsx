import { useDispatch, useSelector } from 'react-redux'
import { actionUserLogin } from '../reducers/userReducer'
import Login from '../services/loginService'
import { initialState } from '../store'

export const useUser = () => {
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


    return { handleLogin, User }
}


