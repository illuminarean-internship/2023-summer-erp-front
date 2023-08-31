import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Button, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import PageWrapper from './form/PageWrapper';

//all data guarenteed to have an id, type, and history
export default function InfoPageTemplate({
    dataToRender,
    title,
    type,
    children = null,
    pathname = '',
}) {
    const renderLabels = (
        <Grid container columnSpacing={10} rowSpacing={2}>
            {Object.keys(dataToRender)
                .flat()
                .map(
                    (v) =>
                        (![
                            'history',
                            'details',
                            'summedCost',
                            'remarks',
                            'isRepair',
                            'issues',
                            'replace',
                            'request',
                            'repairPrice',
                            'repairDetails',
                            'resellPrice',
                            'karrotPrice',
                        ].includes(v) ||
                            (v == 'remarks' && type == 'software')) && (
                            <Grid container xs={12} key={v}>
                                <Grid item="true" xs={5}>
                                    <Typography
                                        display={'flex'}
                                        justifyContent={'end'}
                                    >
                                        {v
                                            .replace(/([A-Z])/g, ' $1')
                                            .replace(/^./, function (str) {
                                                return str.toUpperCase();
                                            })}
                                    </Typography>
                                </Grid>
                                <Grid item="true" xs={7}>
                                    <Typography>{dataToRender[v]}</Typography>
                                </Grid>
                            </Grid>
                        ),
                )}
        </Grid>
    );
    const historyLoader = dataToRender['history'].map((history, index) => (
        <Grid
            container
            rowSpacing={3}
            columnSpacing={1}
            justifyContent={'center'}
            key={index}
        >
            <Grid
                item="true"
                xs={4.5}
                sx={{ display: 'flex', justifyContent: 'right' }}
            >
                <Typography>
                    {moment(history.startDate).format('YYYY-MM-DD')} -
                </Typography>
            </Grid>
            <Grid item="true" xs={1.5}>
                <Typography>
                    {history.endDate
                        ? moment(history.endDate).format('YYYY-MM-DD')
                        : null}
                </Typography>
            </Grid>
            <Grid item="true" xs={1.75}>
                <Typography justifyContent={'left'}>
                    {history.historyLocation}
                </Typography>
            </Grid>
            <Grid item="true" xs={4.25}>
                <Typography justifyContent={'left'}>
                    {history.historyRemark}
                </Typography>
            </Grid>
        </Grid>
    ));

    const historyRenderer = type !== 'software' && (
        <>
            <Grid container columnSpacing={10} rowSpacing={2}>
                <Grid item="true" xs={5} sx={{ mt: 2 }}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        History
                    </Typography>
                </Grid>
                <Grid
                    item="true"
                    xs={7}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Typography
                        display={'flex'}
                        justifyContent={'end'}
                        sx={{ mt: 2 }}
                    >
                        History Remarks
                    </Typography>
                </Grid>
            </Grid>
            {historyLoader}
        </>
    );

    const repairRender = dataToRender['isRepair'] && (
        <>
            <Grid container columnSpacing={10} rowSpacing={2} sx={{ mt: 3 }}>
                <Grid item="true" xs={5}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        Issues
                    </Typography>
                </Grid>
                <Grid item="true" xs={7}>
                    <Info>{dataToRender['issues']}</Info>
                </Grid>
            </Grid>
            <Grid
                container
                columnSpacing={10}
                rowSpacing={2}
                sx={{ mt: 10, textDecoration: 'underline' }}
            >
                <Grid item="true" xs={5}>
                    <Typography display={'flex'} justifyContent={'end'}>
                        Repair & Replace
                    </Typography>
                </Grid>
            </Grid>
            {[
                'request',
                'replace',
                'repairPrice',
                'repairDetails',
                'resellPrice',
                'karrotPrice',
            ].map((v) => (
                <Grid container columnSpacing={10} rowSpacing={2} key={v}>
                    <Grid item="true" xs={5}>
                        <Typography display={'flex'} justifyContent={'end'}>
                            {v
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, function (str) {
                                    return str.toUpperCase(); //converts camelCase to Label
                                })}
                        </Typography>
                    </Grid>
                    <Grid item="true" xs={7} key={dataToRender[v]}>
                        <Info>{dataToRender[v]}</Info>
                    </Grid>
                </Grid>
            ))}
        </>
    );

    return (
        <PageWrapper
            title="Info"
            icon={<InfoOutlinedIcon />}
            href={`/assets/${type}`}
        >
            <Typography variant="h5" component="h5">
                {title}
            </Typography>
            <Divider sx={{ mt: 2, mb: 10, borderColor: 'gray' }} />
            <div>
                {renderLabels}
                {historyRenderer}
                {children}
                {repairRender}
                <Grid
                    container
                    columnSpacing={10}
                    rowSpacing={3}
                    sx={{ marginTop: 3 }}
                >
                    <Grid item="true" xs={5}>
                        <Typography display={'flex'} justifyContent={'end'}>
                            {type != 'books' && type != 'software' && 'Remarks'}
                        </Typography>
                    </Grid>
                    <Grid item="true" xs={7}>
                        <Info>
                            {type != 'software' && dataToRender['remarks']}
                        </Info>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{ justifyContent: 'center', display: 'flex' }}
                >
                    <Button
                        variant="outlined"
                        href={pathname}
                        sx={{ margin: 4 }}
                    >
                        Edit
                    </Button>
                </Grid>
            </div>
        </PageWrapper>
    );
}

const Info = styled(Typography)(() => ({
    width: 491,
    height: 22,
    flexShrink: 0,
    textAlign: 'left',
}));
