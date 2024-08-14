import * as Styled from './Note.styled';

type NoteProps = {
  title: string;
  description: string;
  createdAt: string;
};

export const Note = ({ title, description, createdAt }: NoteProps) => {
  return (
    <Styled.Container $isActive={false}>
      <Styled.Title>{title}</Styled.Title>
      <Styled.CreatedAt>{createdAt}</Styled.CreatedAt>
      <Styled.Description>{description}</Styled.Description>
    </Styled.Container>
  );
};
