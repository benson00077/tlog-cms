import { useLazyQuery } from '@apollo/client'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/Auth/useAuth'
import { LOGIN } from './typeDefs'

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
  const { handleSubmit, getFieldProps, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      login({
        variables: { input: { ...values } }
      })
    }
  })

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div>login page</div>
        <div></div>
        <label>
          Email -
          <input
            id="email"
            type="text"
            {...getFieldProps("email")} //name prop for formik
          />
        </label>
        <label>
          Passowrd -
          <input
            id="passowrd"
            type="password"
            {...getFieldProps("password")} //name prop for formik
          />
        </label>
        <p>Forgot your password?</p>
        <button type="submit" disabled={(called && loading)}>To use Mui Btn</button>
      </form>
    </main>
  )
}

export default Login