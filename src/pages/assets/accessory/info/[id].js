import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Typography } from '@mui/material';

const AccessoryInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const { pathname } = router;

    const [accessoryInfo, setAccessoryInfo] = useState({
        model: '',
        category: '',
        serialNumber: '',
        location: null,
        price: '',
        surtax: '',
        totalPrice: '',
        illuminareanSerialNumber: '',
        availableDate: '',
        color: '',
        purchaseDate: '',
        purchasedFrom: 'G 마켓',
        history: [],
        remarks: '',
        isRepair: false,
        request: '',
        replace: '',
        repairPrice: '',
        repairDetails: '',
    });

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/accessory/item/${id}`)
            .then((res) => {
                const accessoryData = res.data;
                const filteredData = filterRelevantData(accessoryData);
                setAccessoryInfo(filteredData);
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

    const filterRelevantData = (accessoryData) => {
        const {
            model,
            category,
            serialNumber,
            location,
            price,
            currency,
            surtax,
            totalPrice,
            illuSerialNumber,
            dateAvail,
            daysLeft,
            color,
            purchaseDate,
            purchasedFrom,
            history,
            isRepair,
            request,
            replace,
            repairPrice,
            repairDetails,
            remarks,
        } = accessoryData;
        return {
            model,
            category,
            serialNumber,
            location,
            price: currency_symbols[currency]
                ? currency_symbols[currency] + price
                : currency + price,
            surtax: currency_symbols[currency]
                ? currency_symbols[currency] + surtax
                : currency + surtax,
            totalPrice: currency_symbols[currency]
                ? currency_symbols[currency] + totalPrice
                : currency + totalPrice,
            illuminareanSerialNumber: illuSerialNumber,
            availableDate:
                moment(dateAvail).format('YYYY-MM-DD') +
                ' - ' +
                Math.floor(daysLeft / 360) +
                ' year(s) ' +
                (daysLeft % 360) +
                ' days ',
            color,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            purchasedFrom,
            history,
            isRepair,
            request,
            replace,
            repairPrice,
            repairDetails,
            remarks,
        };
    };

    return (
        <div>
            <InfoPageTemplate
                dataToRender={accessoryInfo}
                title={accessoryInfo.model + ' - ' + accessoryInfo.category}
                type="accessory"
                pathname={pathname.replace('info', 'edit').replace('[id]', id)}
            />
        </div>
    );
};

export default AccessoryInfo;
export async function getServerSideProps() {
    return {
        props: {},
    };
}
