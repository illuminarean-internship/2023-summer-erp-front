import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TestDeviceInfo = () => {
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
    retreivedInfoStateCopy['RAM'] = JSON.stringify(
        retreivedInfoState['RAM'] + 'G',
    );
    retreivedInfoStateCopy['SSD'] = JSON.stringify(
        retreivedInfoState['SSD'] + 'G',
    );
    retreivedInfoStateCopy['team'] = retreivedInfoState['team'];
    retreivedInfoStateCopy['location'] = retreivedInfoState['location'];
    retreivedInfoStateCopy['serialNumber'] = retreivedInfoState['serialNumber'];
    retreivedInfoStateCopy['condition'] = retreivedInfoState['condition'];
    retreivedInfoStateCopy['color'] = retreivedInfoState['color'];
    retreivedInfoStateCopy['totalPrice'] =
        '₩' + JSON.stringify(retreivedInfoState['totalPrice']);
    retreivedInfoStateCopy['purchasedFrom'] =
        retreivedInfoState['purchasedFrom'];
    
    return (
        <div>
            <InfoPageTemplate dataToRender={retreivedInfoStateCopy} />
        </div>
    );
};

export default TestDeviceInfo;

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
