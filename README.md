

## Usage
Create `./env.development` as below example: 
```bash
PORT=3002
REACT_APP_SERVER_DEV=http://localhost:3001/graphql # local backend
REACT_APP_SERVER_PRO=https://myDomain/grpahql      # deployed backend
```
`create-react-app` would handle `NODE_ENV` as below:
- `npm run build`, `NODE_ENV='production'`
- `npm run start`, `NODE_ENV='development'`

## TODO
- backend post data
  - as-is: _id
  - to-be: id   (front-end friendly)
- file / image storage solution
  - Usage: url for poster img and img inside markdown content
  - [google drive](https://stackoverflow.com/a/60168351/16124226) as temparary workaround
  - azure blob