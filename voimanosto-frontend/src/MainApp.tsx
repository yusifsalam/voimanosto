import React, { useState, useEffect } from 'react'
import TopMenu from './components/TopMenu'
import SideBar from './components/SideBar'
import MainContent from './components/MainContent'
import logo from './components/PointCalculator/new_logo.svg'
import workoutService from './services/workoutService'
import loginService from './services/loginService'
import { IUser } from './types'

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<null | IUser>(null)
  const [isMobile, setIsMobile] = useState(false)

  function updateDimensions() {
    if (window.innerWidth <= 900) {
      setIsMobile(true)
    } else setIsMobile(false)
  }

  useEffect(() => {
    const verifyUser = async () => {
      const loggedUserToken = window.localStorage.getItem('loggedUser')
      if (loggedUserToken) {
        const user = await loginService.verify(loggedUserToken)
        user.token = loggedUserToken
        setUser(user)
        workoutService.setToken(loggedUserToken)
        setLoggedIn(true)
      }
    }

    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      )
    ) {
      setIsMobile(true)
      document.body.style.zoom = '80%'
    }

    verifyUser()
    window.addEventListener('resize', updateDimensions)
  }, [])

  return (
    <div>
      <TopMenu logo={logo} />
      <SideBar loggedIn={loggedIn} isMobile={isMobile} />
      <MainContent
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        setUser={setUser}
        isMobile={isMobile}
      />
    </div>
  )
}

export default App
