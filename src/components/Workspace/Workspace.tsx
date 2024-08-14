import { Button, Group, Text } from '@mantine/core';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import { modals } from '@mantine/modals';
import * as Styled from './Workspace.styled';

const content = {
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

export const Workspace = () => {
  const [isEditable, setIsEditable] = useState(false);

  const editor = useEditor({
    editable: isEditable,
    extensions: [StarterKit, Highlight, Typography],
    content,
  });

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Удаление заметки',
      centered: true,
      children: (
        <>
          <Text size='sm'>Вы действительно хотите удалить заметку title?</Text>
          <Text size='sm'>Данное действие необратимо.</Text>
        </>
      ),
      labels: { confirm: 'Удалить заметку', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  const onSubmit = () => {
    console.log({ editor: editor.getJSON() });
    setIsEditable(false);
  };

  return (
    <Styled.EditorWrapper $isEditable={isEditable}>
      <Group>
        <Text c='dimmed' mb={10} ta='left'>
          {new Date().toDateString()}
        </Text>
        <Group ml='auto'>
          <Button variant='filled' color='blue' onClick={() => setIsEditable(true)}>
            Редактировать
          </Button>
          <Button variant='filled' color='red' onClick={openDeleteModal}>
            Удалить
          </Button>
        </Group>
      </Group>

      <EditorContent editor={editor} />

      {isEditable && (
        <Button type='button' mt='md' onClick={onSubmit}>
          Сохранить
        </Button>
      )}
    </Styled.EditorWrapper>
  );
};
