import CategoryItem from './CategoryItem';
import { useSession } from 'next-auth/react';
import { Box, Container, Grid, Typography } from '@mui/material';
// import { useState } from 'react';

//const startingList = [] //import from DB
const sampleStartingList = [
    { name: 'Accessory', link: 'accessory', size: 197 },
    { name: 'Books', link: 'books', size: 90 },
    { name: 'Desktop PC', link: 'desktop-pc', size: 6 },
    { name: 'Laptops', link: 'laptop', size: 99 },
    { name: 'Software', link: 'software', size: 9 },
    { name: 'Test Device', link: 'test-device', size: 10 },
];

export default function OverviewPage() {
    const { data: session } = useSession();

    // to not make any errors comment for a while
    // const [categoryButtonList, setCategoryButtonList] =
    //     useState(sampleStartingList); //create a hook whose array can be updated in react
    // const categories = categoryButtonList.map((item) => (
    //     <CategoryItem
    //         key={item.name}
    //         name={item.name}
    //         link={item.link}
    //         size={item.size}
    //     />
    // ));

    const categories = sampleStartingList.map((item) => (
        <CategoryItem
            key={item.name}
            name={item.name}
            link={item.link}
            size={item.size}
        />
    ));

    return (
        <div>
            <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    sx={{ ml: -28 }}
                >
                    <Typography variant="h5" align="center">
                        Welcome &quot;{session.user.name}&quot;
                    </Typography>
                    <Box
                        sx={{
                            mt: 0.5,
                            width: 170,
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
