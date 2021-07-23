const url = '/api/login'

const Login = async (data) => {
    try {
        const req = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        const response = await req.json()
        return response
    } catch (e) {
        return e
    }
}

export default Login
