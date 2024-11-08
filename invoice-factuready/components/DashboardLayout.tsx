// components/DashboardLayout.tsx
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex-grow">
      {children}
    </div>
  );
};

export default DashboardLayout;
