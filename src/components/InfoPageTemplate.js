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
    const renderLabels = Object.keys(dataToRender)
        .flat()
        .map(
            (v) =>
                !['history', 'details', 'summedCost', 'remarks'].includes(
                    v,
                ) && (
                    <LabelInfoWrapper key={v}>
                        <LabelContainer>
                            <Typography>
                                {v
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, function (str) {
                                        return str.toUpperCase(); //converts camelCase to Label
                                    })}
                            </Typography>
                        </LabelContainer>
                        <InfoContainer key={dataToRender[v]}>
                            <Info>{dataToRender[v]}</Info>
                        </InfoContainer>
                    </LabelInfoWrapper>
                ),
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
            <LabelInfoWrapper>
                <LabelContainer sx={{ marginBottom: 2 }}>
                    <Typography>History</Typography>
                </LabelContainer>
                <InfoContainer
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Typography>Remarks</Typography>
                </InfoContainer>
            </LabelInfoWrapper>
            {historyLoader}
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
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            <InfoWrapper>
                {renderLabels}
                {children}
                {historyRenderer}
                <Grid
                    container
                    sx={{ justifyContent: 'center', display: 'flex' }}
                >
                    <Button
                        variant="outlined"
                        href={pathname}
                        sx={{ margin: 5 }}
                    >
                        Edit
                    </Button>
                </Grid>
            </InfoWrapper>
        </PageWrapper>
    );
}

const InfoWrapper = styled('div')(() => ({
    width: 1100,
    height: 417,
    marginTop: 70,
}));

const LabelInfoWrapper = styled('div')(() => ({
    width: 1100,
    height: 20,
    marginBottom: 26,
    alignitems: 'flex-start',
    flexShrink: 0,
    display: 'flex',
}));

const LabelContainer = styled('div')(() => ({
    width: 402,
    display: 'flex',
    height: 22,
    justifyContent: 'right',
    flexDirection: 'row',
    flexShrink: 0,
}));

const InfoContainer = styled('div')(() => ({
    width: 491,
    marginLeft: 100,
    display: 'flex',
    height: 22,
    justifyContent: 'left',
    flexShrink: 0,
}));

const Info = styled(Typography)(() => ({
    width: 491,
    height: 22,
    flexShrink: 0,
    textAlign: 'left',
}));
