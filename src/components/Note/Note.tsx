import { TNote } from '@src/types';
import { JSONContent } from '@tiptap/react';
import * as Styled from './Note.styled';

type NoteProps = {
  id: number;
  description: string;
  createdAt: Date;
  isActive: boolean;
  onClick: (id: TNote) => () => void;
};

export const Note = ({ id, description, createdAt, isActive, onClick }: NoteProps) => {
  const descriptionJSON = JSON.parse(description) as JSONContent;

  const title = descriptionJSON?.content?.[0]?.content?.[0]?.text ?? 'Заголовок заметки';
  const subtitle = descriptionJSON?.content?.[1]?.content?.[0]?.text ?? 'Заголовок заметки';

  return (
    <Styled.Container $isActive={isActive} onClick={onClick({ id, description, createdAt })}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.CreatedAt>{new Date(createdAt).toLocaleString()}</Styled.CreatedAt>
      <Styled.Description>{subtitle}</Styled.Description>
    </Styled.Container>
  );
};
