# React Search with Pagination and API Integration

This is a simple React application that demonstrates pagination based on search with API integration using React Paginate.

## Description

The application fetches data about countries from an API and displays it in a paginated table. It includes functionality for searching countries and changing the number of items displayed per page.

## Features

- Pagination of country data
- Search functionality to filter countries
- Dynamically changing the number of items displayed per page

## Installation

1. Clone this repository:

```bash
git clone https://github.com/KrunalKhichi/solvative-task.git
```

2. Navigate to the cloned repository:

```
cd solvative-task
npm install
```

## Usage 

Configure environment variables:
- Create a `.env` file in the root directory of the project.
- Define the API base URL and any other necessary environment variables in the `.env` file. For example:

```
REACT_APP_API_KEY=your_env_key
REACT_APP_BASE_URL=https://wft-geo-db.p.rapidapi.com/v1/geo
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
