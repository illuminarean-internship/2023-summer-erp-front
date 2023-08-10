import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

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

    const currency_symbols = {
        USD: '$', // US Dollar
        EUR: '€', // Euro
        CRC: '₡', // Costa Rican Colón
        GBP: '£', // British Pound Sterling
        ILS: '₪', // Israeli New Sheqel
        INR: '₹', // Indian Rupee
        JPY: '¥', // Japanese Yen
        KRW: '₩', // South Korean Won
        NGN: '₦', // Nigerian Naira
        PHP: '₱', // Philippine Peso
        PLN: 'zł', // Polish Zloty
        PYG: '₲', // Paraguayan Guarani
        THB: '฿', // Thai Baht
        UAH: '₴', // Ukrainian Hryvnia
        VND: '₫', // Vietnamese Dong
    };

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
