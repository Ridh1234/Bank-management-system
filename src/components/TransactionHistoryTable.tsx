
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Transaction, TransactionType } from '@/models/Transaction';

interface TransactionHistoryTableProps {
  transactions: Transaction[];
}

export const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({ transactions }) => {
  const sortedTransactions = [...transactions].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );
  
  // Format a date to display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Format an amount to currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'auto'
    }).format(amount);
  };
  
  // Get transaction type badge class
  const getTransactionBadge = (type: TransactionType) => {
    switch (type) {
      case TransactionType.DEPOSIT:
        return 'bg-green-100 text-green-800';
      case TransactionType.WITHDRAWAL:
        return 'bg-red-100 text-red-800';
      case TransactionType.TRANSFER:
        return 'bg-blue-100 text-blue-800';
      case TransactionType.INTEREST:
        return 'bg-purple-100 text-purple-800';
      case TransactionType.FEE:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      {sortedTransactions.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(transaction.timestamp)}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTransactionBadge(transaction.type)}`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          No transactions found for this account.
        </div>
      )}
    </div>
  );
};
