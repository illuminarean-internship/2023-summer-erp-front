import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import dateToString from '../../../../usefulFunctions/dateToString';

const DesktopPcInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const [retreivedInfoState, setRetreivedInfoState] = useState({});
    useEffect(() => {
        // Fetch the dictionary using Axios with custom "transformResponse" function
        axios
            .get(`http://localhost:4040/api/software/item/${id}`)
            .then((response) => {
                setRetreivedInfoState(response.data);
            })
            .catch((error) => {
                console.error('Error fetching the dictionary:', error);
            });
    }, []);

    //Make hardware page
    const retreivedInfoStateCopy = {};
    retreivedInfoStateCopy['illuminareanSerialNumber'] =
        retreivedInfoState['illuminareanSerialNumber'];
    retreivedInfoStateCopy['purchaseDate'] = dateToString(
        retreivedInfoState['purchaseDate'],
    );
    retreivedInfoStateCopy['purchasedFrom'] =
        retreivedInfoState['purchasedFrom'];
    retreivedInfoStateCopy['purpose'] = retreivedInfoState['purpose'];
    retreivedInfoStateCopy['location'] = retreivedInfoState['location'];

    retreivedInfoStateCopy['CPU'] = JSON.stringify(
        retreivedInfoState['CPU'] + 'G',
    );
    retreivedInfoStateCopy['RAM'] = JSON.stringify(
        retreivedInfoState['RAM'] + 'G',
    );
    retreivedInfoStateCopy['SSD'] = JSON.stringify(
        retreivedInfoState['SSD'] + 'G',
    );
    retreivedInfoStateCopy['warranty'] = retreivedInfoState['warranty'];
    retreivedInfoStateCopy['totalPrice'] =
        '₩' + JSON.stringify(retreivedInfoState['totalPrice']);

    retreivedInfoStateCopy['color'] = retreivedInfoState['color'];
    //retreivedInfoStateCopy['history'] = retreivedInfoState['history'];
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
    ];
    return (
        <div>
            <InfoPageTemplate dataToRender={retreivedInfoStateCopy} />
        </div>
    );
};

export default DesktopPcInfo;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
