import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
    FilterPrices,
    currency_symbols,
} from '../../../../constants/filterPrices';

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
        repairPrice: null,
        resellPrice: null,
        karrotPrice: null,
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
            issues,
            request,
            replace,
            repairPrice,
            repairDetails,
            resellPrice,
            karrotPrice,
            remarks,
        } = accessoryData;
        //console.log(FilterPrices(repairPrice, currency));
        //console.log(!repairPrice, !resellPrice, !karrotPrice);
        console.log(repairPrice, currency);
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
