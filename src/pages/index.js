import Head from 'next/head';
import Main from '../components/Main';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Create Your App</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Main />
            <Footer />
        </div>
    );
    // }
}
