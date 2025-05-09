
// Transaction class - For tracking account activities
export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
  INTEREST = 'interest',
  FEE = 'fee'
}

export class Transaction {
  private _id: string;
  private _type: TransactionType;
  private _amount: number;
  private _description: string;
  private _timestamp: Date;
  private _targetAccountId: string | null;

  constructor(type: TransactionType, amount: number, description: string, targetAccountId: string | null) {
    this._id = crypto.randomUUID();
    this._type = type;
    this._amount = amount;
    this._description = description;
    this._timestamp = new Date();
    this._targetAccountId = targetAccountId;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get type(): TransactionType {
    return this._type;
  }

  get amount(): number {
    return this._amount;
  }

  get description(): string {
    return this._description;
  }

  get timestamp(): Date {
    return new Date(this._timestamp);
  }

  get targetAccountId(): string | null {
    return this._targetAccountId;
  }

  // Create a plain object for serialization
  toJSON() {
    return {
      id: this._id,
      type: this._type,
      amount: this._amount,
      description: this._description,
      timestamp: this._timestamp,
      targetAccountId: this._targetAccountId
    };
  }
}
