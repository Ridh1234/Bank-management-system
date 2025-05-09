
// Account abstract class - Demonstrates abstraction
import { Transaction, TransactionType } from './Transaction';

// Using abstract class for demonstration of abstraction
export abstract class Account {
  private _id: string;
  private _userId: string;
  private _balance: number;
  private _transactions: Transaction[] = [];
  private _name: string;
  private _createdAt: Date;

  constructor(userId: string, initialBalance: number = 0, name: string = 'Account') {
    this._id = crypto.randomUUID();
    this._userId = userId;
    this._balance = initialBalance;
    this._name = name;
    this._createdAt = new Date();
    
    // Record initial deposit if balance is positive
    if (initialBalance > 0) {
      this.addTransaction(
        new Transaction(
          TransactionType.DEPOSIT, 
          initialBalance, 
          'Initial deposit', 
          null
        )
      );
    }
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get balance(): number {
    return this._balance;
  }

  get name(): string {
    return this._name;
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  get transactions(): Transaction[] {
    return [...this._transactions]; // Return a copy to prevent direct modification
  }

  // Setters
  set name(value: string) {
    if (value.trim().length === 0) {
      throw new Error("Account name cannot be empty");
    }
    this._name = value;
  }

  // Methods
  protected addTransaction(transaction: Transaction): void {
    this._transactions.push(transaction);
  }

  protected updateBalance(amount: number): void {
    this._balance += amount;
  }

  // Abstract methods to be implemented by derived classes
  abstract deposit(amount: number, description?: string): void;
  abstract withdraw(amount: number, description?: string): boolean;
  abstract getAccountType(): string;

  // Method to transfer money to another account
  transfer(amount: number, targetAccount: Account, description?: string): boolean {
    if (this.withdraw(amount, `Transfer to ${targetAccount.name}`)) {
      targetAccount.deposit(amount, `Transfer from ${this.name}`);
      return true;
    }
    return false;
  }

  // Create a plain object for serialization
  toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      balance: this._balance,
      name: this._name,
      createdAt: this._createdAt,
      transactions: this._transactions.map(t => t.toJSON()),
      accountType: this.getAccountType()
    };
  }
}
