import React from 'react'
import NavBar from './NavBar'
import '../styles/LayaoutStyle.css'

interface Props {
    children: JSX.Element
}

const Layaout = ({ children }: Props): JSX.Element => {
    return (
        <div className='viewport'>
            <NavBar />
            {children}
        </div>
    )
}

export default Layaout
