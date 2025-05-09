
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { BankService } from '../services/BankService';
import { User } from '../models/User';
import { Account } from '../models/Account';
import { SavingsAccount } from '../models/SavingsAccount';
import { CurrentAccount } from '../models/CurrentAccount';

interface BankContextType {
  // Auth
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<User>;
  loginAsGuest: () => Promise<User>;
  logout: () => void;
  switchUser: (user: User) => void;
  
  // Accounts
  userAccounts: Account[];
  selectedAccount: Account | null;
  selectAccount: (account: Account | null) => void;
  createSavingsAccount: (name: string, initialBalance: number) => Promise<SavingsAccount | null>;
  createCurrentAccount: (name: string, initialBalance: number) => Promise<CurrentAccount | null>;
  
  // Transactions
  deposit: (amount: number, description?: string) => Promise<boolean>;
  withdraw: (amount: number, description?: string) => Promise<boolean>;
  transfer: (targetAccountId: string, amount: number, description?: string) => Promise<boolean>;
  
  // System
  loading: boolean;
  error: string | null;
  resetError: () => void;
  resetBankSystem: () => void;
  loadDemoData: () => void;
  allUsers: User[];
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const bankService = BankService.getInstance();
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userAccounts, setUserAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  
  // Load all users
  useEffect(() => {
    refreshUsers();
  }, []);

  // Update accounts when user changes
  useEffect(() => {
    if (currentUser) {
      refreshAccounts();
    } else {
      setUserAccounts([]);
      setSelectedAccount(null);
    }
  }, [currentUser]);

  const refreshUsers = () => {
    setAllUsers(bankService.getAllUsers());
  };
  
  const refreshAccounts = () => {
    if (currentUser) {
      const accounts = bankService.getAccountsByUserId(currentUser.id);
      setUserAccounts(accounts);
      if (accounts.length > 0 && !selectedAccount) {
        setSelectedAccount(accounts[0]);
      }
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const user = bankService.loginUser(email, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = async (): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      // Create a guest user with a random ID
      const user = bankService.createGuestUser();
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const user = bankService.registerUser(firstName, lastName, email, password);
      refreshUsers();
      return user;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    bankService.logoutUser();
    setCurrentUser(null);
  };

  const switchUser = (user: User) => {
    setCurrentUser(user);
    // The bank service should also track the current user
    bankService.loginUser(user.email, "password"); // Note: this is just for demo
  };

  const selectAccount = (account: Account | null) => {
    setSelectedAccount(account);
  };

  const createSavingsAccount = async (name: string, initialBalance: number): Promise<SavingsAccount | null> => {
    setLoading(true);
    setError(null);
    try {
      if (!currentUser) {
        setError("User not logged in");
        return null;
      }
      const account = bankService.createSavingsAccount(currentUser.id, initialBalance, name);
      refreshAccounts();
      return account;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createCurrentAccount = async (name: string, initialBalance: number): Promise<CurrentAccount | null> => {
    setLoading(true);
    setError(null);
    try {
      if (!currentUser) {
        setError("User not logged in");
        return null;
      }
      const account = bankService.createCurrentAccount(currentUser.id, initialBalance, name);
      refreshAccounts();
      return account;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deposit = async (amount: number, description?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      if (!selectedAccount) {
        setError("No account selected");
        return false;
      }
      const success = bankService.deposit(selectedAccount.id, amount, description);
      refreshAccounts();
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (amount: number, description?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      if (!selectedAccount) {
        setError("No account selected");
        return false;
      }
      const success = bankService.withdraw(selectedAccount.id, amount, description);
      if (!success) {
        setError("Insufficient funds");
      }
      refreshAccounts();
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const transfer = async (targetAccountId: string, amount: number, description?: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      if (!selectedAccount) {
        setError("No source account selected");
        return false;
      }
      const success = bankService.transfer(selectedAccount.id, targetAccountId, amount, description);
      if (!success) {
        setError("Transfer failed. Insufficient funds or invalid target account.");
      }
      refreshAccounts();
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  const resetBankSystem = () => {
    bankService.resetData();
    setCurrentUser(null);
    setUserAccounts([]);
    setSelectedAccount(null);
    refreshUsers();
  };

  const loadDemoData = () => {
    bankService.addDemoData();
    refreshUsers();
  };

  const value = {
    currentUser,
    isLoggedIn: !!currentUser,
    login,
    register,
    loginAsGuest,
    logout,
    switchUser,
    
    userAccounts,
    selectedAccount,
    selectAccount,
    createSavingsAccount,
    createCurrentAccount,
    
    deposit,
    withdraw,
    transfer,
    
    loading,
    error,
    resetError,
    resetBankSystem,
    loadDemoData,
    allUsers,
  };

  return (
    <BankContext.Provider value={value}>
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};
