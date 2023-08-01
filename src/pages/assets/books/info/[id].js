import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dateToString from '../../../../usefulFunctions/dateToString';

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
    retreivedInfoStateCopy['purchaseDate'] = dateToString(
        retreivedInfoState['purchaseDate'],
    );
    //        <div> <InfoPageTemplate retreivedInfoState={retreivedInfoStateCopy} /> </div>
    return (
        <div>
            <InfoPageTemplate dataToRender={retreivedInfoStateCopy} />
        </div>
    );
};

export default BooksInfo;
