import { useRouter } from 'next/router';
const BooksInfo = () => {
    const router = useRouter();
    const { id } = router.query;

    return <div>{id}</div>;
};

export default BooksInfo;
