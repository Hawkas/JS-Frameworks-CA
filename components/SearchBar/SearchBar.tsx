import {
  Autocomplete,
  Avatar,
  Box,
  Group,
  Loader,
  MantineColor,
  SelectItemProps,
  Text,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { SetStateString } from 'types/commonTypes';
import { PokeDex } from 'types/pokemonDataType';
import { useTextStyles } from '../../lib/styles/typography';
import { useSearchStyles } from './SearchBar.styles';

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  name: string;
  image?: string;
  type?: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ value, image, type, name, ...others }: ItemProps, ref) => (
    <div {...others} ref={ref}>
      <Group noWrap>
        <Avatar size="xl" alt={name} src={image} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: '8px',
            alignSelf: 'center',
            minHeight: '100%',
          }}
        >
          <Text weight={600} sx={{ lineHeight: 1.1 }}>
            {name}
          </Text>
          <Box>
            <Text size="xs" color="#003355">
              {type}
            </Text>
          </Box>
        </Box>
      </Group>
    </div>
  )
);

export function SearchBar({ data, setValue, value }: PokeDex & SetStateString) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //* Note, this component uses the 'value' item as the key. Which is why I have to use the ID there to avoid duplicate key errors.
  const autoComplete =
    data && data.length > 0
      ? data.map((item) => ({
          image: item.images.small,
          name: item.name,
          value: item.id,
          type: item.types![0],
        }))
      : [];
  const { classes, cx } = useSearchStyles();
  const {
    classes: { subHeader },
  } = useTextStyles();
  return (
    <Autocomplete
      classNames={{
        input: classes.searchbar,
        wrapper: classes.wrapper,
        label: cx(subHeader, classes.label),
        root: classes.root,
        icon: classes.icon,
        dropdown: classes.dropdown,
      }}
      disabled={loading}
      icon={loading ? <Loader size={20} /> : <IconSearch size={20} />}
      iconWidth={58}
      size="xl"
      dropdownPosition="bottom"
      nothingFound={
        data && data.length > 0 ? (
          <div>
            <Text weight={600}>No results matching your query</Text>
          </div>
        ) : (
          // In case of API failure
          <div>
            <Text weight={600} color="red">
              The API is gone or completely empty, so there&apos;s nothing
            </Text>
          </div>
        )
      }
      onItemSubmit={(item) => {
        setLoading(true);
        setTimeout(() => {
          router.push(`/pokemon/${item.slug}`, undefined, { shallow: true });
        }, 400);
      }}
      label="Search"
      placeholder="Search for Pokémon"
      itemComponent={AutoCompleteItem}
      data={autoComplete}
      value={value}
      onChange={setValue}
      filter={(value, item) => item.name.toLowerCase().includes(value.toLowerCase().trim())}
    />
  );
}
