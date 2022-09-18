import { Box, Title } from '@mantine/core';

interface ContentSection {
  title: string;
  content: React.ReactNode;
}
export function ContentSection({ title, content }: ContentSection) {
  return (
    <Box component="section" mb={32}>
      <Title sx={{ fontSize: '24px' }} order={2}>
        {title}
      </Title>
      {content}
    </Box>
  );
}
