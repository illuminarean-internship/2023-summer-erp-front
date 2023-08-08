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
import useBoolean from '../hooks/useBoolean';

function MyApp({ Component, pageProps, session }) {
    const router = useRouter();

    const {
        value: isOpen,
        setTrue: setIsOpenTrue,
        setFalse: setIsOpenFalse,
    } = useBoolean(false);

    const [selectedLink, setSelectedLink] = useState(null);

    const handleDrawerOpen = () => {
        setIsOpenTrue();
    };

    const handleDrawerClose = () => {
        setIsOpenFalse();
    };
    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {router.pathname !== '/login-page' ? (
                    <>
                        <ProtectLayouts>
                            <Box sx={{ display: 'flex' }}>
                                <Navbar {...{ isOpen, handleDrawerOpen }} />
                                <Sidebar
                                    {...{
                                        isOpen,
                                        handleDrawerClose,
                                        handleDrawerOpen,
                                        selectedLink,
                                    }}
                                >
                                    <Component
                                        {...pageProps}
                                        selectedLink={selectedLink}
                                        setSelectedLink={setSelectedLink}
                                        isOpen={isOpen}
                                    />
                                </Sidebar>
                            </Box>
                        </ProtectLayouts>
                    </>
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
