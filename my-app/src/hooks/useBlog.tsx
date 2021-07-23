import { useDispatch, useSelector } from "react-redux"
import { initialState } from "../store"

import { getBlogsPaginated, getLengthBlog } from "../services/blogServices"
import { actionConcatFetchBlogs, actionFetchBlogs, BlogState } from "../reducers/blogReducer"


interface BlogHook {
    getBlogPage: ({ page, filter, order, concat }: getBlogPageProps) => Promise<getBlogPageReturn>
    Blogs: BlogState
    handleGetLengthBlog: () => Promise<number | { message: string }>
}

export interface getBlogPageProps {
    page: number
    filter: string
    order: string
    concat: boolean
}
interface getBlogPageReturn {
    message: string
    length: number
}

export const useBlog = (): BlogHook => {
    const Blogs = useSelector(({ blog }: initialState) => blog)
    const dispatch = useDispatch()


    const getBlogPage = async ({ page, filter, order, concat }: getBlogPageProps): Promise<getBlogPageReturn> => {
        const data = await getBlogsPaginated({ page, filter, order })

        if ('message' in data) {
            return { message: data.message, length: 0 }
        }

        if (concat) {
            dispatch(actionConcatFetchBlogs(data.map(e => ({ ...e, img: JSON.parse(e.img) }))))
            return { message: "success", length: data.length }
        }


        dispatch(actionFetchBlogs(data.map(e => ({ ...e, img: JSON.parse(e.img) }))))
        return { message: "success", length: data.length }
    }

    const handleGetLengthBlog = async (): Promise<number | { message: string }> => {
        const length = await getLengthBlog()
        return length
    }

    return {
        getBlogPage,
        Blogs,
        handleGetLengthBlog
    }
}