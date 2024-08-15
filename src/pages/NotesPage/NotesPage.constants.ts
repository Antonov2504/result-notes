import { Content } from '@tiptap/react';

export const content: Content = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attr: 'level-1',
      content: [
        {
          type: 'text',
          text: 'Новая заметка',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          marks: [{ type: 'italic' }],
          type: 'text',
          text: 'Описание заметки',
        },
      ],
    },
  ],
};
