import { createTheme, DEFAULT_THEME, mergeMantineTheme, rem } from '@mantine/core';

const themeOverride = createTheme({
  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
