import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useBank } from '@/contexts/BankContext';
import { toast } from 'sonner';
import { OOPConcept } from './OOPConcept';

interface CreateAccountFormProps {
  onClose: () => void;
}

export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onClose }) => {
  const { createSavingsAccount, createCurrentAccount } = useBank();
  
  const [name, setName] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [accountType, setAccountType] = useState('savings');
  const [loading, setLoading] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const balance = parseFloat(initialBalance);
      
      if (isNaN(balance) || balance < 0) {
        toast.error('Please enter a valid amount');
        return;
      }
      
      let success = false;
      
      if (accountType === 'savings') {
        const account = await createSavingsAccount(name, balance);
        success = !!account;
      } else {
        const account = await createCurrentAccount(name, balance);
        success = !!account;
      }
      
      if (success) {
        toast.success(`Your new ${accountType} account has been created!`);
        setShowConcept(true);
      }
    } catch (error) {
      toast.error('Failed to create account');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const inheritanceCode = `
// Account (Parent/Base Class)
export abstract class Account {
  private _id: string;
  private _userId: string;
  private _balance: number;
  // ...other properties
  
  constructor(userId: string, initialBalance: number = 0, name: string = 'Account') {
    this._id = crypto.randomUUID();
    this._userId = userId;
    this._balance = initialBalance;
    // ...initialization
  }
  
  // Abstract method to be implemented by child classes
  abstract getAccountType(): string;
}

// SavingsAccount (Child/Derived Class)
export class SavingsAccount extends Account {
  private _interestRate: number;
  
  constructor(userId: string, initialBalance: number = 0, name: string = 'Savings Account', interestRate: number = 0.01) {
    // Call parent constructor
    super(userId, initialBalance, name);
    this._interestRate = interestRate;
  }
  
  // Implement required abstract method
  getAccountType(): string {
    return 'Savings';
  }
}

// CurrentAccount (Child/Derived Class)
export class CurrentAccount extends Account {
  private _overdraftLimit: number;
  
  constructor(userId: string, initialBalance: number = 0, name: string = 'Current Account', overdraftLimit: number = 500) {
    // Call parent constructor
    super(userId, initialBalance, name);
    this._overdraftLimit = overdraftLimit;
  }
  
  // Implement required abstract method
  getAccountType(): string {
    return 'Current';
  }
}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Open a New Account</CardTitle>
          <CardDescription>
            Fill out the form to create a new bank account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Account Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Vacation Fund"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="initial-balance">Initial Deposit ($)</Label>
                <Input
                  id="initial-balance"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={initialBalance}
                  onChange={(e) => setInitialBalance(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Account Type</Label>
                <RadioGroup 
                  value={accountType} 
                  onValueChange={setAccountType}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="savings" id="savings" />
                    <Label htmlFor="savings" className="font-normal">
                      Savings
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="current" id="current" />
                    <Label htmlFor="current" className="font-normal">
                      Current
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="mt-2 text-xs text-muted-foreground">
                  {accountType === 'savings' ? (
                    <p>Savings accounts earn interest but require a minimum balance.</p>
                  ) : (
                    <p>Current accounts include an overdraft facility but don't earn interest.</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {showConcept && (
        <OOPConcept
          concept="inheritance"
          explanation={`When creating a ${accountType === 'savings' ? 'SavingsAccount' : 'CurrentAccount'}, we're demonstrating inheritance. Both account types inherit from the base Account class, gaining its properties and methods while adding their own specialized behaviors.`}
          codeExample={inheritanceCode}
          actionPerformed={`A new ${accountType === 'savings' ? 'SavingsAccount' : 'CurrentAccount'} object was instantiated, inheriting core functionality from the Account class.`}
          onClose={() => setShowConcept(false)}
        />
      )}
    </div>
  );
};
