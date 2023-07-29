import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TestDevice = ({ setSelectedLink }) => {
    const router = useRouter();
    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
    }, []);
    return <div>testDevice</div>;
};

export default TestDevice;
