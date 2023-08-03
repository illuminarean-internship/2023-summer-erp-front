import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

const BooksEdit = () => {
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/books/item/${id}`)
            .then((res) => {
                console.log(res);
            });
    }, []);

    return <>{id}</>;
};

export default BooksEdit;
