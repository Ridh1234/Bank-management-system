
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface OOPGlossaryProps {
  onClose: () => void;
}

export const OOPGlossary: React.FC<OOPGlossaryProps> = ({ onClose }) => {
  return (
    <Card className="p-4 border-2 border-bank-educational bg-white/95 backdrop-blur-sm max-w-md w-full shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-bank-educational">OOP Concepts Glossary</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="encapsulation">
          <AccordionTrigger className="text-blue-600 font-medium">Encapsulation</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm mb-2">Encapsulation is the bundling of data and the methods that operate on that data into a single unit (class) and restricting direct access to the internal state.</p>
            <p className="text-sm mb-2"><strong>Benefits:</strong></p>
            <ul className="list-disc list-inside text-sm mb-2">
              <li>Controls access to data through getters and setters</li>
              <li>Prevents unintended modifications</li>
              <li>Enables validation when setting values</li>
              <li>Allows changing implementation without affecting the interface</li>
            </ul>
            <p className="text-sm italic">In our app: User class encapsulates personal information with private fields and public methods.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="inheritance">
          <AccordionTrigger className="text-green-600 font-medium">Inheritance</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm mb-2">Inheritance is a mechanism where a new class (derived) can inherit properties and behavior from an existing class (base).</p>
            <p className="text-sm mb-2"><strong>Benefits:</strong></p>
            <ul className="list-disc list-inside text-sm mb-2">
              <li>Promotes code reuse</li>
              <li>Establishes "is-a" relationships between classes</li>
              <li>Enables hierarchical classification</li>
            </ul>
            <p className="text-sm italic">In our app: SavingsAccount and CurrentAccount inherit from the Account base class.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="polymorphism">
          <AccordionTrigger className="text-purple-600 font-medium">Polymorphism</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm mb-2">Polymorphism allows objects of different classes to be treated as objects of a common superclass. It enables methods to do different things based on the object they are operating on.</p>
            <p className="text-sm mb-2"><strong>Types:</strong></p>
            <ul className="list-disc list-inside text-sm mb-2">
              <li><strong>Method Overriding:</strong> Child class implements a method from parent class differently</li>
              <li><strong>Method Overloading:</strong> Same method name, different parameters</li>
            </ul>
            <p className="text-sm italic">In our app: Both SavingsAccount and CurrentAccount override the withdraw method with different behaviors.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="abstraction">
          <AccordionTrigger className="text-amber-600 font-medium">Abstraction</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm mb-2">Abstraction is the concept of hiding complex implementation details while exposing only the necessary and relevant features of an object.</p>
            <p className="text-sm mb-2"><strong>Benefits:</strong></p>
            <ul className="list-disc list-inside text-sm mb-2">
              <li>Reduces complexity by hiding implementation details</li>
              <li>Focuses on what an object does rather than how it does it</li>
              <li>Makes the system easier to understand and maintain</li>
            </ul>
            <p className="text-sm italic">In our app: Account is an abstract class that provides a common interface for different account types.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="class-object">
          <AccordionTrigger className="text-gray-600 font-medium">Class vs Object</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm mb-2">A class is a blueprint for creating objects, defining properties and methods. An object is an instance of a class.</p>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <p className="text-sm font-bold">Class</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Template/Blueprint</li>
                  <li>Defines structure</li>
                  <li>Created once</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold">Object</p>
                <ul className="list-disc list-inside text-sm">
                  <li>Instance of class</li>
                  <li>Has state and behavior</li>
                  <li>Multiple can exist</li>
                </ul>
              </div>
            </div>
            <p className="text-sm italic">In our app: User is a class, while john and jane are objects created from it.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
