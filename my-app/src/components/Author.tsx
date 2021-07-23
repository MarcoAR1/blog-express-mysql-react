import React from 'react'

interface Props {
    params: {
        id: string
    }
}


const Author = ({ params }: Props): JSX.Element => {

    return (
        <div>
            <h1>Author</h1>
            <p>
                This is the author component.
                {params.id}
            </p>
        </div>
    )
}

export default Author
