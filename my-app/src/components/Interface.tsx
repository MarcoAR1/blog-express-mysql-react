
//useHandlePagination

export interface IuseHandlePaginationProps {
    params: { page: number }
    getBlogPage: ({ page, filter, order, concat }) => Promise<{ length: number }>
    handleGetLengthBlog: () => Promise<number | { message: string }>
}

export interface IuseHandlePaginationState {
    count: number
    currentPage: number
    slice: { [page: number]: [number, number] }
    location: string
    handlePaginationChange: (page: number) => void
}


//