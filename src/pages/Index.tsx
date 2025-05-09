
import React from 'react';
import { AuthContainer } from '@/components/AuthContainer';
import { Dashboard } from '@/components/Dashboard';
import { useBank } from '@/contexts/BankContext';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const { isLoggedIn } = useBank();

  return (
    <AnimatePresence mode="wait">
      {isLoggedIn ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dashboard />
        </motion.div>
      ) : (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AuthContainer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
