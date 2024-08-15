import { TNote } from '@src/types';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type AppContextProviderProps = {
  children: ReactNode;
};

type AppContextProviderValue = {
  search: string;
  notesCount: number;
  activeNote: TNote | null;
  setActiveNote: Dispatch<SetStateAction<TNote>>;
  setNotesCount: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
};

const AppContext = createContext<AppContextProviderValue>({
  search: '',
  notesCount: 0,
  activeNote: null,
  setActiveNote: () => undefined,
  setNotesCount: () => undefined,
  setSearch: () => undefined,
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [activeNote, setActiveNote] = useState<TNote | null>(null);
  const [notesCount, setNotesCount] = useState(0);
  const [search, setSearch] = useState('');

  const value = useMemo(
    () => ({ search, activeNote, notesCount, setActiveNote, setNotesCount, setSearch }),
    [activeNote, notesCount, search]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
