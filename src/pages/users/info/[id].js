import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Divider, Typography } from '@mui/material';
import PageWrapper from '../../../components/form/PageWrapper.js';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { styled } from '@mui/material/styles';

const UserInfo = () => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState([
        {
            name: '...',
            team: '...',
            field: '...',
            project: [''],
            remarks: '...',
        },
        [''],
        [''],
        [''],
        [''],
        [''],
        [''],
        null,
    ]);

    const fetchData = async () => {
        try {
            const responses = await Promise.all([
                axios.get(`http://localhost:4040/api/users/user/${id}`),
                axios.get(
                    `http://localhost:4040/api/accessory?userId=${id}`,
                ),
                axios.get(`http://localhost:4040/api/books?userId=${id}`),
                axios.get(
                    `http://localhost:4040/api/test-device?userId=${id}`,
                ),
                axios.get(
                    `http://localhost:4040/api/desktop-pc?userId=${id}`,
                ),
                axios.get(`http://localhost:4040/api/laptop?userId=${id}`),
                axios.get(
                    `http://localhost:4040/api/software?userId=${id}`,
                ),
            ]);
            const results = await Promise.all([
                responses[0].data,
                responses[1].data,
                responses[2].data,
                responses[3].data,
                responses[4].data,
                responses[5].data,
                responses[6].data,
            ]);
            results[0] = filterRelevantData(results[0]);
            results[7] = results[1].concat(
                results[2],
                results[3],
                results[4],
                results[5],
                results[6],
            ).length;
            setData(results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const filterRelevantData = (userData) => {
        const { name, team, project, field, remarks } = userData;
        return {
            name,
            team,
            project,
            field,
            remarks,
        };
    };

    const RenderProjects = ({ projects }) => {
        if (projects.length === 0) {
            return <Typography>No projects to display.</Typography>;
        }

        return (
            <div>
                {projects.map((project, index) => (
                    <Typography key={index}>{project}</Typography>
                ))}
            </div>
        );
    };

    const RenderPossessedItems = () => {
        const possessedItems = data.slice(1, 7);
        const itemLabels = [].concat(
            possessedItems[0].map((item) => item['model']), //accessory
            possessedItems[1].map((item) => item['title']), //books
            possessedItems[2].map((item) => item['model']), //test-device
            possessedItems[3].map(
                (item) => item['illumiSerial'] + ' - Desktop PC', //desktop-pc
            ),
            possessedItems[4].map(
                (item) =>
                    `(${item['serialNumber']}) - ${item['category']} ${item['model']}`,
            ), //laptop
            possessedItems[5].map((item) => item['name']), //software
        );

        possessedItems[5] = possessedItems[5] && possessedItems[5]['name'];

        return (
            <div>
                {itemLabels.map((item, index) => (
                    <Typography key={index}>{item}</Typography>
                ))}
            </div>
        );
    };

    const renderLabels = (
        <Grid container columnSpacing={10} rowSpacing={2}>
            <Grid item="true" xs={5}>
                <Typography display={'flex'} justifyContent={'end'}>
                    Name
                </Typography>
            </Grid>
            <Grid item="true" xs={7}>
                <Typography>{data[0]['name']}</Typography>
            </Grid>

            <Grid item="true" xs={5}>
                <Typography display={'flex'} justifyContent={'end'}>
                    Team
                </Typography>
            </Grid>
            <Grid item="true" xs={7}>
                <Typography>{data[0]['team']}</Typography>
            </Grid>

            <Grid item="true" xs={5}>
                <Typography display={'flex'} justifyContent={'end'}>
                    Projects
                </Typography>
            </Grid>
            <Grid item="true" xs={7}>
                <RenderProjects
                    projects={data[0]['project']}
                    sx={{
                        height:
                            52 +
                            (data[0]['project'].length - 1 < 0
                                ? 0
                                : data[0]['project'].length - 1) *
                                24,
                    }}
                />
            </Grid>

            <Grid item="true" xs={5}>
                <Typography display={'flex'} justifyContent={'end'}>
                    Field
                </Typography>
            </Grid>
            <Grid item="true" xs={7} rowSpacing={10}>
                <Typography>{data[0]['field']}</Typography>
            </Grid>

            <Grid item="true" xs={5}>
                <Typography display={'flex'} justifyContent={'end'}>
                    Possessed Items
                </Typography>
            </Grid>
            <Grid
                item="true"
                xs={7}
                sx={{
                    height: 52 + (data[7] - 1 < 0 ? 0 : data[7] - 1) * 24,
                }}
            >
                <RenderPossessedItems />
            </Grid>

            <Grid item="true" xs={5}>
                <Typography display={'flex'} justifyContent={'end'}>
                    Remarks
                </Typography>
            </Grid>
            <Grid item="true" xs={7} rowSpacing={10}>
                <Typography>{data[0]['remarks']}</Typography>
            </Grid>
        </Grid>
    );

    return (
        <PageWrapper title="Info" icon={<InfoOutlinedIcon />} href={`/users`}>
            <Typography variant="h5" component="h5">
                {data[0].name + ' - ' + data[0].team}
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            <InfoWrapper>{renderLabels}</InfoWrapper>
        </PageWrapper>
    );
};
const InfoWrapper = styled('div')(() => ({
    width: 1100,
    height: 417,
    marginTop: 70,
}));

export default UserInfo;
export async function getServerSideProps() {
    return {
        props: {},
    };
}
