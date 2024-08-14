import { AppShell, Burger, Group, Skeleton, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Note } from '@src/components/Note';
import { SearchBox } from '@src/components/SearchBox';
import { Workspace } from '@src/components/Workspace';

export const NotesPage = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          <SearchBox />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <Stack h={300} bg='var(--mantine-color-body)' align='stretch' justify='flex-start' gap='md'>
          <Note
            title='Новая заметка'
            description='Описание заметки'
            createdAt={new Date().toLocaleString()}
          />
          <Note
            title='Новая заметка'
            description='Описание заметки'
            createdAt={new Date().toLocaleString()}
          />
          <Note
            title='Новая заметка'
            description='Описание заметки'
            createdAt={new Date().toLocaleString()}
          />
          <Text c='dimmed' mb={10} ta='left'>
            Список будущих заметок...
          </Text>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Text c='dimmed' mb={10} ta='left'>
          Добавьте Вашу первую заметку...
        </Text>
        <Workspace />
      </AppShell.Main>
    </AppShell>
  );
};
