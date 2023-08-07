import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dateToString from '../../../../usefulFunctions/dateToString';

const AccessoryInfo = () => {
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
    retreivedInfoStateCopy['deviceImage'] = retreivedInfoState['deviceImage']; //convert string to img later
    retreivedInfoStateCopy['model'] = retreivedInfoState['model'];
    retreivedInfoStateCopy['category'] = retreivedInfoState['category'];
    retreivedInfoStateCopy['serialNumber'] = retreivedInfoState['serialNumber'];
    retreivedInfoStateCopy['location'] = retreivedInfoState['location'];
    retreivedInfoStateCopy['totalPrice'] =
        '₩' + JSON.stringify(retreivedInfoState['totalPrice']);
    retreivedInfoStateCopy['illuminareanSerialNumber'] =
        retreivedInfoState['illuminareanSerialNumber'];
    //Might have to modify this later to track time from present date
    retreivedInfoStateCopy['availableDate'] = dateToString(
        retreivedInfoState['availableDate'],
    );
    retreivedInfoStateCopy['color'] = retreivedInfoState['color'];
    retreivedInfoStateCopy['purchaseDate'] = dateToString(
        retreivedInfoState['purchaseDate'],
    );
    retreivedInfoStateCopy['purchasedFrom'] =
        retreivedInfoState['purchasedFrom'];
    retreivedInfoStateCopy['history'] = retreivedInfoState['history'];

    return (
        <div>
            <InfoPageTemplate dataToRender={retreivedInfoStateCopy} />
        </div>
    );
};

export default AccessoryInfo;

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
