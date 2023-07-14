import Head from 'next/head';
import Main from '../components/Main';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const { data: session } = useSession();

    function checkLogin() {
        if (session) {
            // signed in
        } else {
            // signed out
            router.push('/login');
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

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
}
