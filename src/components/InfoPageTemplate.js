import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';

//all data guarenteed to have an id, type, and history
export default function InfoPageTemplate({ dataToRender }) {
    dataToRender['history'].map((v) => {
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
                            <Label>
                                {v
                                    .replace(/([A-Z])/g, ' $1')
                                    .replace(/^./, function (str) {
                                        return str.toUpperCase(); //converts camelCase to Label
                                    })}
                            </Label>
                        </LabelContainer>
                        <InfoContainer key={dataToRender[v]}>
                            <Info>{dataToRender[v]}</Info>
                        </InfoContainer>
                    </LabelInfoWrapper>
                ),
        );

    const historyRenderer = dataToRender['history'].map((v) => (
        <Grid
            container
            rowSpacing={3}
            columnSpacing={1}
            justifyContent={'center'}
        >
            <Grid item xs="auto">
                <DateBox>{v.startDate} -</DateBox>
            </Grid>
            <Grid item xs={1.5}>
                <DateBox>{v.endDate}</DateBox>
            </Grid>
            <Grid item xs={2}>
                <DateBox justifyContent={'left'}>{v.historyLocation}</DateBox>
            </Grid>
        </Grid>
    ));

    return (
        <PageDiv>
            <InfoGroup>
                <InfoIcon />
                <InfoIconText>Info</InfoIconText>
            </InfoGroup>
            <Container fixed>
                <Box
                    sx={{
                        width: 842,
                        height: 547,
                        flexShrink: 0,
                        bgcolor: '#FFF',
                        strokWidth: 1,
                        stroke: '#DBDBDB',
                        borderRadius: 3,
                        border: '1px solid #B9B9B9',
                        overflow: 'auto',
                    }}
                >
                    <ItemTitle>{dataToRender['title']}</ItemTitle>
                    <TitleDivider />
                    <InfoWrapper>
                        {renderLabels}
                        <LabelContainer>
                            <Label>History</Label>
                        </LabelContainer>
                        {historyRenderer}
                    </InfoWrapper>
                </Box>
            </Container>
        </PageDiv>
    );
}
const DateBox = styled(Box)(() => ({
    color: '#000',
    fontFamily: 'Source Sans Pro',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
}));

const PageDiv = styled('div')(({ theme }) => ({
    backgroundColor: 'rgba(244, 244, 244, 0.63);',
    width: '100vw',
    height: '100vh',
}));

const InfoGroup = styled('div')(({ theme }) => ({
    fontWeight: theme.fontWeight,
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
}));

const InfoIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
    display: 'flex',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
}));

const InfoIconText = styled('div')(({ theme }) => ({
    display: 'flex',
    width: 106,
    height: 52,
    flexDirection: 'column',
    color: theme.color,
    fontFamily: 'Source Sans Pro',
    fontSize: 22,
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: 'normal',
    letterSpacing: 0.22,
}));

const ItemTitle = styled('text')(() => ({
    display: 'flex',
    width: 842,
    height: 44,
    flexDirection: 'column',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#000',
    fontFamily: 'Source Sans Pro',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontHeight: 600,
    lineHeight: 'normal',
    letterSpacing: 0.2,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
}));

const TitleDivider = styled(Divider)(() => ({
    width: 842,
    height: 1,
    background: '#DBDBDB',
}));

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
    width: 302,
    display: 'flex',
    height: 22,
    justifyContent: 'right',
    flexDirection: 'row',
    flexShrink: 0,
}));

const Label = styled('text')(() => ({
    width: 302,
    height: 22,
    flexShrink: 0,
    color: '#000',
    textAlign: 'right',
    fontFamily: 'Source Sans Pro',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
}));

const InfoContainer = styled('div')(() => ({
    width: 491,
    marginLeft: 49,
    display: 'flex',
    height: 22,
    justifyContent: 'left',
    flexShrink: 0,
}));

const Info = styled('text')(() => ({
    width: 491,
    height: 22,
    flexShrink: 0,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Source Sans Pro',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
}));

const HistoryContainer = styled('div')(() => ({
    width: 491,
    marginLeft: 351,
    display: 'flex',
    height: 22,
    justifyContent: 'left',
    flexShrink: 0,
}));
