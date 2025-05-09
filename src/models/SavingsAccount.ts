
// SavingsAccount class - Demonstrates inheritance and polymorphism
import { Account } from './Account';
import { Transaction, TransactionType } from './Transaction';

export class SavingsAccount extends Account {
  private _interestRate: number;
  private _minimumBalance: number;

  constructor(userId: string, initialBalance: number = 0, name: string = 'Savings Account', interestRate: number = 0.01, minimumBalance: number = 100) {
    super(userId, initialBalance, name);
    this._interestRate = interestRate;
    this._minimumBalance = minimumBalance;
  }

  // Getters
  get interestRate(): number {
    return this._interestRate;
  }

  get minimumBalance(): number {
    return this._minimumBalance;
  }

  // Methods
  deposit(amount: number, description: string = 'Deposit'): void {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }

    const transaction = new Transaction(TransactionType.DEPOSIT, amount, description, null);
    this.addTransaction(transaction);
    this.updateBalance(amount);
  }

  // Polymorphism: Override withdraw method with savings-specific logic
  withdraw(amount: number, description: string = 'Withdrawal'): boolean {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }

    const newBalance = this.balance - amount;
    if (newBalance < this._minimumBalance) {
      return false;
    }

    const transaction = new Transaction(TransactionType.WITHDRAWAL, -amount, description, null);
    this.addTransaction(transaction);
    this.updateBalance(-amount);
    return true;
  }

  // Polymorphism: Implementation of abstract method
  getAccountType(): string {
    return 'Savings';
  }

  // SavingsAccount-specific method
  applyInterest(): void {
    const interestAmount = this.balance * this._interestRate;
    const transaction = new Transaction(
      TransactionType.INTEREST, 
      interestAmount, 
      `Interest applied at ${this._interestRate * 100}%`, 
      null
    );
    this.addTransaction(transaction);
    this.updateBalance(interestAmount);
  }

  // Override toJSON to include savings-specific properties
  toJSON() {
    return {
      ...super.toJSON(),
      interestRate: this._interestRate,
      minimumBalance: this._minimumBalance
    };
  }
}
