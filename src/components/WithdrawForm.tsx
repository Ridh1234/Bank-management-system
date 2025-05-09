import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useBank } from '@/contexts/BankContext';
import { toast } from 'sonner';
import { OOPConcept } from './OOPConcept';

interface WithdrawFormProps {
  onClose: () => void;
}

export const WithdrawForm: React.FC<WithdrawFormProps> = ({ onClose }) => {
  const { withdraw, selectedAccount } = useBank();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const withdrawalAmount = parseFloat(amount);
      
      if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }
      
      const success = await withdraw(withdrawalAmount, description || 'Withdrawal');
      
      if (success) {
        toast.success(`Successfully withdrew $${withdrawalAmount.toFixed(2)}`);
        setShowConcept(true);
      } else {
        toast.error('Insufficient funds for this withdrawal');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const polymorphismCode = `
// Abstract base class defines withdraw method signature
export abstract class Account {
  // ...
  abstract withdraw(amount: number, description?: string): boolean;
  // ...
}

// SavingsAccount implements withdraw with minimum balance check
export class SavingsAccount extends Account {
  // ...
  withdraw(amount: number, description: string = 'Withdrawal'): boolean {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }

    const newBalance = this.balance - amount;
    if (newBalance < this._minimumBalance) {
      return false; // Can't go below minimum balance
    }

    const transaction = new Transaction(TransactionType.WITHDRAWAL, -amount, description, null);
    this.addTransaction(transaction);
    this.updateBalance(-amount);
    return true;
  }
  // ...
}

// CurrentAccount implements withdraw with overdraft limit
export class CurrentAccount extends Account {
  // ...
  withdraw(amount: number, description: string = 'Withdrawal'): boolean {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }

    if (this.balance - amount < -this._overdraftLimit) {
      return false; // Can't exceed overdraft limit
    }

    const transaction = new Transaction(TransactionType.WITHDRAWAL, -amount, description, null);
    this.addTransaction(transaction);
    this.updateBalance(-amount);
    return true;
  }
  // ...
}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Withdraw Funds</CardTitle>
          <CardDescription>
            Withdraw money from {selectedAccount?.name || 'your account'}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What's this withdrawal for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2 mt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} variant="destructive">
                  {loading ? 'Processing...' : 'Withdraw Funds'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {showConcept && (
        <OOPConcept
          concept="polymorphism"
          explanation="When withdrawing funds, different withdraw implementations are called based on the account type. SavingsAccount enforces a minimum balance requirement, while CurrentAccount allows overdrafts up to a limit."
          codeExample={polymorphismCode}
          actionPerformed="The withdraw method was called polymorphically, executing the specific implementation for this account type."
          onClose={() => setShowConcept(false)}
        />
      )}
    </div>
  );
};
