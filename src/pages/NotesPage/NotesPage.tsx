import { AppShell, Burger, Button, Group, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { SearchBox } from '@src/components/SearchBox';
import { Sidebar } from '@src/components/Sidebar';
import { Workspace } from '@src/components/Workspace';
import { useAuthContext } from '@src/contexts/AuthContextProvider';
import { db } from '@src/db';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { content } from './NotesPage.constants';

export const NotesPage = () => {
  const navigate = useNavigate();

  const [opened, { toggle }] = useDisclosure();

  const { user, onSignOut } = useAuthContext();

  const handleSignOut = () => {
    onSignOut(() => {
      navigate('/login');
    });
  };

  const addNote = async () => {
    try {
      const id = await db.notes.add({
        description: JSON.stringify(content),
        createdAt: new Date(),
      });

      notifications.show({
        id: `success-add-note-${id}`,
        position: 'top-right',
        color: 'green',
        title: 'Успех',
        message: `Добавлена новая заметка ${id}`,
      });
    } catch (error) {
      notifications.show({
        id: `error-add-note`,
        position: 'top-right',
        color: 'red',
        title: 'Ошибка',
        message: 'Произошла ошибка при добавлении новой заметки',
      });
    }
  };

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
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        <Group h='100%' px='md'>
          <Group>
            <Title order={1}>Заметки</Title>
            <SearchBox />
            <Button variant='filled' color='green' onClick={addNote}>
              Новая заметка
            </Button>
          </Group>
          <Group ml='auto'>
            <Text c='dimmed'>{user}</Text>
            <Button variant='transparent' color='red' p={0} onClick={handleSignOut}>
              Выйти
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Workspace />
      </AppShell.Main>
    </AppShell>
  );
};
