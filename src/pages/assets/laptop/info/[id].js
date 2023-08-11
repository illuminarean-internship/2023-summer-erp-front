import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const LaptopInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const { pathname } = router;

    const [laptopInfo, setLaptopInfo] = useState({
        category: '',
        model: '',
        CPU: '',
        RAM: '',
        SSD: '',
        serialNumber: '',
        location: '',
        price: '',
        surtax: '',
        totalPrice: '',
        illuminareanSerialNumber: '',
        color: '',
        purchaseDate: '',
        availableDate: '',
        history: [],
        remarks: '',
        isRepair: false,
        request: '',
        replace: '',
        repairPrice: '',
        resellPrice: '',
        karrotPrice: '',
        repairDetails: '',
    });

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/laptop/item/${id}`)
            .then((res) => {
                const laptopData = res.data;
                const filteredData = filterRelevantData(laptopData);
                setLaptopInfo(filteredData);
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

    const filterRelevantData = (laptopData) => {
        const {
            category,
            model,
            CPU,
            RAM,
            SSD,
            serialNumber,
            location,
            price,
            surtax,
            totalPrice,
            illumiSerial,
            color,
            purchaseDate,
            dateAvail,
            daysLeft,
            history,
            currency,
            remarks,
            isRepair,
            issues,
            request,
            replace,
            repairPrice,
            resellPrice,
            karrotPrice,
            repairDetails,
        } = laptopData;
        return {
            category,
            model,
            CPU,
            RAM,
            SSD,
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
            illuminareanSerialNumber: illumiSerial,
            color,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            availableDate:
                moment(dateAvail).format('YYYY-MM-DD') +
                ' - ' +
                (daysLeft <= 0
                    ? 'Error'
                    : Math.floor(daysLeft / 360) +
                      ' year(s) ' +
                      (daysLeft % 360) +
                      ' days '),
            history,
            isRepair,
            issues,
            request,
            replace,
            repairPrice: !repairPrice
                ? ''
                : currency_symbols[currency]
                ? currency_symbols[currency] + repairPrice
                : currency + repairPrice,
            resellPrice: !resellPrice
                ? ''
                : currency_symbols[currency]
                ? currency_symbols[currency] + resellPrice
                : currency + resellPrice,
            karrotPrice: !karrotPrice
                ? ''
                : currency_symbols[currency]
                ? currency_symbols[currency] + karrotPrice
                : currency + karrotPrice,
            repairDetails,
            remarks,
        };
    };

    return (
        <div>
            <InfoPageTemplate
                dataToRender={laptopInfo}
                title={`(${laptopInfo.serialNumber}) - ` + laptopInfo.model}
                type="laptop"
                pathname={pathname.replace('info', 'edit').replace('[id]', id)}
            />
        </div>
    );
};

export default LaptopInfo;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
