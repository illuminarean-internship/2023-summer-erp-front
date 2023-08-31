import CategoryItem from './CategoryItem';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function OverviewPage() {
    const { data: session } = useSession();
    const [categorySizes, setCategorySizes] = useState([
        '...',
        '...',
        '...',
        '...',
        '...',
        '...',
    ]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'http://localhost:4040/api/info',
            );
            const results = [
                response.data['numOfAcc'],
                response.data['numOfBook'],
                response.data['numOfDesktop'],
                response.data['numOfLaptop'],
                response.data['numOfSW'],
                response.data['numOfTestDev'],
            ];
            setCategorySizes(results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    let sampleStartingList = [
        { name: 'Accessory', link: 'accessory', size: categorySizes[0] },
        { name: 'Books', link: 'books', size: categorySizes[1] },
        { name: 'Desktop PC', link: 'desktop-pc', size: categorySizes[2] },
        { name: 'Laptop', link: 'laptop', size: categorySizes[3] },
        { name: 'Software', link: 'software', size: categorySizes[4] },
        { name: 'Test Device', link: 'test-device', size: categorySizes[5] },
    ];

    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    const chunkedCategories = chunkArray(sampleStartingList, 3);

    const rows = chunkedCategories.map((rowItems, rowIndex) => (
        <Grid container spacing={2} key={rowIndex}>
            {rowItems.map((item) => (
                <Grid item xs={4} key={item.name}>
                    <CategoryItem item={item} />
                </Grid>
            ))}
        </Grid>
    ));

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                sx={{ mr: 15, mt: 3 }}
            >
                <Typography variant="h5" align="center">
                    {`Welcome "${session.user.name}"`}
                </Typography>
                <Box
                    sx={{
                        mt: 0.5,
                        width: 250,
                        height: 7,
                        bgcolor: 'text.disabled',
                    }}
                />
            </Box>

            <Container>
                <Typography variant="h5" sx={{ mb: 3, mt: 2 }}>
                    Overview
                </Typography>

                <Box display="flex" justifyContent="center">
                    <Grid container spacing={2}>
                        {rows}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}
