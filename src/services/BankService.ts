import { User } from '../models/User';
import { Account } from '../models/Account';
import { SavingsAccount } from '../models/SavingsAccount';
import { CurrentAccount } from '../models/CurrentAccount';
import { Transaction } from '../models/Transaction';

// This service demonstrates the Singleton pattern - only one instance exists
export class BankService {
  private static instance: BankService;
  
  private users: Map<string, User> = new Map();
  private accounts: Map<string, Account> = new Map();
  private currentUserId: string | null = null;

  private constructor() {
    // Private constructor to prevent creating multiple instances
  }

  // Get the singleton instance
  public static getInstance(): BankService {
    if (!BankService.instance) {
      BankService.instance = new BankService();
    }
    return BankService.instance;
  }

  // User management
  registerUser(firstName: string, lastName: string, email: string, password: string): User {
    // Check if email already exists
    for (const user of this.users.values()) {
      if (user.email === email) {
        throw new Error("Email already registered");
      }
    }

    const user = new User(firstName, lastName, email, password);
    this.users.set(user.id, user);
    return user;
  }

  createGuestUser(): User {
    // Create a guest user with random data
    const guestId = `guest-${Date.now()}`;
    const user = new User("Guest", "User", guestId, "");
    this.users.set(user.id, user);
    this.currentUserId = user.id;
    
    // Create a default savings and current account for the guest
    this.createSavingsAccount(user.id, 1000, "Guest Savings");
    this.createCurrentAccount(user.id, 2500, "Guest Checking");
    
    return user;
  }

  loginUser(email: string, password: string): User {
    for (const user of this.users.values()) {
      if (user.email === email && user.authenticate(password)) {
        this.currentUserId = user.id;
        return user;
      }
    }
    throw new Error("Invalid email or password");
  }

  logoutUser(): void {
    this.currentUserId = null;
  }

  getCurrentUser(): User | null {
    if (this.currentUserId) {
      return this.users.get(this.currentUserId) || null;
    }
    return null;
  }

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  getUserById(userId: string): User | null {
    return this.users.get(userId) || null;
  }

  // Account management
  createSavingsAccount(userId: string, initialBalance: number, name: string): SavingsAccount {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    const account = new SavingsAccount(userId, initialBalance, name);
    this.accounts.set(account.id, account);
    user.addAccount(account.id);
    
    return account;
  }

  createCurrentAccount(userId: string, initialBalance: number, name: string): CurrentAccount {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    const account = new CurrentAccount(userId, initialBalance, name);
    this.accounts.set(account.id, account);
    user.addAccount(account.id);
    
    return account;
  }

  getAccountById(accountId: string): Account | null {
    return this.accounts.get(accountId) || null;
  }

  getAccountsByUserId(userId: string): Account[] {
    const accounts: Account[] = [];
    for (const account of this.accounts.values()) {
      if (account.userId === userId) {
        accounts.push(account);
      }
    }
    return accounts;
  }

  // Transaction methods
  deposit(accountId: string, amount: number, description?: string): boolean {
    const account = this.accounts.get(accountId);
    if (!account) {
      return false;
    }
    
    account.deposit(amount, description);
    return true;
  }

  withdraw(accountId: string, amount: number, description?: string): boolean {
    const account = this.accounts.get(accountId);
    if (!account) {
      return false;
    }
    
    return account.withdraw(amount, description);
  }

  transfer(
    sourceAccountId: string,
    targetAccountId: string,
    amount: number,
    description?: string
  ): boolean {
    const sourceAccount = this.accounts.get(sourceAccountId);
    const targetAccount = this.accounts.get(targetAccountId);
    
    if (!sourceAccount || !targetAccount) {
      return false;
    }
    
    return sourceAccount.transfer(amount, targetAccount, description);
  }

  // Specific account operations
  applySavingsInterest(accountId: string): boolean {
    const account = this.accounts.get(accountId);
    
    if (!account || !(account instanceof SavingsAccount)) {
      return false;
    }
    
    account.applyInterest();
    return true;
  }

  setCurrentAccountOverdraftLimit(accountId: string, limit: number): boolean {
    const account = this.accounts.get(accountId);
    
    if (!account || !(account instanceof CurrentAccount)) {
      return false;
    }
    
    account.setOverdraftLimit(limit);
    return true;
  }

  // Reset all data - for demo purposes
  resetData(): void {
    this.users = new Map();
    this.accounts = new Map();
    this.currentUserId = null;
  }

  // Add demo data - for testing purposes
  addDemoData(): void {
    // Clear existing data
    this.resetData();
    
    // Add demo users
    const john = this.registerUser("John", "Doe", "john@example.com", "password");
    const jane = this.registerUser("Jane", "Smith", "jane@example.com", "password");
    
    // Add accounts for John
    const johnSavings = this.createSavingsAccount(john.id, 1000, "Vacation Fund");
    const johnCurrent = this.createCurrentAccount(john.id, 2500, "Everyday Spending");
    
    // Add accounts for Jane
    const janeSavings = this.createSavingsAccount(jane.id, 5000, "House Down Payment");
    const janeCurrent = this.createCurrentAccount(jane.id, 1500, "Monthly Bills");
    
    // Add some transactions
    this.deposit(johnSavings.id, 500, "Bonus");
    this.withdraw(johnCurrent.id, 150, "Groceries");
    this.transfer(johnSavings.id, johnCurrent.id, 200, "Moving funds");
    
    this.deposit(janeSavings.id, 1000, "Birthday gift");
    this.withdraw(janeCurrent.id, 75.5, "Electricity bill");
    this.applySavingsInterest(janeSavings.id);
    
    console.log("Demo data loaded successfully!");
  }
}
