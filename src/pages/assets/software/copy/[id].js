import { useRouter } from 'next/router';
import useLocationsData from '../../../../hooks/useLocationsData';
import { useEffect, useState } from 'react';
import moment from 'moment';
import PageWrapper from '../../../../components/form/PageWrapper';
import { ContentCopy } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import SoftwareForm from '../../../../components/form/SoftwareForm';
import axios from 'axios';

const SoftwareCopy = () => {
    const router = useRouter();
    const { id } = router.query;

    const [softwareInfo, setSoftwareInfo] = useState({
        name: '',
        purchaseDate: '',
        remarks: '',
        unitPrice: '',
        quantity: '',
        totalPrice: '',
        currency: 'KRW',
        reference: '',
        user: null,
    });

    const locations = useLocationsData();

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
        } = softwareData;
        return {
            name,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            remarks,
            unitPrice,
            quantity,
            totalPrice,
            currency,
            reference,
            user,
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSoftwareInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleUserChange = (event, newValue) => {
        setSoftwareInfo((prevInfo) => ({
            ...prevInfo,
            user: newValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:4040/api/software',
                softwareInfo,
            );
            console.log('Software created successfully:', response.data);
            router.push('/assets/software');
        } catch (error) {
            console.error('Error creating software:', error);
        }
    };

    const handleUnitPriceChange = (e) => {
        const { value } = e.target;
        setSoftwareInfo((prevInfo) => ({
            ...prevInfo,
            unitPrice: value,
            totalPrice: (value * prevInfo.quantity).toString(), // Calculate totalPrice
        }));
    };

    const handleQuantityChange = (e) => {
        const { value } = e.target;
        setSoftwareInfo((prevInfo) => ({
            ...prevInfo,
            quantity: value,
            totalPrice: (prevInfo.unitPrice * value).toString(), // Calculate totalPrice
        }));
    };

    return (
        <PageWrapper
            title="Copy"
            icon={<ContentCopy />}
            href="/assets/software"
        >
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                {softwareInfo.name}
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            <SoftwareForm
                handleSubmit={handleSubmit}
                softwareInfo={softwareInfo}
                handleChange={handleChange}
                locations={locations}
                handleUserChange={handleUserChange}
                handleUnitPriceChange={handleUnitPriceChange}
                handleQuantityChange={handleQuantityChange}
            />
        </PageWrapper>
    );
};

export default SoftwareCopy;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
