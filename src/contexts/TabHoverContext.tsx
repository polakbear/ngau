import { createContext } from 'react';
import { TabType } from '../types';

export interface TabHoverContextValue {
  hoverTab: TabType;
  handleMouseEnter: (tabType: TabType) => void;
  handleMouseLeave: () => void;
  setHoverTab: (tabType: TabType) => void;
}

const defaultContextValue: TabHoverContextValue = {
  hoverTab: null,
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  setHoverTab: () => {},
};

export const TabHoverContext =
  createContext<TabHoverContextValue>(defaultContextValue);
