import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Container, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';

//all data guarenteed to have an id, type, and history

export default function InfoPageTemplate({ id }) {
    // useEffect(() => {
    //     axios
    //         .get('http://43.200.193.130:4040/api/books/')
    //         .then(function (response) {
    //             console.log(response.data);
    //         });
    // }, []);

    const sampleData = {
        _id: 'first',
        type: 'book',
        title: 'UI/UX 디자인 이론과 실습',
        team: 'Design Team',
        location: 'Office',
        purchaseDate: '07 / 10 / 2019',
        price: '₩27,000',
    };

    const renderLabels = Object.keys(sampleData) //hard coded for now, but eventually will do based on id
        .flat()
        .map(
            (v) =>
                v !== 'type' &&
                v !== '_id' &&
                v !== 'history' && (
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
                        <InfoContainer key={sampleData[v]}>
                            <Info>{sampleData[v]}</Info>
                        </InfoContainer>
                    </LabelInfoWrapper>
                ),
        );

    const history = [
        '07 / 10 / 2019 - 10 / 28 / 2020      Jonghyun Lee ',
        '10 / 29 / 2020 -                             Office ',
    ];

    const historyRenderer = history.map(
        (v) =>
            v !== history[0] && (
                <HistoryContainer
                    sx={{
                        width: 281,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Info style={{ whiteSpace: 'pre' }}>{v}</Info>
                </HistoryContainer>
            ),
    );

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
                    }}
                >
                    <ItemTitle>UI/UX 디자인 이론과 실습</ItemTitle>
                    <TitleDivider />
                    <InfoWrapper>
                        {renderLabels}
                        <LabelInfoWrapper sx={{ marginBottom: 1.25 }}>
                            <LabelContainer>
                                <Label>History</Label>
                            </LabelContainer>
                            <InfoContainer
                                sx={{
                                    width: 281,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Info style={{ whiteSpace: 'pre' }}>
                                    {history[0]}
                                </Info>
                            </InfoContainer>
                        </LabelInfoWrapper>
                        {historyRenderer}
                    </InfoWrapper>
                </Box>
            </Container>
        </PageDiv>
    );
}

const PageDiv = styled('div')(({ theme }) => ({
    backgroundColor: 'rgba(244, 244, 244, 0.63);',
    width: '100vw',
    height: '100vh',
}));

const InfoGroup = styled('div')(({ theme }) => ({
    fontWeight: theme.fontWeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
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
    width: 420,
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
