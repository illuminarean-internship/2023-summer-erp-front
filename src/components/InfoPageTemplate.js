import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function InfoPageTemplate({ id }) {
    return (
        <PageDiv>
            <InfoGroup>
                <InfoIcon />
                <InfoText>Info {id}</InfoText>
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

const InfoText = styled('div')(({ theme }) => ({
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

const ItemTitle = styled('text')(({ theme }) => ({
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
    fontHeight: 600,
    lineHeight: 'normal',
    letterSpacing: 0.2,
}));

const Title = styled('text')(({ theme }) => ({}));
