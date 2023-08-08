import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const LaptopInfo = () => {
    const router = useRouter();
    const { id } = router.query;
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
        } = laptopData;
        return {
            category,
            model,
            CPU,
            RAM,
            SSD,
            serialNumber,
            location,
            price: '₩' + price,
            surtax: '₩' + surtax,
            totalPrice: '₩' + totalPrice,
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
        };
    };
    console.log(laptopInfo.model);
    return (
        <div>
            <InfoPageTemplate
                dataToRender={laptopInfo}
                title={`(${laptopInfo.serialNumber}) - ` + laptopInfo.model}
                type="laptop"
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
