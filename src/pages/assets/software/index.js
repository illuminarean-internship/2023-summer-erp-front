import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Software = ({ setSelectedLink }) => {
    const router = useRouter();
    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
    }, []);
    return <div>software</div>;
};

export default Software;
