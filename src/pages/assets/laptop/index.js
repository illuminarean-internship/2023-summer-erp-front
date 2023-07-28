import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Laptop = ({ setSelectedLink }) => {
    const router = useRouter();
    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
    }, []);
    return <div>laptop</div>;
};

export default Laptop;
