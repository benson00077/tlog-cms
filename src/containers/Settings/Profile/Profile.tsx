import { Button, TextField } from '@mui/material'
import { Logout } from '@mui/icons-material'
import client from '../../../graphql/apolloClient'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../components/Auth/useAuth';

function Profile() {

  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const logout = () => {
    // apollo docs: https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
    client.resetStore()

    handleLogout()
    
    navigate({
      pathname: "/login"
    }, {
      replace: true,
    })
  }

  return (
    <>
      <div>

        <div>
          Todo: show user info and Avatar img
        </div>

        <Button variant="contained" endIcon={<Logout />}
          sx={{ width: 100, height: 50 }}
          onClick={logout}
        >
          Logout
        </Button>

      </div>
    </>
  )
}

export default Profile