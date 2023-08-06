import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dateToString from '../../../../usefulFunctions/dateToString';

const LaptopInfo = () => {
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
    retreivedInfoStateCopy['deviceImage'] = retreivedInfoState['deviceImage']; //convert string to img later
    retreivedInfoStateCopy['category'] = retreivedInfoState['category'];
    retreivedInfoStateCopy['model'] = retreivedInfoState['model'];
    retreivedInfoStateCopy['CPU'] = JSON.stringify(
        retreivedInfoState['CPU'] + 'G',
    );
    retreivedInfoStateCopy['RAM'] = JSON.stringify(
        retreivedInfoState['RAM'] + 'G',
    );
    retreivedInfoStateCopy['SSD'] = JSON.stringify(
        retreivedInfoState['SSD'] + 'G',
    );
    retreivedInfoStateCopy['location'] = retreivedInfoState['location'];
    retreivedInfoStateCopy['warranty'] = retreivedInfoState['warranty'];
    retreivedInfoStateCopy['totalPrice'] =
        '₩' + JSON.stringify(retreivedInfoState['totalPrice']);
    retreivedInfoStateCopy['illuminareanSerialNumber'] =
        retreivedInfoState['illuminareanSerialNumber'];
    retreivedInfoStateCopy['color'] = retreivedInfoState['color'];
    retreivedInfoStateCopy['purchaseDate'] = dateToString(
        retreivedInfoState['purchaseDate'],
    );

    //Might have to modify this later to track time from present date
    retreivedInfoStateCopy['availableDate'] = dateToString(
        retreivedInfoState['availableDate'],
    );
    return (
        <div>
            <InfoPageTemplate dataToRender={retreivedInfoStateCopy} />
        </div>
    );
};

export default LaptopInfo;

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
