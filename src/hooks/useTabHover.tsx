import { useContext } from 'react';
import {
  TabHoverContext,
  TabHoverContextValue,
} from '../contexts/TabHoverContext';

export default function useTabHover(): TabHoverContextValue {
  return useContext(TabHoverContext);
}
