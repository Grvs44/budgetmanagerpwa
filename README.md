# Budget Manager PWA
Budget Manager React app

## dotenv

Create a `.env` file in the root directory with the following properties:

- `VITE_BASE_URL` (required): the path the app will be hosted at
- `VITE_API_URL` (required): the root path of the budgetmanager Django app
- `VITE_VERSION`: the version of the app - can be fixed during development, and set during production build from the value in `package.json`

See `sample.env` for an example
