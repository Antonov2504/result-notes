import { ScrollArea, Stack, Text } from '@mantine/core';
import { Note } from '../Note';
import { useSidebarData } from './useSidebarData';

export const Sidebar = () => {
  const { notes, activeNote, onClickNote } = useSidebarData();

  if (notes?.length) {
    return (
      <ScrollArea h='100%'>
        <Stack h={300} bg='var(--mantine-color-body)' align='stretch' justify='flex-start' gap='md'>
          {notes?.map(({ id, description, createdAt }) => (
            <Note
              key={id}
              id={id}
              isActive={activeNote?.id === id}
              description={description}
              createdAt={createdAt}
              onClick={onClickNote}
            />
          )) ?? null}
        </Stack>
      </ScrollArea>
    );
  }

  return (
    <Text c='dimmed' mb={10} ta='left'>
      Список Ваших заметок...
    </Text>
  );
};
