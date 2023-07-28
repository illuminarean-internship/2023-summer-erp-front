import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global-style';
import Navbar from '../components/Menu/Navbar';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import ProtectLayouts from '../components/ProtectLayouts';
import { useState } from 'react';
import Sidebar from '../components/Menu/Sidebar';
import { Box } from '@mui/material';

function MyApp({ Component, pageProps, session }) {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {router.pathname !== '/login-page' ? (
                    <ProtectLayouts>
                        <Box sx={{ display: 'flex' }}>
                            <Navbar {...{ open, handleDrawerOpen }} />
                            <Sidebar {...{ open, setOpen, selectedLink }}>
                                <Component
                                    {...pageProps}
                                    selectedLink={selectedLink}
                                    setSelectedLink={setSelectedLink}
                                />
                            </Sidebar>
                        </Box>
                    </ProtectLayouts>
                ) : (
                    <>
                        <GlobalStyle />
                        <Component {...pageProps} />
                    </>
                )}
            </ThemeProvider>
        </SessionProvider>
    );
}

export default MyApp;
