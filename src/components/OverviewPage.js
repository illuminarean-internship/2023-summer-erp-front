import CategoryItem from './CategoryItem';
import { Box, Container, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
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
            const responses = await Promise.all([
                axios.get('http://43.200.193.130:4040/api/accessory/'),
                axios.get('http://43.200.193.130:4040/api/books/'),
                axios.get('http://43.200.193.130:4040/api/test-device/'),
                axios.get('http://43.200.193.130:4040/api/desktop-pc/'),
                axios.get('http://43.200.193.130:4040/api/laptop/'),
                axios.get('http://43.200.193.130:4040/api/software/'),
            ]);

            const results = await Promise.all([
                responses[0].data.length,
                responses[1].data.length,
                responses[2].data.length,
                responses[3].data.length,
                responses[4].data.length,
                responses[5].data.length,
            ]);
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

    const categories = sampleStartingList.map((item) => (
        <CategoryItem item={item} key={uuidv4()} />
    ));

    return (
        <div>
            <Container sx={{ p: 3 }}>
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ ml: -28 }}
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
                <Typography variant="h5" sx={{ mb: 3, mt: 2 }}>
                    Overview
                </Typography>

                <Box display="flex" justifyContent="center">
                    <Grid container spacing={2}>
                        {categories}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}
