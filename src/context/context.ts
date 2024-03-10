import { User } from 'firebase/auth';
import { createContext, useContext } from 'react';

export interface IContext {
  currentUser: User | null;
}

export const DataContext = createContext<IContext | null>(null);
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('Context is not provided');
  }
  return context;
};
