
import React, { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Button } from '@/components/ui/button';
import { useBank } from '@/contexts/BankContext';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { LogIn, UserPlus, User } from 'lucide-react';

export const AuthContainer: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { loadDemoData, allUsers, loginAsGuest } = useBank();
  
  useEffect(() => {
    // Check if demo data should be loaded initially
    if (allUsers.length === 0) {
      toast.info('Loading demo data for this educational app...');
      loadDemoData();
    }
  }, []);

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
      toast.success('Logged in as guest user successfully!');
    } catch (error) {
      toast.error('Failed to login as guest');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bank-primary/10 via-bank-secondary/5 to-bank-accent/10 p-4">
      <div className="w-full max-w-md">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-bank-primary to-bank-secondary">OOP Bank Simulator</h1>
          <p className="text-muted-foreground mt-2">
            An interactive demo of Object-Oriented Programming concepts
          </p>
        </motion.div>
        
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200">
          <motion.div 
            className="flex justify-center space-x-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              variant={showLogin ? "default" : "outline"} 
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
            <Button 
              variant={!showLogin ? "default" : "outline"} 
              onClick={() => setShowLogin(false)}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
          </motion.div>
          
          {showLogin ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <LoginForm onShowRegister={() => setShowLogin(false)} />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RegisterForm 
                onShowLogin={() => setShowLogin(true)} 
                onRegistrationSuccess={() => setShowLogin(true)}
              />
            </motion.div>
          )}
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button 
            onClick={handleGuestLogin}
            className="w-full bg-gradient-to-r from-bank-accent to-bank-accent/80 hover:from-bank-accent/90 hover:to-bank-accent/70 text-white flex items-center justify-center gap-2"
          >
            <User className="h-4 w-4" />
            Continue as Guest
          </Button>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Want to see how OOP works?</p>
            <Button 
              variant="outline"
              onClick={() => {
                loadDemoData();
                toast.success('Demo data loaded successfully!');
                setShowLogin(true);
              }}
              className="w-full"
            >
              Load Demo Data
            </Button>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-xs text-muted-foreground">
        <p>This is an educational application that demonstrates OOP concepts</p>
        <p className="mt-1">No actual financial transactions are performed</p>
      </footer>
    </div>
  );
};
