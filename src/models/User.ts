
// User class - Demonstrates encapsulation with private fields
export class User {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _password: string;
  private _accounts: string[] = [];

  constructor(firstName: string, lastName: string, email: string, password: string) {
    this._id = crypto.randomUUID();
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._password = password;
  }

  // Getters - Part of encapsulation, providing controlled access to private data
  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  get email(): string {
    return this._email;
  }

  get accounts(): string[] {
    return [...this._accounts]; // Return a copy to prevent direct modification
  }

  // Setters - Part of encapsulation, providing controlled modification of private data
  set firstName(value: string) {
    if (value.trim().length === 0) {
      throw new Error("First name cannot be empty");
    }
    this._firstName = value;
  }

  set lastName(value: string) {
    if (value.trim().length === 0) {
      throw new Error("Last name cannot be empty");
    }
    this._lastName = value;
  }

  set email(value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error("Invalid email format");
    }
    this._email = value;
  }

  // Methods
  addAccount(accountId: string): void {
    this._accounts.push(accountId);
  }

  removeAccount(accountId: string): void {
    this._accounts = this._accounts.filter(id => id !== accountId);
  }

  // Authentication method
  authenticate(password: string): boolean {
    return this._password === password;
  }

  // Create a plain object for serialization
  toJSON() {
    return {
      id: this._id,
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      accounts: [...this._accounts],
    };
  }
}
