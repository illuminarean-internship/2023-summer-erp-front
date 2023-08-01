import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { OpenInBrowserOutlined } from '@mui/icons-material';

export default function CategoryItem({ item }) {
    return (
        <ButtonStyle>
            <ButtonStyleTop>
                <ButtonStyleTextWrapper>
                    <Typography variant="h4">{item.size}</Typography>
                    <Typography variant="h5">{item.name}</Typography>
                </ButtonStyleTextWrapper>
            </ButtonStyleTop>
            <ButtonStyleBottom>
                <Link href={`/assets/${item.link}`}>
                    <Button
                        variant="text"
                        color="inherit"
                        endIcon={<OpenInBrowserOutlined />}
                    >
                        View All
                    </Button>
                </Link>
            </ButtonStyleBottom>
        </ButtonStyle>
    );
}

const ButtonStyle = styled.div`
    width: 17.063rem;
    height: 12.063rem;
    flex-shrink: 0;
    margin-right: 4.125rem;
    margin-top: 2.375rem;
    margin-bottom: 3.063rem;
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
const ButtonStyleTextWrapper = styled.div`
    display: flex;
    padding: 0rem 2.188rem;
    justify-content: center;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;
    flex-direction: column;
`;
