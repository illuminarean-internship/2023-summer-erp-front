import Head from 'next/head';
import OverviewPage from '../components/OverviewPage';
import Footer from '../components/Footer';

export default function Home() {
    return (
        <div>
            <Head>
                <title>illuminarean system</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <OverviewPage />
            <Footer />
        </div>
    );
}
