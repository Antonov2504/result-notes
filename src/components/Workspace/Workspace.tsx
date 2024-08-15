import { Button, Group, Text } from '@mantine/core';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useMemo, useState } from 'react';
import { modals } from '@mantine/modals';
import { useAppContext } from '@src/contexts/AppContextProvider';
import { db } from '@src/db';
import { notifications } from '@mantine/notifications';
import { useDebouncedCallback } from '@mantine/hooks';
import * as Styled from './Workspace.styled';

export const Workspace = () => {
  const [isEditable, setIsEditable] = useState(false);

  const { notesCount, activeNote, setActiveNote } = useAppContext();

  const content = useMemo(
    () => activeNote && JSON.parse(activeNote.description ?? null),
    [activeNote]
  );

  const onUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      const newDescription = JSON.stringify(editor.getJSON());

      setActiveNote({
        ...activeNote,
        description: newDescription,
        createdAt: new Date(),
      });

      db.notes.update(activeNote.id, { description: newDescription, createdAt: new Date() });
    },
    [activeNote, setActiveNote]
  );

  const debouncedOnUpdate = useDebouncedCallback((value) => {
    if (value.editor.isFocused) {
      onUpdate(value);
    }
  }, 7000);

  const editor = useEditor(
    {
      editable: isEditable,
      extensions: [StarterKit, Highlight, Typography],
      content,
      onUpdate: debouncedOnUpdate,
    },
    [content, isEditable]
  );

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Удаление заметки',
      centered: true,
      children: (
        <>
          <Text size='sm'>Вы действительно хотите удалить заметку {activeNote.id}?</Text>
          <Text size='sm'>Данное действие необратимо.</Text>
        </>
      ),
      labels: { confirm: 'Удалить заметку', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        db.notes.delete(activeNote.id);
        notifications.show({
          id: 'success-remove-note',
          position: 'top-right',
          color: 'green',
          title: 'Успех',
          message: `Заметка ${activeNote.id} удалена`,
        });
      },
    });

  const onSubmit = () => {
    const newDescription = JSON.stringify(editor.getJSON());

    setIsEditable(false);
    setActiveNote({
      ...activeNote,
      description: newDescription,
      createdAt: new Date(),
    });

    db.notes
      .update(activeNote.id, { description: newDescription, createdAt: new Date() })
      .then((updated) => {
        if (updated)
          notifications.show({
            id: 'success-edit-note',
            position: 'top-right',
            color: 'green',
            title: 'Успех',
            message: `Заметка ${activeNote.id} успешно отредактирована`,
          });
        else
          notifications.show({
            id: 'error-edit-note',
            position: 'top-right',
            color: 'red',
            title: 'Ошибка',
            message: `Произошла ошибка при редактировании заметки ${activeNote.id}`,
          });
      });
  };

  if (!notesCount) {
    return (
      <Text c='dimmed' mb={10} ta='left'>
        Добавьте Вашу первую заметку...
      </Text>
    );
  }

  if (!activeNote) {
    return (
      <Text c='dimmed' mb={10} ta='left'>
        Выберите заметку...
      </Text>
    );
  }

  return (
    <Styled.EditorWrapper $isEditable={isEditable}>
      <Group>
        <Text c='dimmed' mb={10} ta='left'>
          {new Date(activeNote?.createdAt).toLocaleString()}
        </Text>
        <Group ml='auto'>
          <Button variant='filled' color='blue' onClick={() => setIsEditable((prev) => !prev)}>
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
