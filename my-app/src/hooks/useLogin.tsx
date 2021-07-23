import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { actionUserLogin } from "../reducers/userReducer"


const useLogin = (): void => {
    const dispatch = useDispatch()

    const handleStateLogIn = (user) => {
        dispatch(actionUserLogin(user))
    }

    useEffect(() => {
        const userInfo = window.localStorage.getItem('infoUser')
        if (userInfo) {
            const data = JSON.parse(userInfo)
            return handleStateLogIn(data)
        }
    }, [])
}

export default useLogin
