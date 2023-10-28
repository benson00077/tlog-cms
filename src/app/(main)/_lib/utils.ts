
const serverURI = process.env.NEXT_PUBLIC_API_GQL_URL
const SsrUser = {
  email: process.env.SSR_USER_EMAIL,
  password: process.env.SSR_USER_PWD
}

if (!serverURI) throw new Error('❌ Please provide NEXT_PUBLIC_API_GQL_URL .env.development or .env.production.')

const loginQuery = `
    query Login($input: LoginInput!) {
      login(input: $input) {
        _id
        username
        access_token
        role
        createdAt
        updatedAt
      }
    }
  `

const fetchJwt = async ({ email, password }: { email: string, password: string }) => {
  try {
    const res = await fetch(serverURI!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: loginQuery,
        variables: {
          input: { email, password }
        }
      })
    })
    const jsn = await res.json()
    if (jsn.errors) throw new Error(jsn.errors[0].message)
    return jsn.data.login.access_token as string
  } catch (err) {
    console.warn(err)
    throw new Error('Is your backend app working ?')
  }
}

export function jwtRetrive() {
  const token = window.localStorage.getItem('token')
  if (!token) throw new Error('No token in localStorage')
  return token
}

export async function jwtLogin(email: string, password: string) {
  return await fetchJwt({ email, password })
}

/**
 * Usage: RSC first render on server, use pre-defined user to render. 
 * NOTICE: It means there would be buggy when different user have different pages.
 */
export async function jwtSsr() {
  if (!SsrUser.email || !SsrUser.password) throw new Error('❌ Please provide process.env.SSR_USER_EMAIL && process.env.SSR_USER_PWD in .env.development or .env.production.')
  return await fetchJwt({ email: SsrUser.email, password: SsrUser.password})
}



export function timeStampFilter(timestamp: string) {
  // const timestamp = "2022-03-30T06:09:27.615Z";
  const date = new Date(timestamp);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };
  const formattedDate = date.toLocaleDateString('zh-TW', options);
  return formattedDate
}
