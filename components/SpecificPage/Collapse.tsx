import { Button, Collapse, CollapseProps, Divider, SimpleGrid } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { useState } from 'react';

export function CollapsedContent({ children }: Pick<CollapseProps, 'children'>) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Divider
        my="xs"
        mt={32}
        label={
          <Button
            rightIcon={
              opened ? (
                <IconChevronUp size={14} color="white" />
              ) : (
                <IconChevronDown size={14} color="white" />
              )
            }
            sx={{ width: '130px' }}
            onClick={() => setOpened((o) => !o)}
          >
            {opened ? 'Read less' : 'Read more'}
          </Button>
        }
        labelPosition="center"
      />
      <Collapse in={opened}>
        <SimpleGrid cols={1} spacing="xl">
          {children}
        </SimpleGrid>
      </Collapse>
    </>
  );
}
