import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DesktopPc = ({ setSelectedLink }) => {
    const router = useRouter();
    useEffect(() => {
        setSelectedLink(router.pathname.slice(1));
    }, []);
    return <div>desktopPc</div>;
};

export default DesktopPc;
