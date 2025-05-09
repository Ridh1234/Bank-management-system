# Bank Transaction Management System

This is a fully functional **Bank Transaction Management System** built using **Object-Oriented Programming (OOP)** principles. The system simulates real-world banking operations, allowing users to perform transactions, manage multiple accounts, and explore OOP concepts interactively through a clean and modern UI.

## Features

- **Guest Access**: Sign-in and sign-up are optional. Users can access all features as a guest without the need to create an account.
- **Account Management**: Create and manage multiple bank accounts (Savings and Current).
- **Transactions**: Simulate deposit, withdrawal, and transfer between accounts.
- **In-Memory Data**: All user data, accounts, and transactions are managed in-memory without a backend.
- **OOP Concepts Explanation**: Each operation (like creating an account or performing a transaction) triggers a detailed explanation of the OOP concepts being used behind the scenes.
- **OOP Visuals**: Dynamic, interactive class diagrams and concept explanations appear on the UI, helping users understand concepts like inheritance, encapsulation, polymorphism, and more.
- **Class-Based Architecture**: The code follows an object-oriented design using classes, inheritance, encapsulation, and abstraction to manage users, accounts, and transactions.

## Technologies Used

- **Frontend**: JavaScript or TypeScript (React)
- **State Management**: React's `useState` or `useReducer`, Context API
- **Styling**: Tailwind CSS or Chakra UI
- **Data Management**: In-memory objects for users, accounts, and transactions
- **OOP Design**: Encapsulation, Inheritance, Polymorphism, Abstraction

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/bank-transaction-management-system.git
   cd bank-transaction-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

4. Open your browser and go to http://localhost:3000 to view the app.

## Usage

- **Sign In/Sign Up**: Optional. You can use the system as a guest without creating an account.
- **Account Creation**: Create new accounts (Savings or Current) from the dashboard.
- **Transactions**: Deposit, withdraw, or transfer money between accounts.
- **OOP Concept Education**: After each action, OOP concepts such as inheritance, encapsulation, polymorphism, and abstraction are explained through tooltips and overlays.

## OOP Concepts Explained

- **Class**: Represents blueprints for user accounts (e.g., SavingsAccount, CurrentAccount).
- **Object**: Instances of classes, such as a specific user or an account.
- **Inheritance**: SavingsAccount and CurrentAccount inherit from the Account class.
- **Encapsulation**: Data such as account balance is encapsulated within each account object and can only be accessed or modified through specific methods.
- **Polymorphism**: Different behaviors (e.g., transaction limits) are implemented in child classes (SavingsAccount, CurrentAccount) via method overriding.
- **Abstraction**: The Account class provides a general template, while specific account types implement their unique details.

## Project Structure

```
/src
  /components
    AccountCard.js
    Dashboard.js
    TransactionList.js
    TooltipOverlay.js
  /classes
    Account.js
    SavingsAccount.js
    CurrentAccount.js
    User.js
    Transaction.js
  /contexts
    UserContext.js
    AccountContext.js
  /utils
    helpers.js
  /assets
    /images
    /icons
  App.js
  index.js
  styles.css
```

## Contributing

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
