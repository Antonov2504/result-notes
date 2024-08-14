import { Button, Group, TextInput } from '@mantine/core';

export const SearchBox = () => {
  return (
    <Group>
      <TextInput placeholder='Поиск по заметкам...' />
      <Button variant='filled' color='green'>
        Новая заметка
      </Button>
    </Group>
  );
};
