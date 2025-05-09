
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Account } from '@/models/Account';
import { SavingsAccount } from '@/models/SavingsAccount';
import { CurrentAccount } from '@/models/CurrentAccount';

interface AccountCardProps {
  account: Account;
  isSelected: boolean;
  onSelect: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({ account, isSelected, onSelect }) => {
  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(account.balance);
  
  const accountType = account.getAccountType();
  const isSavings = accountType === 'Savings';
  const isCurrent = accountType === 'Current';
  
  // Cast to specific account type to access special properties
  const savingsAccount = isSavings ? account as SavingsAccount : null;
  const currentAccount = isCurrent ? account as CurrentAccount : null;
  
  // Format creation date
  const creationDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(account.createdAt);
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-bank-primary border-bank-primary/50 shadow-md' 
          : 'hover:shadow'
      }`}
    >
      <CardHeader className={`pb-2 ${isSavings ? 'bg-green-50' : 'bg-blue-50'}`}>
        <CardTitle className="flex justify-between items-center">
          <span className="truncate text-lg">{account.name}</span>
          <span className={`text-xs font-normal px-2 py-1 rounded-full ${
            isSavings 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {accountType}
          </span>
        </CardTitle>
        <CardDescription>Account #{account.id.substring(0, 8).toUpperCase()}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div>
          <p className="text-sm text-muted-foreground">Current Balance</p>
          <p className="text-2xl font-semibold">{formattedBalance}</p>
          
          {isSavings && savingsAccount && (
            <div className="mt-2 text-xs">
              <div className="flex justify-between">
                <span>Interest Rate:</span>
                <span>{(savingsAccount.interestRate * 100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Balance:</span>
                <span>${savingsAccount.minimumBalance.toFixed(2)}</span>
              </div>
            </div>
          )}
          
          {isCurrent && currentAccount && (
            <div className="mt-2 text-xs">
              <div className="flex justify-between">
                <span>Overdraft Limit:</span>
                <span>${currentAccount.overdraftLimit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Available Balance:</span>
                <span>${currentAccount.availableBalance.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 text-xs text-muted-foreground">
        <span>Opened {creationDate}</span>
        
        <Button 
          size="sm" 
          variant={isSelected ? "outline" : "default"}
          onClick={onSelect}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </CardFooter>
    </Card>
  );
};
