import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Loading from './Loading';

const ProtectLayouts = ({ children }) => {
    const router = useRouter();
    const { status } = useSession();
    const authorized = status === 'authenticated';
    const unAuthorized = status === 'unauthenticated';
    const loading = status === 'loading';

    useEffect(() => {
        // check if the session is loading or the router is not ready
        if (loading || !router.isReady) return;

        // if the user is not authorized, redirect to the login page
        // with a return url to the current page
        if (unAuthorized) {
            router.push({
                pathname: '/loginPage',
                // query: { returnUrl: router.asPath },
            });
        }
    }, [loading, unAuthorized, status, router]);

    if (loading) {
        return <Loading />;
    }
    return authorized ? <div>{children}</div> : <></>;
};

export default ProtectLayouts;
