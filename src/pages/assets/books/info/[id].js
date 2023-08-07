import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const BooksInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const [retreivedInfoState, setRetreivedInfoState] = useState({});
    useEffect(() => {
        // Fetch the dictionary using Axios with custom "transformResponse" function
        axios
            .get(`http://43.200.193.130:4040/api/books/item/${id}`)
            .then((response) => {
                setRetreivedInfoState(response.data);
            })
            .catch((error) => {
                console.error('Error fetching the dictionary:', error);
            });
    }, []);

    const retreivedInfoStateCopy = {};
    retreivedInfoStateCopy['title'] = retreivedInfoState['title'];
    retreivedInfoStateCopy['team'] = retreivedInfoState['team'];
    retreivedInfoStateCopy['location'] = retreivedInfoState['location'];
    retreivedInfoStateCopy['price'] =
        '₩' + JSON.stringify(retreivedInfoState['price']);
    retreivedInfoStateCopy['purchaseDate'] = moment(
        retreivedInfoState['purchaseDate'],
    ).format('YYYY-MM-DD');
    retreivedInfoStateCopy['history'] = [
        {
            startDate: '2023-8-3',
            endDate: '2023-8-4',
            historyLocation: 'Office',
            historyRemark: 'here',
        },
        {
            startDate: '2023-8-6',
            endDate: null,
            historyLocation: 'Dev team',
            historyRemark: '',
        },
    ]
    return (
        <div>
            <InfoPageTemplate dataToRender={retreivedInfoStateCopy} />
        </div>
    );
};

export default BooksInfo;

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
