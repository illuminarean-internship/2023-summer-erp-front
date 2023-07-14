import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import { redirect } from 'next/navigation';

interface CategoryButtonProps {
    name: string;
    link: string;
    size: number;
}

export default function CategoryButton({
    name,
    link,
    size,
}: CategoryButtonProps) {
    return (
        <Button
            variant="contained"
            onClick={() => {
                alert(link); //need to redirect to the link
            }}
        >
            {name}
            {size}
        </Button>
    );
}
