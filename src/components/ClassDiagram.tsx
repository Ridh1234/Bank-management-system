import React from 'react';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBank } from '@/contexts/BankContext';

interface ClassDiagramProps {
  onClose: () => void;
}

export const ClassDiagram: React.FC<ClassDiagramProps> = ({ onClose }) => {
  const { currentUser, userAccounts } = useBank();

  const hasCurrentAccount = userAccounts.some(account => account.getAccountType() === 'Current');
  const hasSavingsAccount = userAccounts.some(account => account.getAccountType() === 'Savings');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <Card className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-xl shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-sm">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm p-4 border-b border-gray-300 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">OOP Class Diagram</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Diagram Area - Keeping original dimensions but fixing layout */}
        <div className="overflow-auto px-6 py-4">
          <div className="min-w-[1000px] flex justify-center">
            <svg width="1000" height="580" className="rounded border bg-white shadow-sm">
              {/* Abstract Account Class */}
              <rect x="400" y="50" width="180" height="120" fill="#f0f9ff" stroke="#0369a1" strokeWidth="2" />
              <text x="490" y="75" textAnchor="middle" fontWeight="bold">Account (Abstract)</text>
              <line x1="400" y1="85" x2="580" y2="85" stroke="#0369a1" strokeWidth="1" />
              <text x="410" y="105" fontSize="12">- id: string</text>
              <text x="410" y="125" fontSize="12">- balance: number</text>
              <line x1="400" y1="140" x2="580" y2="140" stroke="#0369a1" strokeWidth="1" />
              <text x="410" y="160" fontSize="12">+ deposit(): void</text>

              {/* User Class */}
              <rect x="100" y="50" width="180" height="120" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
              <text x="190" y="75" textAnchor="middle" fontWeight="bold">User</text>
              <line x1="100" y1="85" x2="280" y2="85" stroke="#059669" strokeWidth="1" />
              <text x="110" y="105" fontSize="12">- id: string</text>
              <text x="110" y="125" fontSize="12">- firstName: string</text>
              <text x="110" y="145" fontSize="12">- accounts: string[]</text>
              <line x1="100" y1="155" x2="280" y2="155" stroke="#059669" strokeWidth="1" />

              {/* User owns accounts - Fixed arrow */}
              <line x1="280" y1="110" x2="400" y2="110" stroke="#64748b" strokeWidth="2" />
              <text x="340" y="100" fontSize="12" textAnchor="middle">owns</text>
              <polygon points="400,110 392,106 392,114" fill="#64748b" />

              {/* SavingsAccount */}
              <rect x="300" y="280" width="180" height="120" fill={hasSavingsAccount ? "#f0fdf4" : "#f3f4f6"} stroke={hasSavingsAccount ? "#16a34a" : "#9ca3af"} strokeWidth="2" />
              <text x="390" y="305" textAnchor="middle" fontWeight="bold">SavingsAccount</text>
              <line x1="300" y1="315" x2="480" y2="315" stroke={hasSavingsAccount ? "#16a34a" : "#9ca3af"} strokeWidth="1" />
              <text x="310" y="335" fontSize="12">- interestRate: number</text>
              <line x1="300" y1="345" x2="480" y2="345" stroke={hasSavingsAccount ? "#16a34a" : "#9ca3af"} strokeWidth="1" />
              <text x="310" y="365" fontSize="12">+ withdraw(): boolean</text>
              <text x="310" y="385" fontSize="12">+ applyInterest(): void</text>

              {/* CurrentAccount */}
              <rect x="520" y="280" width="180" height="120" fill={hasCurrentAccount ? "#eff6ff" : "#f3f4f6"} stroke={hasCurrentAccount ? "#2563eb" : "#9ca3af"} strokeWidth="2" />
              <text x="610" y="305" textAnchor="middle" fontWeight="bold">CurrentAccount</text>
              <line x1="520" y1="315" x2="700" y2="315" stroke={hasCurrentAccount ? "#2563eb" : "#9ca3af"} strokeWidth="1" />
              <text x="530" y="335" fontSize="12">- overdraftLimit: number</text>
              <line x1="520" y1="345" x2="700" y2="345" stroke={hasCurrentAccount ? "#2563eb" : "#9ca3af"} strokeWidth="1" />
              <text x="530" y="365" fontSize="12">+ withdraw(): boolean</text>
              <text x="530" y="385" fontSize="12">+ setOverdraftLimit(): void</text>

              {/* Transaction */}
              <rect x="700" y="50" width="180" height="120" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
              <text x="790" y="75" textAnchor="middle" fontWeight="bold">Transaction</text>
              <line x1="700" y1="85" x2="880" y2="85" stroke="#dc2626" strokeWidth="1" />
              <text x="710" y="105" fontSize="12">- type: TransactionType</text>
              <text x="710" y="125" fontSize="12">- amount: number</text>
              <text x="710" y="145" fontSize="12">- timestamp: Date</text>
              <line x1="700" y1="155" x2="880" y2="155" stroke="#dc2626" strokeWidth="1" />

              {/* Account has Transaction - Fixed arrow */}
              <line x1="580" y1="110" x2="700" y2="110" stroke="#64748b" strokeWidth="2" />
              <text x="640" y="100" fontSize="12" textAnchor="middle">has</text>
              <polygon points="700,110 692,106 692,114" fill="#64748b" />

              {/* Inheritance Arrows - Fixed positions */}
              <line x1="490" y1="170" x2="490" y2="220" stroke="#64748b" strokeWidth="2" />
              <line x1="390" y1="220" x2="590" y2="220" stroke="#64748b" strokeWidth="2" />
              <line x1="390" y1="220" x2="390" y2="280" stroke="#64748b" strokeWidth="2" />
              <line x1="590" y1="220" x2="590" y2="280" stroke="#64748b" strokeWidth="2" />
              <polygon points="490,178 486,170 494,170" fill="#64748b" />
              <text x="510" y="210" fontSize="12" textAnchor="middle">extends</text>

              {/* User Instance */}
              {currentUser && (
                <g>
                  <rect x="100" y="440" width="180" height="90" rx="5" ry="5" fill="#f8fafc" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,2" />
                  <text x="190" y="465" textAnchor="middle" fontWeight="bold" fontSize="12">🧍‍♂️ User Instance</text>
                  <text x="110" y="485" fontSize="12">name: {currentUser.fullName}</text>
                  <text x="110" y="505" fontSize="12">accounts: {userAccounts.length}</text>

                  <line x1="190" y1="170" x2="190" y2="440" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4" />
                  <polygon points="190,438 186,430 194,430" fill="#0ea5e9" />
                  <text x="200" y="300" fontSize="10" fill="#0ea5e9">instance</text>
                </g>
              )}

              {/* Account Instances - Only if they exist */}
              {hasSavingsAccount && (
                <g>
                  <rect x="300" y="440" width="180" height="70" rx="5" ry="5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" strokeDasharray="5,2" />
                  <text x="390" y="465" textAnchor="middle" fontWeight="bold" fontSize="12">💰 Savings Account</text>
                  <text x="390" y="485" textAnchor="middle" fontSize="12">Instance</text>
                  <line x1="390" y1="400" x2="390" y2="440" stroke="#16a34a" strokeWidth="2" strokeDasharray="4" />
                  <polygon points="390,438 386,430 394,430" fill="#16a34a" />
                </g>
              )}
              
              {hasCurrentAccount && (
                <g>
                  <rect x="520" y="440" width="180" height="70" rx="5" ry="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" strokeDasharray="5,2" />
                  <text x="610" y="465" textAnchor="middle" fontWeight="bold" fontSize="12">🏦 Current Account</text>
                  <text x="610" y="485" textAnchor="middle" fontSize="12">Instance</text>
                  <line x1="610" y1="400" x2="610" y2="440" stroke="#2563eb" strokeWidth="2" strokeDasharray="4" />
                  <polygon points="610,438 606,430 614,430" fill="#2563eb" />
                </g>
              )}

              {/* Legend */}
              <rect x="740" y="280" width="140" height="90" fill="white" stroke="#64748b" strokeWidth="1" rx="5" />
              <text x="810" y="300" textAnchor="middle" fontWeight="bold" fontSize="12">Legend</text>
              <rect x="750" y="315" width="12" height="12" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
              <text x="770" y="325" fontSize="11">Active Class</text>
              <rect x="750" y="335" width="12" height="12" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="1" />
              <text x="770" y="345" fontSize="11">Inactive Class</text>
              <line x1="750" y1="355" x2="762" y2="355" stroke="#64748b" strokeWidth="2" strokeDasharray="3" />
              <text x="770" y="355" fontSize="11">Instance</text>
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm px-6 py-3 text-sm text-gray-600 border-t">
          <p>This diagram shows the relationship between classes in our OOP Bank System.</p>
          <p>Active instances are highlighted and connected with dotted lines.</p>
        </div>
      </Card>
    </div>
  );
};