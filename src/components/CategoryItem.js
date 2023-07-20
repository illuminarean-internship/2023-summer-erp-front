import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import * as React from 'react';
import { redirect } from 'next/navigation';
import styled from 'styled-components';
import arrow from 'public/images/arrow.png';
import Link from 'next/link';

export default function CategoryItem({ name, link, size }) {
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
                <ButtonLinkStyleTextWrapper>
                    <ButtonLinkStyleText>View All</ButtonLinkStyleText>
                    <ArrowStyle>
                        <img src={'/images/arrow.png'} alt="arrow.png" />
                    </ArrowStyle>
                </ButtonLinkStyleTextWrapper>
            </ButtonStyleBottom>
        </ButtonStyle>
    );
}

const ArrowStyle = styled.a`
    display: flex;
    width: 0.891rem;
    height: 0.898rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
`;

const ButtonStyle = styled.button`
    width: 17.063rem;
    height: 12.063rem;
    flex-shrink: 0;
    margin-right: 4.125rem;
    margin-top: 2.375rem;
    margin-bottom: 3.063rem;
`;

const ButtonLinkStyleTextWrapper = styled.textPath`
    display: flex;
    height: 1.25rem;
    padding: 0rem 3.125rem;
    justify-content: center;
    align-items: flex-start;
    gap: 0.625rem;
    flex-shrink: 0;
    align-self: stretch;
`;

const ButtonLinkStyleText = styled.text`
    color: #ffffff;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.056rem;
    display: flex;
    width: 5.15rem;
    height: 3.033rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 0.313rem;
`;
const ButtonStyleBottom = styled.div`
    display: flex;
    width: 17.063rem;
    height: 2.892rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
    border-radius: 0rem 0rem 1.875rem 1.875rem;
    border-right: 0.313rem solid rgba(205, 205, 205, 0.45);
    border-bottom: 0.313rem solid rgba(205, 205, 205, 0.45);
    border-left: 0.313rem solid rgba(205, 205, 205, 0.45);
    background: rgba(43, 98, 177, 0.21);
`;
const ButtonStyleTop = styled.div`
    display: flex;
    width: 17.063rem;
    height: 9.17rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
    border-radius: 1.875rem 1.875rem 0rem 0rem;
    border: 0.313rem solid rgba(205, 205, 205, 0.45);
    background: rgba(206, 221, 248, 0.2);
`;
const ButtonStyleTextWrapper = styled.textarea`
    display: flex;
    padding: 0rem 2.188rem;
    justify-content: center;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;
`;
const ButtonStyleTextName = styled.text`
    color: #1b1b1b;
    font-family: Source Sans Pro;
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.5rem;
    letter-spacing: 0.025rem;
`;

const ButtonStyleTextSize = styled.text`
    color: #1b1b1b;
    font-family: Source Sans Pro;
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.5rem; /* 100% */
    letter-spacing: 0.025rem;
`;

/*
const ButtonStyle = styled.button(({ theme }) => ({
    background: 'transparent',
  borderRadius: '3rem';
  border: 2rem solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
  border-radius: 25rem;
}));

*/
