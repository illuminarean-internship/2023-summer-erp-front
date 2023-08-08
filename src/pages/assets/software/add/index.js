import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import PageWrapper from '../../../../components/form/PageWrapper';
import { AddBoxOutlined } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import useLocationsData from '../../../../hooks/useLocationsData';
import SoftwareForm from '../../../../components/form/SoftwareForm';

const SoftwareAdd = () => {
    const router = useRouter();
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
                'http://43.200.193.130:4040/api/software',
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
            title="Add"
            icon={<AddBoxOutlined />}
            href="/assets/software"
        >
            <Typography variant="h5" component="h5" sx={{ color: 'gray' }}>
                New Software
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

export default SoftwareAdd;
