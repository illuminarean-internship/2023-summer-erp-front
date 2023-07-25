import { useRouter } from 'next/router';

const BooksEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    return <p>{id}</p>;
};

export default BooksEdit;
