import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Accessory = ({ setSelectedLink }) => {
    const router = useRouter();
    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
    }, []);

    return <div>accessory</div>;
};

export default Accessory;
