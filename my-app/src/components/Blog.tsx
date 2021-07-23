import React from 'react'


interface Props {
    params: {
        id: string
    }
}


const Blog = ({ params }: Props): JSX.Element => {
    return (
        <div>
            <h1>title</h1>
            <div>{params.id}</div>
        </div>
    )
}

export default Blog
