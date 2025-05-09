import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface OOPConceptProps {
  concept: 'encapsulation' | 'inheritance' | 'polymorphism' | 'abstraction';
  explanation: string;
  codeExample?: string;
  actionPerformed?: string;
  onClose?: () => void;
}

export const OOPConcept: React.FC<OOPConceptProps> = ({
  concept,
  explanation,
  codeExample,
  actionPerformed,
  onClose
}) => {
  const [showCode, setShowCode] = useState(false);

  const conceptTitles = {
    encapsulation: 'Encapsulation',
    inheritance: 'Inheritance',
    polymorphism: 'Polymorphism',
    abstraction: 'Abstraction'
  };

  const conceptDescriptions = {
    encapsulation: 'Hiding internal state and requiring all interaction to occur through an object\'s methods',
    inheritance: 'Mechanism where a class can inherit properties and methods from another class',
    polymorphism: 'Ability to present the same interface for different underlying forms',
    abstraction: 'Hiding complex implementation details and showing only the necessary features of an object'
  };

  const conceptColors = {
    encapsulation: 'bg-blue-800 border-blue-600 text-white',
    inheritance: 'bg-green-800 border-green-600 text-white',
    polymorphism: 'bg-purple-800 border-purple-600 text-white',
    abstraction: 'bg-amber-800 border-amber-600 text-white'
  };

  return (
    <div className="fixed right-4 top-4 z-50 w-[350px] max-h-[90vh] overflow-hidden">
      <div className="relative before:absolute before:top-4 before:-left-3 before:border-y-[10px] before:border-r-[12px] before:border-l-0 before:border-solid before:border-transparent before:border-r-white/20">
        <Card
          className={`educational-overlay animate-fade-in ${conceptColors[concept]} shadow-xl rounded-xl border p-6 pr-4 overflow-y-auto max-h-[90vh]`}
        >
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full bg-white/20 hover:bg-white/30 text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white">{conceptTitles[concept]} in Action</h3>
              {codeExample && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCode(!showCode)}
                  className="text-xs bg-white/20 hover:bg-white/30 border-white/30 text-white"
                >
                  {showCode ? 'Hide Code' : 'Show Code'}
                </Button>
              )}
            </div>

            <p className="text-sm mb-1 text-white font-medium">{conceptDescriptions[concept]}</p>

            {actionPerformed && (
              <div className="text-sm bg-white/10 p-3 rounded-md border border-white/20 text-white">
                <strong>What just happened:</strong> {actionPerformed}
              </div>
            )}

            <p className="text-sm my-1 text-white">{explanation}</p>

            {showCode && codeExample && (
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md text-xs overflow-x-auto border border-white/20 my-2 max-h-[200px] overflow-y-auto">
                <pre className="whitespace-pre-wrap">{codeExample}</pre>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
