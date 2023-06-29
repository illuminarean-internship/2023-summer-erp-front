import styled from 'styled-components';
import Button from '../components/Button';

export default function Main() {
    return (
        <StyledMainWrap>
            <h1>Title Test!</h1>
            <Button variant={'contained'} />
        </StyledMainWrap>
    );
}

const StyledMainWrap = styled.main`
    max-width: 128rem;
    padding: 5rem;
    margin: 0 auto;
    text-align: center;

    h1 {
        padding: 0 0 5rem;
        font-weight: 700;
        font-size: ${(props) => props.theme.fontSizes.size40};
    }
`;
