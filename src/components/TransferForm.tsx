
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useBank } from '@/contexts/BankContext';
import { toast } from 'sonner';
import { OOPConcept } from './OOPConcept';

interface TransferFormProps {
  onClose: () => void;
}

export const TransferForm: React.FC<TransferFormProps> = ({ onClose }) => {
  const { transfer, selectedAccount, userAccounts } = useBank();
  
  const [amount, setAmount] = useState('');
  const [targetAccountId, setTargetAccountId] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConcept, setShowConcept] = useState(false);
  
  // Filter out the currently selected account from the target options
  const targetAccounts = userAccounts.filter(account => 
    account.id !== selectedAccount?.id
  );
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const transferAmount = parseFloat(amount);
      
      if (isNaN(transferAmount) || transferAmount <= 0) {
        toast.error('Please enter a valid amount');
        return;
      }
      
      if (!targetAccountId) {
        toast.error('Please select a target account');
        return;
      }
      
      const success = await transfer(
        targetAccountId, 
        transferAmount, 
        description || 'Transfer'
      );
      
      if (success) {
        toast.success(`Successfully transferred $${transferAmount.toFixed(2)}`);
        setShowConcept(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        toast.error('Transfer failed. Insufficient funds or invalid target account.');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const abstractionCode = `
// Abstract base class defines the transfer method
export abstract class Account {
  // ...
  
  // Method using abstraction - it works with any Account type
  transfer(amount: number, targetAccount: Account, description?: string): boolean {
    if (this.withdraw(amount, \`Transfer to \${targetAccount.name}\`)) {
      targetAccount.deposit(amount, \`Transfer from \${this.name}\`);
      return true;
    }
    return false;
  }
  
  // These abstract methods will be implemented differently by derived classes
  abstract withdraw(amount: number, description?: string): boolean;
  abstract deposit(amount: number, description?: string): void;
  // ...
}

// In BankService.ts
transfer(sourceAccountId: string, targetAccountId: string, amount: number, description?: string): boolean {
  const sourceAccount = this.accounts.get(sourceAccountId);
  const targetAccount = this.accounts.get(targetAccountId);
  
  if (!sourceAccount || !targetAccount) {
    return false;
  }
  
  // Uses the Account.transfer method which works with any account type
  return sourceAccount.transfer(amount, targetAccount, description);
}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Transfer Funds</CardTitle>
          <CardDescription>
            Move money from {selectedAccount?.name || 'your account'} to another account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {targetAccounts.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-muted-foreground">
                You need at least one more account to make transfers.
              </p>
              <Button 
                variant="link" 
                className="mt-2"
                onClick={onClose}
              >
                Create another account first
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="targetAccount">To Account</Label>
                  <Select
                    value={targetAccountId}
                    onValueChange={setTargetAccountId}
                  >
                    <SelectTrigger id="targetAccount">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} ({account.getAccountType()})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
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
                    placeholder="What's this transfer for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end space-x-2 mt-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                    {loading ? 'Processing...' : 'Transfer Funds'}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      
      {showConcept && (
        <OOPConcept
          concept="abstraction"
          explanation="The transfer operation demonstrates abstraction by hiding the complex implementation details of withdraw and deposit operations. The transfer method works with any Account type without needing to know the specific implementations."
          codeExample={abstractionCode}
          actionPerformed="The transfer method used abstraction to work with different account types seamlessly."
        />
      )}
    </div>
  );
};
