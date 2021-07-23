import React from 'react'
import './styles/normalize.css'
import './styles/backgoundStyle.css'
import Layaout from './components/Layaout'
import RouterManager from './components/Router'
import { useBlog } from './hooks/useBlog'
import useLogin from './hooks/useLogin'


function App(): JSX.Element {
  useLogin()
  useBlog()
  return (
    <Layaout>
      <RouterManager />
    </Layaout>
  )
}

export default App
