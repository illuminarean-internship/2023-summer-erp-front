import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global-style';
import Navbar from '../components/Menu/Navbar';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import ProtectLayouts from '../components/ProtectLayouts';
import { useState } from 'react';
import Sidebar from '../components/Menu/Sidebar';

function MyApp({ Component, pageProps, session }) {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                {router.pathname !== '/loginPage' ? (
                    <ProtectLayouts>
                        <GlobalStyle />
                        <Navbar {...{ open, setOpen, handleDrawerOpen }} />
                        <Sidebar {...{ open, setOpen }} />
                        <Component {...pageProps} />
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
