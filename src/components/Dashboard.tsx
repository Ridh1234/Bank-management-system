
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, LogOut, BookOpen, User, Users } from 'lucide-react';
import { AccountCard } from './AccountCard';
import { TransactionHistoryTable } from './TransactionHistoryTable';
import { CreateAccountForm } from './CreateAccountForm';
import { DepositForm } from './DepositForm';
import { WithdrawForm } from './WithdrawForm';
import { TransferForm } from './TransferForm';
import { useBank } from '@/contexts/BankContext';
import { OOPGlossary } from './OOPGlossary';
import { ClassDiagram } from './ClassDiagram';

export const Dashboard: React.FC = () => {
  const { currentUser, userAccounts, selectedAccount, selectAccount, logout, allUsers, switchUser } = useBank();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showClassDiagram, setShowClassDiagram] = useState(false);
  
  // Format user's name
  const userName = currentUser ? currentUser.fullName : 'User';
  
  // Format the total balance
  const totalBalance = userAccounts.reduce((sum, account) => sum + account.balance, 0);
  const formattedTotalBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalBalance);
  
  // Handle account selection
  const handleSelectAccount = (accountId: string) => {
    const account = userAccounts.find(a => a.id === accountId);
    if (account) {
      selectAccount(account);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {userName}</h1>
          <p className="text-muted-foreground">Manage your accounts and transactions</p>
        </div>
        
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowGlossary(true)}
          >
            <BookOpen className="h-4 w-4" />
            OOP Glossary
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowClassDiagram(true)}
          >
            <Users className="h-4 w-4" />
            Class Diagram
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Account List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Total Balance Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Balance</CardTitle>
              <CardDescription>Across all accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{formattedTotalBalance}</p>
              
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">
                  {userAccounts.length} Account{userAccounts.length !== 1 ? 's' : ''}
                </p>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowCreateAccount(true)}
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="h-4 w-4" />
                  New Account
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* User Switcher (for demo) */}
          {allUsers.length > 1 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Demo Users</CardTitle>
                <CardDescription>Try different user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {allUsers.map(user => (
                    <Button 
                      key={user.id}
                      variant={currentUser?.id === user.id ? "default" : "outline"}
                      size="sm"
                      className="justify-start"
                      onClick={() => switchUser(user)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.fullName}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Account List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Accounts</h2>
            
            {userAccounts.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any accounts yet</p>
                  <Button onClick={() => setShowCreateAccount(true)}>
                    Create Your First Account
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {userAccounts.map(account => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    isSelected={selectedAccount?.id === account.id}
                    onSelect={() => handleSelectAccount(account.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Account Details and Transactions */}
        <div className="lg:col-span-2">
          {selectedAccount ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedAccount.name}</CardTitle>
                <CardDescription>
                  {selectedAccount.getAccountType()} Account
                </CardDescription>
                
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => setShowDepositForm(true)}>Deposit</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowWithdrawForm(true)}
                  >
                    Withdraw
                  </Button>
                  {userAccounts.length > 1 && (
                    <Button 
                      variant="outline"
                      onClick={() => setShowTransferForm(true)}
                    >
                      Transfer
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              }).format(selectedAccount.balance)}
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold">
                              {selectedAccount.transactions.length}
                            </p>
                            <p className="text-xs text-muted-foreground">transactions</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
                        <TransactionHistoryTable 
                          transactions={selectedAccount.transactions.slice(0, 5)}
                        />
                        {selectedAccount.transactions.length > 5 && (
                          <Button 
                            variant="link" 
                            className="mt-2 w-full" 
                            onClick={() => setActiveTab('transactions')}
                          >
                            View all transactions
                          </Button>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="transactions">
                    <h3 className="text-lg font-semibold mb-2">All Transactions</h3>
                    <TransactionHistoryTable transactions={selectedAccount.transactions} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="text-lg font-medium mb-2">No account selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select an account from the list or create a new one to get started
                </p>
                <Button onClick={() => setShowCreateAccount(true)}>
                  Create New Account
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Forms */}
      {showCreateAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <CreateAccountForm onClose={() => setShowCreateAccount(false)} />
        </div>
      )}
      
      {showDepositForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <DepositForm onClose={() => setShowDepositForm(false)} />
        </div>
      )}
      
      {showWithdrawForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <WithdrawForm onClose={() => setShowWithdrawForm(false)} />
        </div>
      )}
      
      {showTransferForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <TransferForm onClose={() => setShowTransferForm(false)} />
        </div>
      )}
      
      {/* Educational Overlays */}
      {showGlossary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <OOPGlossary onClose={() => setShowGlossary(false)} />
        </div>
      )}
      
      {showClassDiagram && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <ClassDiagram onClose={() => setShowClassDiagram(false)} />
        </div>
      )}
    </div>
  );
};
