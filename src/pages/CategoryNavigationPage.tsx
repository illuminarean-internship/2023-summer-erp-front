import React from 'react';
import CategoryButton from '../components/CategoryButton';
import styled from 'styled-components';
import AddCategoryButton from '../components/AddCategoryButton';

//const startingList = [] //import from DB
const sampleStartingList = [
    <CategoryButton name="Accessory" link="test" size={197} />,
    <CategoryButton name="Books" link="test" size={90} />,
    <CategoryButton name="Desktop PC" link="test" size={6} />,
    <CategoryButton name="Hardware" link="test" size={99} />,
    <CategoryButton name="Mockups" link="test" size={10} />,
    <CategoryButton name="Software" link="test" size={9} />,
];

export default function CategoryNavigationPage() {
    const [categoryButtonList, setCategoryButtonList] =
        React.useState(sampleStartingList); //create a hook whose array can be updated in react
    return (
        <>
            <h1>
                {categoryButtonList} + {categoryButtonList.length}
            </h1>
            <AddCategoryButton
                categoryButtonList={categoryButtonList}
                setCategoryButtonList={setCategoryButtonList}
            />
        </>
    );
}
