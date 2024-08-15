import { useAppContext } from '@src/contexts/AppContextProvider';
import { db } from '@src/db';
import { TNote } from '@src/types';
import { getSorted } from '@src/utils';
import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useEffect, useMemo } from 'react';

export const useSidebarData = () => {
  const notes = useLiveQuery(() => db.notes.toArray());

  const { search } = useAppContext();

  const sortedNotes = getSorted({
    array: notes?.map((note) => ({ ...note, createdAt: new Date(note.createdAt).valueOf() })) ?? [],
    key: 'createdAt',
    sort: 'desc',
  }).map((note) => ({ ...note, createdAt: new Date(note.createdAt) }));

  const filteredNotes = useMemo(
    () =>
      sortedNotes.filter(({ description }) =>
        description.toLowerCase().includes(search.toLowerCase())
      ),
    [search, sortedNotes]
  );

  const { activeNote, setNotesCount, setActiveNote } = useAppContext();

  const onClickNote = useCallback(
    (note: TNote) => () => {
      setActiveNote(note);
    },
    [setActiveNote]
  );

  useEffect(() => {
    if (notes?.length) {
      setNotesCount(notes.length);
      if (filteredNotes.length) {
        setActiveNote({ ...filteredNotes[0], createdAt: new Date(filteredNotes[0].createdAt) });
      }
    }
  }, [notes, setActiveNote, setNotesCount]);

  return {
    notes: filteredNotes,
    activeNote,
    onClickNote,
  };
};
