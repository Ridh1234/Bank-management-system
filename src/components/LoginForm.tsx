
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useBank } from '@/contexts/BankContext';
import { OOPConcept } from './OOPConcept';

interface LoginFormProps {
  onShowRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onShowRegister }) => {
  const { login, error, loading } = useBank();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showConcept, setShowConcept] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setShowConcept(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const encapsulationCode = `
// From User.ts
class User {
  private _email: string;
  private _password: string;

  // Only through this method can we verify the password
  authenticate(password: string): boolean {
    return this._password === password;
  }
}

// From BankService.ts
loginUser(email: string, password: string): User {
  for (const user of this.users.values()) {
    // We use the User's authenticate method here
    if (user.email === email && user.authenticate(password)) {
      this.currentUserId = user.id;
      return user;
    }
  }
  throw new Error("Invalid email or password");
}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p className="text-sm text-red-600">{error}</p>}
          
          <Button type="submit" className="w-full bg-bank-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </Button>
        </div>
      </form>
      
      <div className="text-center text-sm mt-4">
        <p className="text-xs text-gray-500 mt-2">
          Try demo account: john@example.com / password
        </p>
      </div>
      
      {showConcept && (
        <OOPConcept
          concept="encapsulation"
          explanation="During login, the User class's authentication method is called. The password is private and encapsulated within the User class, and can only be verified through the authenticate method."
          codeExample={encapsulationCode}
          actionPerformed="The authenticate method in the User class verified the password without exposing it."
          onClose={() => setShowConcept(false)}
        />
      )}
    </div>
  );
};
