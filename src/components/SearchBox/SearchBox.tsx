import { Group, TextInput } from '@mantine/core';
import { useAppContext } from '@src/contexts/AppContextProvider';
import React, { ChangeEvent } from 'react';

export const SearchBox = () => {
  const { setSearch } = useAppContext();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Group>
      <TextInput placeholder='Поиск по заметкам...' onChange={handleChange} />
    </Group>
  );
};
