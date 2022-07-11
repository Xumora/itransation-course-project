import { useNavigate, useRoutes } from 'react-router-dom'
import { ADMIN_URL, COLLECTION_URL, LOGIN_URL, MAIN_URL, REGISTRATION_URL, TAG_PAGE, USER_URL, VERIFY_EMAIL_URL } from './shared/url/routerUrl'
import { useAdmin, useMainPageSearch } from './contexts/DataContext'
import { useEffect } from 'react'
import { isAdminApi } from './shared/api/api'
import { useTheme } from './contexts/UIContext'

import Auth from './pages/Auth/Auth'
import LoginForm from './pages/Auth/components/LoginForm/LoginForm'
import RegistrationForm from './pages/Auth/components/RegistrationForm/RegistrationForm'
import Main from './pages/Main/Main'
import User from './pages/User/User'
import Collection from './pages/Collection/Collection'
import NotFound from './pages/NotFound/NotFound'
import Admin from './pages/Admin/Admin'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'
import Tag from './pages/Tag/Tag'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

function App() {
  const token = JSON.parse(localStorage.getItem('token'))
  const userInfo = localStorage.getItem('userInfo')
  const navigate = useNavigate()
  const [admin, setAdmin] = useAdmin()
  const [theme] = useTheme()
  const [setMainPageSearch] = useMainPageSearch(true)

  useEffect(() => {
    if (theme === 'night') {
      document.documentElement.setAttribute('data-color-mode', 'dark')
    } else if (theme === 'day') {
      document.documentElement.setAttribute('data-color-mode', 'light')
    }
  }, [theme])

  useEffect(() => {
    const isAdmin = async () => {
      const res = await isAdminApi()
      if (res.success) {
        setAdmin(true)
      } else {
        if (res.message === 'Token is not valid') {
          setAdmin(false)
          setMainPageSearch('')
          localStorage.removeItem('token')
          localStorage.removeItem('userInfo')
          navigate(LOGIN_URL)
        }
      }
    }
    if (token) {
      isAdmin()
    }
  }, [setAdmin, token, navigate, setMainPageSearch])

  useEffect(() => {
    if (!token && window.location.pathname !== REGISTRATION_URL) {
      navigate(LOGIN_URL)
    } else if (token) {
      navigate(MAIN_URL && window.location.pathname === LOGIN_URL)
    }
  }, [token, navigate])

  let routes = useRoutes([
    {
      path: LOGIN_URL,
      element: <Auth />,
      children: [
        {
          path: '',
          element: <LoginForm />
        },
        {
          path: REGISTRATION_URL,
          element: <RegistrationForm />
        }
      ]
    },
    {
      path: MAIN_URL,
      element: <Main />,
    },
    {
      path: `${USER_URL}/:userId`,
      element: userInfo !== 'guest' && <User />
    },
    {
      path: `${COLLECTION_URL}/:collectionId`,
      element: <Collection />
    },
    {
      path: ADMIN_URL,
      element: admin && <Admin />
    },
    {
      path: VERIFY_EMAIL_URL,
      element: userInfo !== 'guest' && <VerifyEmail />
    },
    {
      path: `${TAG_PAGE}/:tagName`,
      element: <Tag />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return <div className={`app ${theme}`}>
    {routes}
  </div>
}

export default App
