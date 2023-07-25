import React from 'react';
import CategoryItem from '../components/CategoryItem';
import styled from 'styled-components';

//const startingList = [] //import from DB
const sampleStartingList = [
    { name: 'Accessory', link: 'accessory', size: 197 },
    { name: 'Books', link: 'books', size: 90 },
    { name: 'Desktop PC', link: 'desktopPc', size: 6 },
    { name: 'Laptops', link: 'laptop', size: 99 },
    { name: 'Software', link: 'software', size: 9 },
    { name: 'Test Device', link: 'testDevice', size: 10 },
];

const username = 'testName';

export default function OverviewPage() {
    const [categoryButtonList, setCategoryButtonList] =
        React.useState(sampleStartingList); //create a hook whose array can be updated in react
    const categories = categoryButtonList.map((item) => (
        <CategoryItem
            key={item.name}
            name={item.name}
            link={item.link}
            size={item.size}
        />
    ));

    return (
        <div>
            <WelcomeContainer>
                <WelcomeText>Welcome "{username}"</WelcomeText>
                <WelcomeTextLine />
            </WelcomeContainer>
            <OverviewText>Overview</OverviewText>
            <OverviewBox>
                <div>{categories}</div>;
            </OverviewBox>
        </div>
    );
}

const OverviewBox = styled.div`
    width: 74.94rem;
    height: 32.813rem;
    flex-shrink: 0;
    border: 1px solid #616161;
    background: rgba(217, 217, 217, 0);
    text-align: center;
`;

const OverviewText = styled.text`
    display: block;
    width: 6.625rem;
    height: 3.25rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: 1.375rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: 0.01375rem;
`;

const WelcomeText = styled.text`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-family: Source Sans Pro;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.25px;
`;

const WelcomeTextLine = styled.line`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 206.039px;
    height: 15px;
    background: rgba(96, 95, 95, 0.09);
`;

const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
