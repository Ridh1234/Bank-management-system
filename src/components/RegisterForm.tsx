import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useBank } from '@/contexts/BankContext';
import { OOPConcept } from './OOPConcept';

interface RegisterFormProps {
  onShowLogin: () => void;
  onRegistrationSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onShowLogin, onRegistrationSuccess }) => {
  const { register, error, loading } = useBank();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showConcept, setShowConcept] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(firstName, lastName, email, password);
      setShowConcept(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const instantiationCode = `
// From BankService.ts
registerUser(firstName: string, lastName: string, email: string, password: string): User {
  // Check if email already exists
  for (const user of this.users.values()) {
    if (user.email === email) {
      throw new Error("Email already registered");
    }
  }

  // Create a new User instance
  const user = new User(firstName, lastName, email, password);
  
  // Store it in our users Map
  this.users.set(user.id, user);
  return user;
}

// From User.ts constructor
constructor(firstName: string, lastName: string, email: string, password: string) {
  this._id = crypto.randomUUID();
  this._firstName = firstName;
  this._lastName = lastName;
  this._email = email;
  this._password = password;
}`;

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          
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
          
          <Button type="submit" className="w-full bg-bank-secondary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </div>
      </form>
      
      {showConcept && (
        <OOPConcept
          concept="encapsulation"
          explanation="When you register, a new User object is instantiated. The class constructor initializes private fields that are encapsulated within the object."
          codeExample={instantiationCode}
          actionPerformed="A new User object was created with encapsulated private data that can only be accessed through its public methods."
          onClose={() => setShowConcept(false)}
        />
      )}
    </div>
  );
};
