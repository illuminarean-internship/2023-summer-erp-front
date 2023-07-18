import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global-style';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import ProtectLayouts from '../components/ProtectLayouts';

function MyApp({ Component, pageProps, session }) {
    const router = useRouter();

    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                {router.pathname !== '/login' ? (
                    <ProtectLayouts>
                        <GlobalStyle />
                        <Navbar></Navbar>
                        <Component {...pageProps} />{' '}
                    </ProtectLayouts>
                ) : (
                    <>
                        <GlobalStyle />
                        <Component {...pageProps} />{' '}
                    </>
                )}
            </ThemeProvider>
        </SessionProvider>
    );
}

export default MyApp;
