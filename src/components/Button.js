import Button from '@mui/material/Button';

export default function CommonButton({ variant }) {
    return (
        <Button
            variant={variant}
            onClick={() => {
                alert('clicked');
            }}
        >
            You can make the button like this !
        </Button>
    );
}
