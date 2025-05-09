import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useBank } from '@/contexts/BankContext';
import { toast } from 'sonner';
import { OOPConcept } from './OOPConcept';

interface DepositFormProps {
  onClose: () => void;
}

export const DepositForm: React.FC<DepositFormProps> = ({ onClose }) => {
  const { deposit, selectedAccount } = useBank();
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const depositAmount = parseFloat(amount);
      
      if (isNaN(depositAmount) || depositAmount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }
      
      const success = await deposit(depositAmount, description || 'Deposit');
      
      if (success) {
        toast.success(`Successfully deposited $${depositAmount.toFixed(2)}`);
        setShowConcept(true);
      } else {
        toast.error('Failed to process deposit');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const polymorphismCode = `
// Base Account class defines deposit method
export abstract class Account {
  // ...
  deposit(amount: number, description?: string): void {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }

    const transaction = new Transaction(TransactionType.DEPOSIT, amount, description, null);
    this.addTransaction(transaction);
    this.updateBalance(amount);
  }
  // ...
}

// In SavingsAccount.ts and CurrentAccount.ts
// Both account types inherit the same deposit implementation
// This shows method inheritance (a form of polymorphism)

// When we call deposit, the appropriate implementation runs
// based on the actual object type
bankService.deposit(accountId, amount, description);`;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Deposit Funds</CardTitle>
          <CardDescription>
            Add money to {selectedAccount?.name || 'your account'}
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
                  placeholder="What's this deposit for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2 mt-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
                  {loading ? 'Processing...' : 'Deposit Funds'}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {showConcept && (
        <OOPConcept
          concept="polymorphism"
          explanation="When depositing funds, the same deposit method is called regardless of the specific account type. This demonstrates polymorphism through method inheritance - the deposit behavior is shared across account types."
          codeExample={polymorphismCode}
          actionPerformed="The deposit method was inherited from the base Account class and used by the specific account type."
          onClose={() => setShowConcept(false)}
        />
      )}
    </div>
  );
};
