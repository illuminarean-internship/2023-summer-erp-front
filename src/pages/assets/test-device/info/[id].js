import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    FilterPrices,
    currency_symbols,
} from '../../../../constants/filterPrices';

const TestDeviceInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const { pathname } = router;

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
        remarks: '',
        isRepair: false,
        issues: '',
        request: '',
        replace: '',
        repairPrice: '',
        resellPrice: '',
        karrotPrice: '',
        repairDetails: '',
    });

    useEffect(() => {
        axios
            .get(`http://internship-server.illuminarean.com:4040/api/test-device/item/${id}`)
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
            currency,
            history,
            isRepair,
            issues,
            request,
            replace,
            repairPrice,
            repairDetails,
            resellPrice,
            karrotPrice,
            remarks,
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
            totalPrice: currency_symbols[currency]
                ? currency_symbols[currency] + totalPrice
                : currency + totalPrice,
            purchasedFrom,
            history,
            isRepair,
            issues,
            request,
            replace,
            repairPrice: !repairPrice
                ? ''
                : FilterPrices(repairPrice, currency),
            resellPrice: !resellPrice
                ? ''
                : FilterPrices(repairPrice, currency),
            karrotPrice: !karrotPrice
                ? ''
                : FilterPrices(repairPrice, currency),
            repairDetails,
            remarks,
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
                pathname={pathname.replace('info', 'edit').replace('[id]', id)}
            />
        </div>
    );
};

export default TestDeviceInfo;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
