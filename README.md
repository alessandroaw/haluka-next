# **`haluka-next`**

## **Project Description**

**`haluka-next`** is an admin dashboard web application designed for managing phone booth activities, billing, and transactions for an Islamic boarding school in Indonesia. The application helps the school to limit and monitor students' communication with external parties, including their families, while providing a controlled phone booth system for students to communicate with their loved ones.

## **Features**

- Admin and cashier role-based access
- Booth monitoring and management
- Call history tracking and filtering
- Account management for users
- Pricing and billing management

## **Technology Stack**

- **[Next.js](https://nextjs.org/)**: A React framework for server-rendered applications.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly-typed superset of JavaScript that compiles to plain JavaScript.
- **[Material-UI](https://mui.com/)**: A popular React UI framework for designing responsive and accessible applications.
- **[SWR](https://swr.vercel.app/)**: A React Hooks library for data fetching and caching.

## **Getting Started**

1. Clone this repository to your local machine.
2. Create env.local file containing `NEXT_PUBLIC_BASE_URL`
3. Run **`yarn`** to install the necessary dependencies.
4. Run **`yarn dev`** to start the development server.
5. Open your browser and navigate to **`http://localhost:3000`** to view the application.

## **Project Structure**

The project follows a modular structure, with components, hooks, and utilities organized in the **`src`** directory. The main sections of the project are:

- **`components`**: Contains all reusable UI components used across the application.
- **`modules`**: Contains the main feature modules such as booth monitoring, call history, login, and settings.
- **`pages`**: Contains the main pages of the application, organized by user role (admin and cashier).
- **`repositories`**: Contains the API client functions to interact with the backend services.
- **`shared-hooks`**: Contains custom hooks used across the application for handling common functionalities.
- **`swr-cache`**: Contains SWR hooks for data fetching and caching.
- **`themes`**: Contains the application's theme configuration, including colors and typography.
- **`types`**: Contains TypeScript type definitions for models, parameters, and queries.
- **`utils`**: Contains utility functions and constants used throughout the application.

## **Contributing**

Feel free to submit issues and/or pull requests if you have suggestions or improvements for this project. Your contributions are always welcome!