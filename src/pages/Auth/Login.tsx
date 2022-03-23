import { useLazyQuery } from '@apollo/client'
import { Box, Button, TextField} from '@mui/material'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth/useAuth'
import { LOGIN } from './typeDefs'
import './Login.scss'
import { onError } from '@apollo/client/link/error'

function Login() {

  const navigate = useNavigate()

  const { handleLogin } = useAuth();

  const [login, { called, loading }] = useLazyQuery(LOGIN, {
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {

      handleLogin(data.login.access_token, data.login._id)
      navigate({
        pathname: "/"
      })
    }
  })

  /* Formik */
  const initialValues = {
    email: '',
    password: '',
  }
  const validationSchema = {}
  const { values, handleSubmit, getFieldProps, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      login({
        variables: { input: { ...values } }
      })
    }
  })

  return (
    <main className='loginRoot'>
      <form className='loginForm' onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
        >
          <TextField
            size='small'
            label="Email"
            type="text"
            {...getFieldProps("email")} //name prop for formik
          />
          <TextField
            size='small'
            label="Password"
            type="password"
            color="secondary"
            {...getFieldProps("password")} //name prop for formik
          />
        </Box>
        <Button type="submit" color="primary" variant="contained" 
          className='loginBtn'
          disabled={(values.email && values.password) ? false : true}>
          {loading ? "Loading...🥳" : "Let me in 👀"}
        </Button>
      </form>
    </main >
  )
}

export default Login