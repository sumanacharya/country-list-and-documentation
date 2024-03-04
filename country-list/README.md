# Country list

This project is a React application that utilizes TypeScript to provide a user-friendly interface for viewing details of countries. It uses the REST Countries API to fetch and display country-specific information.

## Features

- **Country listing**: View list of countries.
- **Country search**: search specific country.
- **Country Details**: View detailed information about a country, including its name, population, demonyms, and flag.

## Technologies Used

To bootstrap the application, vite - https://vitejs.dev/ was used:

```bash
npm create vite@latest my-react-app -- --template react
```

Technologies used:

- React
- TypeScript
- Tailwind CSS
- Axios for API requests
- Material-UI components
- Node.js (v20.11.0)

## Setup

To run this project locally, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory.

   ```bash
   cd <project-directory>
   ```

3. Install the dependencies.

   ```bash
   npm install
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

5. see the list of available scripts to run.

   ```bash
   npm run
   ```

The application should now be running on `http://localhost:5173`.

## Building the Project

Generate a production-ready build by running:

```bash
npm run build
```

## API Reference

This project uses the [REST Countries API](https://restcountries.com/) to fetch countries' data.
