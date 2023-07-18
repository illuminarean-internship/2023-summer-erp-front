import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { redirect } from 'next/navigation';
import styled from 'styled-components';


export default function CategoryButton({
    name,
    link,
    size,
}) {
    return (
        <ButtonStyle
            onClick={() => {
                alert(link); //need to redirect to the link
            }}
        >
            <ButtonStyleTop>
                <ButtonStyleTextWrapper>
                    <ButtonStyleTextSize>{size}</ButtonStyleTextSize>
                    <ButtonStyleTextName>{name}</ButtonStyleTextName>
                </ButtonStyleTextWrapper>
            </ButtonStyleTop>
            <ButtonStyleBottom>
                <ButtonLinkStyleText>
                    View All
                    <img src="public/images/public/images/arrow.png" />
                </ButtonLinkStyleText>
            </ButtonStyleBottom>
        </ButtonStyle>
    );
}
const ButtonStyle = styled.button`
    width: 273px;
    height: 193px;
    flex-shrink: 0;
    margin: 66px;
`;

const ButtonLinkStyleText = styled('div')`
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
    font-family: Source Sans Pro;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.9px;
    display: flex;
    width: 82.396px;
    height: 48.532px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
`;
const ButtonStyleBottom = styled('div')`
    display: flex;
    width: 273px;
    height: 46.275px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 0px 0px 30px 30px;
    border-right: 5px solid rgba(205, 205, 205, 0.45);
    border-bottom: 5px solid rgba(205, 205, 205, 0.45);
    border-left: 5px solid rgba(205, 205, 205, 0.45);
    background: rgba(43, 98, 177, 0.21);
`;
const ButtonStyleTop = styled('div')`
    display: flex;
    width: 273px;
    height: 146.725px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 30px 30px 0px 0px;
    border: 5px solid rgba(205, 205, 205, 0.45);
    background: rgba(206, 221, 248, 0.2);
`;
const ButtonStyleTextWrapper = styled('div')`
    display: flex;
    padding: 0px 35px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`;
const ButtonStyleTextName = styled('div')`
    color: rgba(27, 27, 27, 0.62);
    font-family: Source Sans Pro;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
    letter-spacing: 0.4px;
`;

const ButtonStyleTextSize = styled('div')`
    color: rgba(27, 27, 27, 0.62);
    font-family: Source Sans Pro;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px; /* 100% */
    letter-spacing: 0.4px;
`;

/*
const ButtonStyle = styled.button(({ theme }) => ({
    background: 'transparent',
  borderRadius: '3px';
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
  border-radius: 25px;
}));

*/
