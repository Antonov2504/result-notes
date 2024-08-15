import Dexie, { type EntityTable } from 'dexie';
import { TNote } from './types';

const db = new Dexie('NotesDatabase') as Dexie & {
  notes: EntityTable<
    TNote,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  notes: '++id, description, createdAt', // primary key "id" (for the runtime!)
});

export { db };
