import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
    currency_symbols,
} from '../../../../constants/filterPrices';

const SoftwareInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const { pathname } = router;

    const [softwareInfo, setSoftwareInfo] = useState({
        name: '',
        purchaseDate: '',
        unitPrice: '',
        remarks: '',
        quantity: '',
        totalPrice: '',
        currency: '',
        reference: '',
        user: '',
        history: [],
    });

    useEffect(() => {
        axios
            .get(`http://localhost:4040/api/software/item/${id}`)
            .then((res) => {
                const softwareData = res.data;
                const filteredData = filterRelevantData(softwareData);
                setSoftwareInfo(filteredData);
            });
    }, []);



    const filterRelevantData = (softwareData) => {
        const {
            name,
            purchaseDate,
            remarks,
            unitPrice,
            quantity,
            totalPrice,
            currency,
            reference,
            user,
            history,
        } = softwareData;
        return {
            name,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            remarks,
            unitPrice: currency_symbols[currency]
                ? currency_symbols[currency] + unitPrice
                : currency + unitPrice,
            quantity,
            totalPrice: currency_symbols[currency]
                ? currency_symbols[currency] + totalPrice
                : currency + totalPrice,
            currency,
            reference,
            user,
            history,
        };
    };
    return (
        <div>
            <InfoPageTemplate
                dataToRender={softwareInfo}
                title={softwareInfo.name}
                type="software"
                pathname={pathname.replace('info', 'edit').replace('[id]', id)}
            />
        </div>
    );
};

export default SoftwareInfo;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
