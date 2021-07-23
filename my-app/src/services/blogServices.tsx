import store from '../store'

const url = '/api/blog'

let userToken = {
    headers: {
        'Authorization': ''
    }
}

const setTokens = (string: string) => {
    return {
        headers: {
            'Authorization': `Bearer ${string}`
        }
    }
}
store.subscribe(() => {
    const { user } = store.getState()
    userToken = setTokens(user.user.token)
})

export interface BlogPagination {
    page: number
    filter: string
    order: string
}
export interface Blogresponse {
    blog_id: number
    contentText: string
    title: string
    createdAt: string
    updatedAt: string
    img: string
    author: string
    avatar: string
}


export const getBlogsPaginated = async ({ page, filter, order }: BlogPagination): Promise<{ message: string } | Blogresponse[]> => {
    try {
        const req = await fetch(url + '/' + filter + '/' + order + '/' + page)
        const response = await req.json()
        return response
    } catch (e) {
        return e
    }
}


export const getLengthBlog = async (): Promise<number | { message: string }> => {
    try {
        const req = await fetch(url + '/length')
        const response = await req.json()
        return response.length
    } catch (error) {
        console.log(error)
        return { message: 'error' }
    }
}



