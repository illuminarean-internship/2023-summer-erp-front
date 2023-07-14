import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global-style';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps, session }) {
    const router = useRouter();
    return (
        <SessionProvider session={session}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                {/* Navigation bar is not used on the login page */}
                {router.pathname !== '/login' && <Navbar></Navbar>}
                <Component {...pageProps} />{' '}
            </ThemeProvider>
        </SessionProvider>
    );
}

export default MyApp;
