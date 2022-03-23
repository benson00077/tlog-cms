

# 👉 Description

This project is bootstraped by `creat-react-app`.

This project use `material-ui` and scss for css styling. 

This project use `loadable component` as dependency for code splitting on the auth/protected pages.

This project use `react-router-dom` v6 to handle routings and use context API for logic of directing between auth/protected pages & login page.

This project use `Apollo Client` communicate with back-end api server. Authentication is handled by local storage jwt.


# 👉 Usage
Create `./env.development` as below example: 
```bash
PORT=3002
REACT_APP_SERVER_DEV=http://localhost:3001/graphql # local backend
REACT_APP_SERVER_PRO=https://myDomain/grpahql      # deployed backend
```
`create-react-app` would handle `NODE_ENV` as below:
- `npm run build`, `NODE_ENV='production'`
- `npm run start`, `NODE_ENV='development'`

# 👉 TODO
- backend post data
  - as-is: _id
  - to-be: id   (front-end friendly)
- file / image storage solution
  - Usage: url for poster img and img inside markdown content
  - [google drive](https://stackoverflow.com/a/60168351/16124226) as temparary workaround
  - azure blob