

# 👉 Description

Tihs project is hosted on VPS by Nginx.

This project is bootstraped by `creat-react-app`.

This project use `material-ui` and scss for css styling. 

This project use `loadable component` as dependency for code splitting on the auth/protected pages.

This project use `react-router-dom` v6 to handle routings and use context API for logic of directing between auth/protected pages & login page.

This project use `Apollo Client` to communicate w/ back-end api server. Authentication is handled by local storage jwt.


# 👉 Usage
Create `./env.development` as below example: 
```bash
# for all env
PORT=3002
REACT_APP_SERVER_DEV=http://localhost:3001/graphql # local backend
REACT_APP_SERVER_PRO=https://myDomain/grpahql      # deployed backend

# for Production env
PUBLIC_URL=<MyDomainName>/subdirectory    # for bundle static files
REACT_APP_URL_SUBDIRECTORY=/subdirectory  # for react router
```
`create-react-app` would handle `NODE_ENV` as below:
- `npm run build`, `NODE_ENV='production'`
- `npm run start`, `NODE_ENV='development'`

Also, for production you sould add npm script `homepage` property, where /subdirectory is same as REACT_APP_URL_SUBDIRECTORY set in .env file.
```json
{
  ...
  "script": {
    ...
  },
  "homepage": "myDomain.www/subdirectory" 
}
```

Use `npm run buildWithSourceMap` to bundle.

# 👉 TODO
- backend post data
  - as-is: _id
  - to-be: id   (front-end friendly)
- file / image storage solution
  - Usage: url for poster img and img inside markdown content
  - [google drive](https://stackoverflow.com/a/60168351/16124226) as temparary workaround
  - azure blob