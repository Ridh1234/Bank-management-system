
// CurrentAccount class - Demonstrates inheritance and polymorphism
import { Account } from './Account';
import { Transaction, TransactionType } from './Transaction';

export class CurrentAccount extends Account {
  private _overdraftLimit: number;

  constructor(userId: string, initialBalance: number = 0, name: string = 'Current Account', overdraftLimit: number = 500) {
    super(userId, initialBalance, name);
    this._overdraftLimit = overdraftLimit;
  }

  // Getters
  get overdraftLimit(): number {
    return this._overdraftLimit;
  }

  get availableBalance(): number {
    return this.balance + this._overdraftLimit;
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

  // Polymorphism: Override withdraw method with current-specific logic
  withdraw(amount: number, description: string = 'Withdrawal'): boolean {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }

    if (this.balance - amount < -this._overdraftLimit) {
      return false;
    }

    const transaction = new Transaction(TransactionType.WITHDRAWAL, -amount, description, null);
    this.addTransaction(transaction);
    this.updateBalance(-amount);
    return true;
  }

  // Polymorphism: Implementation of abstract method
  getAccountType(): string {
    return 'Current';
  }

  // CurrentAccount-specific method
  setOverdraftLimit(limit: number): void {
    this._overdraftLimit = limit;
  }

  // Override toJSON to include current-specific properties
  toJSON() {
    return {
      ...super.toJSON(),
      overdraftLimit: this._overdraftLimit,
      availableBalance: this.availableBalance
    };
  }
}
