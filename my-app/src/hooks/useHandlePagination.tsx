import { useEffect, useState } from 'react'
import { useLocation } from "wouter"
import { IuseHandlePaginationProps, IuseHandlePaginationState } from '../components/Interface'


const useHandlePagination = ({ params, getBlogPage, handleGetLengthBlog }: IuseHandlePaginationProps): IuseHandlePaginationState => {
    const [location, setLocation] = useLocation()
    const [currentPage, setCurrentPage] = useState(params.page ? +params.page : 1)
    const [slice, setSlice] = useState({ last: null })
    const [count, setCount] = useState(1)

    const handlePaginationChange = (page: number): void => {
        if (page === currentPage) return

        setLocation(`/${page}/`)
        if (slice[page]) {
            setCurrentPage(page)
            return
        }

        if (page === count) {
            getBlogPage({ page: page - 1, filter: 'updateAt', order: 'DESC', concat: true }).then(({ length }) => {
                setSlice((prev) => ({ ...prev, [page]: [prev[prev.last][1], prev[prev.last][1] + length], last: page }))
                setCurrentPage(page)
            })
            return
        }

        getBlogPage({ page: page - 1, filter: 'updateAt', order: 'DESC', concat: true }).then(() => {
            setSlice((prev) => ({ ...prev, [page]: [prev[prev.last][1], prev[prev.last][1] + 9], last: page }))
            setCurrentPage(page)
        })

    }


    useEffect(() => {
        const currentPage = params.page ? +params.page : 1
        getBlogPage({ page: currentPage - 1, filter: 'updateAt', order: 'DESC', concat: false }).then(({ length }) => {
            setSlice((prev) => ({ ...prev, [currentPage]: [0, length], last: currentPage }))
        })
        setCurrentPage(currentPage)
        handleGetLengthBlog().then((res) => setCount(Math.ceil(+res / 9))).catch(console.error)
    }, [])


    return { handlePaginationChange, count, currentPage, slice, location }
}

export default useHandlePagination
