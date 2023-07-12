import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global-style';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Navbar></Navbar>
            <Component {...pageProps} />{' '}
        </ThemeProvider>
    );
}

export default MyApp;
