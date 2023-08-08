import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const AccessoryInfo = () => {
    const router = useRouter();
    const { id } = router.query;
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

    const filterRelevantData = (accessoryData) => {
        const {
            model,
            category,
            serialNumber,
            location,
            price,
            surtax,
            totalPrice,
            illuSerialNumber,
            dateAvail,
            daysLeft,
            color,
            purchaseDate,
            purchasedFrom,
            history,
        } = accessoryData;
        return {
            model,
            category,
            serialNumber,
            location,
            price: '₩' + price,
            surtax: '₩' + surtax,
            totalPrice: '₩' + totalPrice,
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
        };
    };

    return (
        <div>
            <InfoPageTemplate
                dataToRender={accessoryInfo}
                title={accessoryInfo.model + ' - ' + accessoryInfo.category}
                type="accessory"
            />
        </div>
    );
};

export default AccessoryInfo;
export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
