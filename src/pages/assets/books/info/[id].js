import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const BooksInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const { pathname } = router;

    const [bookInfo, setBookInfo] = useState({
        title: '',
        team: '',
        location: null,
        purchaseDate: '',
        purchasedFrom: 'G 마켓',
        price: '',
        history: [],
        remarks: '',
    });

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/books/item/${id}`)
            .then((res) => {
                const bookData = res.data;
                const filteredData = filterRelevantData(bookData);
                setBookInfo(filteredData);
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

    const filterRelevantData = (bookData) => {
        const {
            title,
            team,
            location,
            purchaseDate,
            purchasedFrom,
            price,
            history,
            remarks,
            currency,
        } = bookData;
        return {
            title,
            team,
            location,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            purchasedFrom,
            price: currency_symbols[currency] + price,
            history,
            remarks,
        };
    };

    //    const retreivedInfoStateCopy = {};
    //    retreivedInfoStateCopy['title'] = retreivedInfoState['title'];
    //    retreivedInfoStateCopy['team'] = retreivedInfoState['team'];
    //    retreivedInfoStateCopy['location'] = retreivedInfoState['location'];
    //    retreivedInfoStateCopy['price'] =
    //        '₩' + JSON.stringify(retreivedInfoState['price']);
    //    retreivedInfoStateCopy['purchaseDate'] = moment(
    //        retreivedInfoState['purchaseDate'],
    //    ).format('YYYY-MM-DD');
    //    retreivedInfoStateCopy['history'] = [
    //        {
    //            startDate: '2023-8-3',
    //            endDate: '2023-8-4',
    //            historyLocation: 'Office',
    //            historyRemark: 'here',
    //        },
    //        {
    //            startDate: '2023-8-6',
    //            endDate: null,
    //            historyLocation: 'Dev team',
    //            historyRemark: '',
    //        },
    //    ];
    return (
        <div>
            <InfoPageTemplate
                dataToRender={bookInfo}
                title={bookInfo.title}
                type="books"
                pathname={pathname.replace('info', 'edit').replace('[id]', id)}
            />
        </div>
    );
};

export default BooksInfo;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
