import { Button, TextField } from '@mui/material'
import { Logout } from '@mui/icons-material'
import client from '../../../graphql/apolloClient'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const navigate = useNavigate();

  const ClearStore = () => {
    // apollo docs: https://www.apollographql.com/docs/react/networking/authentication/#reset-store-on-logout
    client.resetStore()

    window.localStorage.clear()
    navigate({
      pathname: "/login"
    }, {
      replace: true,
    })

    // TODO: Prevent user go back last page after logout
    // replace current window.history state ?
  }

  return (
    <>
      <div>

        <div>
          Todo: show user info and Avatar img
        </div>

        <Button variant="contained" endIcon={<Logout />}
          sx={{ width: 100, height: 50 }}
          onClick={ClearStore}
        >
          Logout
        </Button>

      </div>
    </>
  )
}

export default Profile