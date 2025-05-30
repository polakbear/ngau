import { useState, ReactNode } from 'react';
import { TabHoverContext, TabHoverContextValue } from './TabHoverContext';
import { TabType } from '../types';

export default function TabHoverProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hoverTab, setHoverTab] = useState<TabType>(null);

  const value: TabHoverContextValue = {
    hoverTab,
    setHoverTab,
    handleMouseEnter: (tabType: TabType) => {
      setHoverTab(tabType);
    },
    handleMouseLeave: () => {
      setHoverTab(null);
    },
  };

  return (
    <TabHoverContext.Provider value={value}>
      {children}
    </TabHoverContext.Provider>
  );
}
