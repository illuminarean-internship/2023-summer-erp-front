import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const SoftwareInfo = () => {
    const router = useRouter();
    const { id } = router.query;
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
            unitPrice: '₩' + unitPrice,
            quantity,
            totalPrice: '₩' + totalPrice,
            currency,
            reference,
            user,
            history,
        };
    };

    console.log(softwareInfo);

    return (
        <div>
            <InfoPageTemplate
                dataToRender={softwareInfo}
                title={softwareInfo.name}
                type="software"
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
