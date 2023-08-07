import { useRouter } from 'next/router';

const AccessoryInfo = () => {
    const router = useRouter();
    const { id } = router.query;

    return <p>{id}</p>;
};

export default AccessoryInfo;
