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

    const [userInfo, setUserInfo] = useState({
        name: '',
        team: '',
        project: [''],
        field: '',
        possessedItems: [''],
        remarks: '',
        email: '',
    });

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/users/user/${id}`)
            .then((res) => {
                const userData = res.data;
                const filteredData = filterRelevantData(userData);
                setUserInfo(filteredData);
            });
    }, []);

    const filterRelevantData = (userData) => {
        const {
            name,
            team,
            project,
            field,
            possessedItems = ['macbook', 'laptop'], //when db updates
            remarks,
        } = userData;
        return {
            name,
            team,
            project,
            field,
            possessedItems,
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

    const renderLabels = (
        <Grid container direction={'column'} spacing={2}>
            <Grid container justifyContent={'center'} columnSpacing={10}>
                <Grid item xs={5}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        Name
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography>{userInfo['name']}</Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} columnSpacing={10}>
                <Grid item xs={5}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        Team
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography>{userInfo['team']}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                justifyContent={'center'}
                columnSpacing={10}
                sx={{
                    height:
                        52 +
                        (userInfo['project'].length - 1 < 0
                            ? 0
                            : userInfo['project'].length - 1) *
                            24,
                }}
            >
                <Grid item xs={5}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        Projects
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <RenderProjects projects={userInfo['project']} />
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} columnSpacing={10}>
                <Grid item xs={5}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        Field
                    </Typography>
                </Grid>
                <Grid item xs={7} rowSpacing={10}>
                    <Typography>{userInfo['field']}</Typography>
                </Grid>
            </Grid>
            <Grid
                container
                justifyContent={'center'}
                columnSpacing={10}
                sx={{
                    height:
                        52 +
                        (userInfo['possessedItems'].length - 1 < 0
                            ? 0
                            : userInfo['possessedItems'].length - 1) *
                            24,
                }}
            >
                <Grid item xs={5}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        Possessed Items
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <RenderProjects projects={userInfo['possessedItems']} />
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} columnSpacing={10}>
                <Grid item xs={5}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        Remarks
                    </Typography>
                </Grid>
                <Grid item xs={7} rowSpacing={10}>
                    <Typography>{userInfo['remarks']}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );

    return (
        <PageWrapper
            title="Info"
            icon={<InfoOutlinedIcon />}
            href={`/assets/users`}
        >
            <Typography variant="h5" component="h5">
                {userInfo.name + ' - ' + userInfo.team}
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
