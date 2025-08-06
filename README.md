# Bank Transaction Management System

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GitHub Stars](https://img.shields.io/github/stars/Ridh1234/Bank-management-system?style=for-the-badge)](https://github.com/Ridh1234/Bank-management-system/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/Ridh1234/Bank-management-system?style=for-the-badge)](https://github.com/Ridh1234/Bank-management-system/network/members)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

This is a fully functional **Bank Transaction Management System** built using **Object-Oriented Programming (OOP)** principles. The system simulates real-world banking operations, allowing users to perform transactions, manage multiple accounts, and interactively explore OOP concepts through a clean and modern user interface.

Dive into the world of banking simulations and gain a deeper understanding of OOP by observing its practical application directly within the UI.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [OOP Concepts Explained](#oop-concepts-explained)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Live Demo

Experience the application live:
[Live Demo Here](https://bank-management-system-m2y6.vercel.app/)
## Features

This system offers a comprehensive set of features designed for both practical use and educational insight into OOP:

-   **Guest Access**: Sign-in and sign-up are optional. Users can access all features as a guest without the need to create an account, simplifying the exploration process.
-   **Account Management**: Create and manage multiple bank accounts, including distinct types like Savings and Current accounts, each with unique properties and behaviors.
-   **Transaction Simulation**: Perform core banking transactions:
    -   **Deposit**: Add funds to any chosen account.
    -   **Withdrawal**: Remove funds from an account, with checks for sufficient balance.
    -   **Transfer**: Move funds seamlessly between two accounts within the system.
-   **In-Memory Data Management**: All user data, accounts, and transactions are managed entirely in-memory. This allows for quick setup and demonstration without requiring a backend database.
-   **Interactive OOP Explanations**: Each operation (e.g., creating an account, performing a transaction) triggers a detailed, contextual explanation of the underlying OOP concepts being applied (e.g., Inheritance, Polymorphism, Encapsulation, Abstraction).
-   **Dynamic OOP Visuals**: The UI includes dynamic, interactive visuals that illustrate the flow and interaction of objects and classes as operations are performed, enhancing the learning experience.
-   **Modern User Interface**: A responsive and intuitive UI built with React, Radix UI, and Tailwind CSS ensures a smooth and engaging user experience.

## Technologies Used

The project leverages a modern web development stack to deliver a robust and interactive experience:

-   **Frontend**:
    -   [**TypeScript**](https://www.typescriptlang.org/): A superset of JavaScript that adds static typing, improving code quality and maintainability.
    -   [**React**](https://react.dev/): A declarative, component-based JavaScript library for building user interfaces.
    -   [**Vite**](https://vitejs.dev/): A fast development build tool that significantly improves the frontend development experience.
    -   [**Radix UI**](https://www.radix-ui.com/): A collection of unstyled, accessible UI components for building high-quality design systems. Used for various UI elements like dialogs, menus, and form controls.
    -   [**Tailwind CSS**](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs.
    -   [**React Hook Form**](https://react-hook-form.com/): A performant, flexible, and extensible form library for React.
-   **Package Manager**:
    -   [**Bun**](https://bun.sh/) (indicated by `bun.lockb`): A fast all-in-one JavaScript runtime, bundler, test runner, and package manager. Alternatively, npm/Yarn can be used.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have one of the following installed:

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [Bun](https://bun.sh/docs/installation) (recommended for faster performance based on `bun.lockb`)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Ridh1234/Bank-management-system.git
    cd Bank-management-system
    ```

2.  **Install dependencies:**

    Using Bun (recommended):
    ```bash
    bun install
    ```

    Using npm:
    ```bash
    npm install
    ```

    Using Yarn:
    ```bash
    yarn install
    ```

### Running the Application

After installation, you can start the development server:

Using Bun:
```bash
bun dev
```

Using npm:
```bash
npm run dev
```

Using Yarn:
```bash
yarn dev
```

The application will typically be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

Once the application is running:

1.  **Navigate to the application in your browser.**
2.  **Explore as a Guest**: You can immediately start using the system without creating an account.
3.  **Create Accounts**: Use the "Create Account" option to set up new Savings or Current accounts. Observe how OOP concepts like inheritance are applied when creating different account types.
4.  **Perform Transactions**:
    *   Select an account and use the "Deposit" feature to add funds.
    *   Try "Withdrawal" and notice balance checks.
    *   Experiment with "Transfer" between your created accounts.
5.  **Observe OOP Explanations**: Pay close attention to the pop-ups or dedicated sections that appear after each major action. These explain which OOP principles (e.g., Encapsulation, Polymorphism) are being utilized by the system's internal logic to handle your request.
6.  **Interactive Visuals**: Engage with the dynamic visuals that illustrate the data flow and object interactions.

## Project Structure

The project follows a standard Vite/React application structure:

```
Bank-management-system/
├── public/                 # Static assets (e.g., images, icons)
├── src/                    # Main application source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable UI components (Radix UI based)
│   ├── lib/                # Utility functions, helpers, custom hooks
│   ├── models/             # OOP classes for Bank, Account, Transaction, etc.
│   ├── pages/              # Top-level components for different views/routes
│   ├── App.tsx             # Main React application component
│   ├── main.tsx            # Entry point for the React app
│   └── index.css           # Global styles
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── eslint.config.js        # ESLint configuration
├── components.json         # Configuration for shadcn/ui components (if used)
└── README.md               # This file
```

The `src/models` directory is particularly important as it houses the core OOP implementation for the banking system.

## OOP Concepts Explained

This project serves as a practical demonstration of core Object-Oriented Programming principles:

-   **Encapsulation**: Data (like account balance) and methods (like deposit/withdraw) are bundled together within classes, and access to internal state is controlled.
-   **Inheritance**: Different account types (e.g., `SavingsAccount`, `CurrentAccount`) inherit common properties and behaviors from a base `BankAccount` class, promoting code reuse.
-   **Polymorphism**: Operations like `calculateInterest()` might behave differently based on the specific account type, demonstrating how methods can take on different forms.
-   **Abstraction**: Complex internal logic is hidden from the user, who interacts with simplified interfaces (e.g., `deposit(amount)`).
-   **Classes and Objects**: The entire system is built around defining classes (blueprints for objects) and creating instances (objects) of these classes to represent real-world entities like `Bank`, `Account`, `Customer`, and `Transaction`.

The UI is designed to highlight these concepts as you interact with the system, providing real-time explanations and visual cues.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please ensure your code adheres to the existing style and conventions.

## License

This project is currently without a specified license. For open-source projects, it's highly recommended to choose a license to clarify how others can use, modify, and distribute your work.

**Recommendation:** The [MIT License](https://opensource.org/licenses/MIT) is a permissive free software license, meaning that it permits reuse of software provided all copies of the licensed software include a copy of the MIT License terms and copyright notice. It's a popular choice for open-source projects due to its simplicity and flexibility.

To add the MIT License, you would typically:
1.  Create a `LICENSE` file in the root of your repository.
2.  Paste the content of the MIT License into that file.
3.  Update this `README.md` to include a badge and link to the license file.

## Acknowledgements

-   [Radix UI](https://www.radix-ui.com/) for accessible and unstyled components.
-   [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
-   [Vite](https://vitejs.dev/) for an incredibly fast development experience.
-   [React Hook Form](https://react-hook-form.com/) for efficient form management.
