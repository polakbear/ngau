import { SearchState, SearchAction } from './types';

export function searchReducer(
  state: SearchState,
  action: SearchAction,
  initialState: SearchState
): SearchState {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        searchQuery: action.query,
        suggestions: action.suggestions,
        selectedIndex: -1,
      };
    case 'SET_EXPANDED':
      return {
        ...state,
        isExpanded: action.expanded,
      };
    case 'SET_SUGGESTIONS':
      return {
        ...state,
        suggestions: action.suggestions,
      };
    case 'SET_SELECTED_INDEX':
      return {
        ...state,
        selectedIndex: action.index,
      };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}
