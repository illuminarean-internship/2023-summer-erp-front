import { useRouter } from 'next/router';
import InfoPageTemplate from '../../../../components/InfoPageTemplate';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Grid, Typography, Divider } from '@mui/material';

const DesktopPcInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const [desktopPcInfo, setdesktopPcInfo] = useState({
        illuminareanSerialNumber: '',
        purchaseDate: '',
        purchasedFrom: '',
        purpose: '',
        location: '',
        details: [],
        history: [],
        summedCost: '',
    });

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/desktop-pc/item/${id}`)
            .then((res) => {
                const desktopPcData = res.data;
                const filteredData = filterRelevantData(desktopPcData);
                setdesktopPcInfo(filteredData);
            });
    }, []);

    const filterRelevantData = (desktopPcData) => {
        const {
            illumiSerial,
            purchaseDate,
            purchasedFrom,
            purpose,
            location,
            details,
            history,
            totalPrice,
        } = desktopPcData;
        return {
            illuminareanSerialNumber: illumiSerial,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            purchasedFrom,
            purpose,
            location,
            details,
            history,
            summedCost: totalPrice,
        };
    };

    const detailsToRender = desktopPcInfo.details.map((v) => (
        <Grid container spacing={5} justifyContent={'center'} id={v.id}>
            <Grid item xs={2}>
                <Typography justifyContent={'center'}>{v.category}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography justifyContent={'center'}>{v.name}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography justifyContent={'center'}>
                    {v.currency}
                    {v.price}
                </Typography>
            </Grid>
        </Grid>
    ));
    const detailRenderer = (
        <Grid container spacing={3} justifyContent={'center'}>
            <Grid item xs={10} sx={{ marginBottom: 5 }}>
                <Divider width={900} />
            </Grid>
            <Grid container spacing={4} justifyContent={'center'}>
                <Grid item xs={2}>
                    <Typography
                        justifyContent={'center'}
                        sx={{ textDecoration: 'underline' }}
                    >
                        CPU
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography
                        justifyContent={'center'}
                        sx={{ textDecoration: 'underline' }}
                    >
                        Name
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography
                        justifyContent={'center'}
                        sx={{ textDecoration: 'underline' }}
                    >
                        Price
                    </Typography>
                </Grid>
            </Grid>
            {detailsToRender}
            <Grid
                container
                spacing={4}
                justifyContent={'center'}
                sx={{ marginTop: 1 }}
            >
                <Grid item xs={2}>
                    <Typography
                        justifyContent={'center'}
                        sx={{ textDecoration: 'underline' }}
                    >
                        Total Price
                    </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}>
                    <Typography justifyContent={'center'} sx={{ color: 'red' }}>
                        {desktopPcInfo.summedCost}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={10} sx={{ marginTop: 1, marginBottom: 5 }}>
                <Divider width={900} />
            </Grid>
        </Grid>
    );
    return (
        <div>
            <InfoPageTemplate
                dataToRender={desktopPcInfo}
                title={
                    `(${desktopPcInfo.illuminareanSerialNumber}) - ` +
                    'Desktop PC'
                }
                type="desktop-pc"
                children={detailRenderer}
            />
        </div>
    );
};

export default DesktopPcInfo;

export async function getServerSideProps(context) {
    return {
        props: {},
    };
}
