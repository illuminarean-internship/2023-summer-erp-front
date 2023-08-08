import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TestDeviceInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const [testDeviceInfo, setTestDeviceInfo] = useState({
        category: '',
        model: '',
        RAM: '',
        memory: '',
        team: '',
        location: '',
        serialNumber: '',
        condition: '',
        color: '',
        totalPrice: '',
        purchasedFrom: 'G 마켓',
        history: [],
    });

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/test-device/item/${id}`)
            .then((res) => {
                const testDeviceData = res.data;
                const filteredData = filterRelevantData(testDeviceData);
                setTestDeviceInfo(filteredData);
            });
    }, []);

    const filterRelevantData = (testDeviceData) => {
        const {
            category,
            model,
            RAM,
            memory,
            team,
            location,
            serialNumber,
            condition,
            color,
            totalPrice,
            purchasedFrom,
            history,
        } = testDeviceData;
        return {
            category,
            model,
            RAM,
            memory,
            team,
            location,
            serialNumber,
            condition,
            color,
            totalPrice: '₩' + totalPrice,
            purchasedFrom,
            history,
        };
    };
    console.log(testDeviceInfo.model);
    return (
        <div>
            <InfoPageTemplate
                dataToRender={testDeviceInfo}
                title={
                    `(${testDeviceInfo.serialNumber}) - ` + testDeviceInfo.model
                }
                type="test-device"
            />
        </div>
    );
};

export default TestDeviceInfo;

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
