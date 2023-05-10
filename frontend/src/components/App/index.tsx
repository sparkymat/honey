import React, { useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  ColorScheme,
  Flex,
  Header,
  MediaQuery,
  NavLink,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconBrightness, IconReceipt } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage } from '@mantine/hooks';
import Home from '../Home';
import Transactions from '../Transactions';
import { selectPath } from '../../features/app/selects';
import { updatePath } from '../../features/app/slice';
import { AppDispatch } from '../../store';

interface Path {
  href: string;
  label: string;
}

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const currentPath = useSelector(selectPath);

  const paths: Path[] = [
    {
      href: '/',
      label: 'Dashboard',
    },
    {
      href: '/transactions',
      label: 'Transactions',
    },
  ];

  const onNavClick = useCallback(
    (p: Path) => {
      dispatch(updatePath(p.href));
      window.location.href = `/#${p.href}`;
    },
    [dispatch],
  );

  const isActive = useCallback(
    (path: string): boolean => currentPath === path,
    [currentPath],
  );

  return (
    <div>
      <AppShell
        padding="md"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            {paths.map(p => (
              <NavLink
                label={p.label}
                active={isActive(p.href)}
                variant="subtle"
                tt="uppercase"
                icon={<IconReceipt size="1rem" stroke={1.5} />}
                onClick={() => onNavClick(p)}
              />
            ))}
          </Navbar>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened(o => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Flex
                justify="space-between"
                align="center"
                direction="row"
                wrap="wrap"
                sx={{ width: '100%' }}
              >
                <Anchor href="/#/">
                  <Text tt="uppercase">honey</Text>
                </Anchor>
                <ActionIcon onClick={() => toggleColorScheme()}>
                  <IconBrightness size="1.125rem" />
                </ActionIcon>
              </Flex>
            </div>
          </Header>
        }
        styles={thisTheme => ({
          main: {
            backgroundColor:
              thisTheme.colorScheme === 'dark'
                ? thisTheme.colors.dark[8]
                : thisTheme.colors.gray[0],
          },
        })}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </AppShell>
    </div>
  );
};

export default App;
