import { useNavigate, useRoutes } from 'react-router-dom'
import { ADMIN_URL, COLLECTION_URL, LOGIN_URL, MAIN_URL, REGISTRATION_URL, USER_URL, VERIFY_EMAIL_URL } from './shared/url/routerUrl'

import Auth from './pages/Auth/Auth'
import LoginForm from './pages/Auth/components/LoginForm/LoginForm'
import RegistrationForm from './pages/Auth/components/RegistrationForm/RegistrationForm'
import Main from './pages/Main/Main'
import User from './pages/User/User'
import Collection from './pages/Collection/Collection'
import NotFound from './pages/NotFound/NotFound'
import Admin from './pages/Admin/Admin'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import { useAdmin } from './contexts/DataContext'
import { useEffect } from 'react'
import { isAdminApi } from './shared/api/api'
import { useTheme } from './contexts/UIContext'




function App() {
  const token = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [admin, setAdmin] = useAdmin()
  const [theme] = useTheme()

  useEffect(() => {
    const isAdmin = async () => {
      const res = await isAdminApi()
      if (res.success) {
        setAdmin(true)
      }
    }
    if (token) {
      isAdmin()
    }
  }, [setAdmin, token])

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])

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
      element: <User />
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
      element: <VerifyEmail />
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
