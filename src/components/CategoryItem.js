import * as React from 'react';
import { redirect } from 'next/navigation';
import { styled } from '@mui/material/styles';
import arrow from 'public/images/arrow.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CategoryItem({ name, link, size }) {
    const router = useRouter();
    const handleClick = () => {
        router.push(
            router.push({
                pathname: '/assets/' + link,
            }),
        );
    };

    return (
        <ButtonStyle onClick={handleClick}>
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

const ArrowStyle = styled('div')(({}) => ({
    display: 'flex',
    width: '0.891rem',
    height: '0.898rem',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: '0',
}));

const ButtonStyle = styled('div')(({}) => ({
    width: '17.063rem',
    height: '12.063rem',
    flexShrink: '0',
    marginRight: '4.125rem',
    marginTop: '2.375rem',
    marginBottom: '3.063rem',
}));

const ButtonLinkStyleTextWrapper = styled('div')(({}) => ({
    display: 'flex',
    height: '1.25rem',
    padding: '0rem 3.125rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexShrink: '0',
    alignSelf: 'stretch',
}));

const ButtonLinkStyleText = styled('div')(({}) => ({
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
    fontSize: '1.125rem',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
    letterSpacing: '0.056rem',
    display: 'flex',
    width: '5.15rem',
    height: '3.033rem',
    flexDirection: 'row',
    justifyContent: 'center',
    flexShrink: '0',
}));

const ButtonStyleBottom = styled('div')(({}) => ({
    display: 'flex',
    width: '17.063rem',
    height: '2.892rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.625rem',
    flexShrink: '0',
    borderRadius: '0rem 0rem 1.875rem 1.875rem',
    borderRight: '0.313rem solid rgba(205, 205, 205, 0.45)',
    borderBottom: '0.313rem solid rgba(205, 205, 205, 0.45)',
    borderLeft: '0.313rem solid rgba(205, 205, 205, 0.45)',
    background: 'rgba(43, 98, 177, 0.21)',
}));

const ButtonStyleTop = styled('div')(({}) => ({
    display: 'flex',
    width: '17.063rem',
    height: '9.17rem',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.625rem',
    flexShrink: '0',
    borderRadius: '1.875rem 1.875rem 0rem 0rem',
    border: '0.313rem solid rgba(205, 205, 205, 0.45)',
    background: 'rgba(206, 221, 248, 0.2)',
}));

const ButtonStyleTextWrapper = styled('div')(({}) => ({
    display: 'flex',
    padding: '0rem 2.188rem',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '0.625rem',
    alignSelf: 'stretch',
    flexDirection: 'column',
}));

const ButtonStyleTextName = styled('text')(({}) => ({
    color: '#1b1b1b',
    fontFamily: 'Source Sans Pro',
    fontSize: '1.875rem',
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: '2.5rem',
    letterSpacing: '0.025rem',
}));

const ButtonStyleTextSize = styled('text')(({}) => ({
    color: '#1b1b1b',
    fontFamily: 'Source Sans Pro',
    fontSize: '2.5rem',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '2.5rem',
    letterSpacing: '0.025rem',
}));
