import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dateToString from '../../../../usefulFunctions/dateToString';

const SoftwareInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const [retreivedInfoState, setRetreivedInfoState] = useState({});
    useEffect(() => {
        // Fetch the dictionary using Axios with custom "transformResponse" function
        axios
            .get(`http://43.200.193.130:4040/api/software/item/${id}`)
            .then((response) => {
                setRetreivedInfoState(response.data);
            })
            .catch((error) => {
                console.error('Error fetching the dictionary:', error);
            });
    }, []);

    const retreivedInfoStateCopy = {};
    retreivedInfoStateCopy['name'] = retreivedInfoState['name'];
    retreivedInfoStateCopy['purchaseDate'] = dateToString(
        retreivedInfoState['purchaseDate'],
    );
    retreivedInfoStateCopy['unitPrice'] =
        '₩' + JSON.stringify(retreivedInfoState['unitPrice']);
    retreivedInfoStateCopy['totalPrice'] =
        '₩' + JSON.stringify(retreivedInfoState['totalPrice']);
    retreivedInfoStateCopy['currency'] = 'KRW';
    retreivedInfoStateCopy['reference'] = retreivedInfoState['reference'];
    retreivedInfoStateCopy['user'] = retreivedInfoState['user'];

    //        <div> <InfoPageTemplate retreivedInfoState={retreivedInfoStateCopy} /> </div>
    return (
        <div>
            <InfoPageTemplate dataToRender={retreivedInfoStateCopy} />
        </div>
    );
};

export default SoftwareInfo;
