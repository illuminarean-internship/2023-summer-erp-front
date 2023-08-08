import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import PageWrapper from './form/PageWrapper';

//all data guarenteed to have an id, type, and history
export default function InfoPageTemplate({ dataToRender, title, type }) {
    dataToRender['history'] = dataToRender['history'].map((v) => {
        return {
            startDate: moment(v.startDate).format('YYYY-MM-DD'),
            endDate: v.endDate ? moment(v.endDate).format('YYYY-MM-DD') : '',
            historyLocation: v.historyLocation,
            historyRemark: v.historyRemark,
        };
    }); //temporary hardcode
    const renderLabels = Object.keys(dataToRender) //hard coded for now, but eventually will do based on id
        .flat()
        .map(
            (v) =>
                v != 'history' && (
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
    const historyLoader = dataToRender['history'].map((v, index) => (
        <Grid
            container
            rowSpacing={3}
            columnSpacing={1}
            justifyContent={'center'}
            key={index}
        >
            <Grid item xs="auto">
                <Typography>{v.startDate} -</Typography>
            </Grid>
            <Grid item xs={1.5}>
                <Typography>{v.endDate}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography justifyContent={'left'}>
                    {v.historyLocation}
                </Typography>
            </Grid>
        </Grid>
    ));

    const historyRenderer = type != 'software' && (
        <>
            <LabelContainer sx={{ marginBottom: 2 }}>
                <Typography>History</Typography>
            </LabelContainer>
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
                {historyRenderer}
            </InfoWrapper>
        </PageWrapper>
    );
}

const InfoWrapper = styled('div')(() => ({
    width: 842,
    height: 417,
    marginTop: 70,
}));

const LabelInfoWrapper = styled('div')(() => ({
    width: 842,
    height: 20,
    marginBottom: 26,
    alignItems: 'flex-start',
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
