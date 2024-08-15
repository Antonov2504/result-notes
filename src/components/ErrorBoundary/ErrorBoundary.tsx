/* eslint-disable react/destructuring-assignment */
import { Component, PropsWithChildren } from 'react';
import * as Styled from './ErrorBoundary.styled';

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<PropsWithChildren<unknown>, State> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);
    return { hasError: true };
  }

  override componentDidCatch(error: Error) {
    console.log('handle error data', { error });
  }

  override render() {
    if (this.state.hasError) {
      return <Styled.Container>Something went wrong!</Styled.Container>;
    }

    return this.props.children;
  }
}
