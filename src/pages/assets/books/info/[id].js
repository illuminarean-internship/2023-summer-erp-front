import { useRouter } from 'next/router';
// import InfoPageTemplate from '../../../../components/InfoPageTemplate';

const BooksInfo = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            {id}
            {/* <InfoPageTemplate id={id} /> */}
        </div>
    );
};

export default BooksInfo;
