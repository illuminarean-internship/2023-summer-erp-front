// import { useRouter } from 'next/router';
// import React from 'react';
// import { Box, Container, Divider } from '@mui/material';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import { styled } from '@mui/material/styles';
// import { useState, useEffect } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import axios from 'axios';
// import * as EPC from '/Users/joshuakim/Desktop/Illuminarean/infoAndEditPages/2023-summer-erp-front/src/components/EditPageComponents.js';

// const BooksEdit = () => {
//     const router = useRouter();
//     const { id } = router.query;
//     const [retreivedInfoState, setRetreivedInfoState] = useState(null);

//     useEffect(() => {
//         axios
//             .get(`http://43.200.193.130:4040/api/books/item/${id}`)
//             .then((res) => {
//                 setRetreivedInfoState(res.data);
//             });
//     }, []);

//     if (!retreivedInfoState) {
//         return null;
//     }

//     const sampleData = {
//         _id: 'first',
//         type: 'book',
//         title: 'UI/UX 디자인 이론과 실습',
//         team: 'Design Team',
//         location: 'Office',
//         purchaseDate: '07 / 10 / 2019',
//         price: '₩27,000',
//     };
//     //dictionary containing height of respective fields
//     const inputFieldData = {
//         title: '1.375rem',
//         team: '1.375rem',
//         location: '7.438rem',
//         purchaseDate: '0.875rem',
//         purchaseFrom: '1.625rem',
//         price: '1.375rem',
//         history: 0,
//     };

//     return (
//         <PageDiv>
//             <EditGroup>
//                 <EditIcon />
//                 <EditIconText>Edit</EditIconText>
//             </EditGroup>
//             <Container fixed>
//                 <Box
//                     sx={{
//                         width: 842,
//                         height: 547,
//                         flexShrink: 0,
//                         bgcolor: '#FFF',
//                         strokWidth: 1,
//                         stroke: '#DBDBDB',
//                         borderRadius: 3,
//                         border: '1px solid #B9B9B9',
//                     }}
//                 >
//                     <ItemTitle>{retreivedInfoState['title']}</ItemTitle>
//                     <TitleDivider />
//                     <EPC.LabelsEditsContainer>
//                         <EPC.LabelsContainer>
//                             <EPC.TitleLabel>Title</EPC.TitleLabel>
//                             <EPC.TeamLabel>Team</EPC.TeamLabel>
//                             <EPC.LocationLabel>Location</EPC.LocationLabel>
//                             <EPC.PurchaseDateLabel>
//                                 Purchase Date
//                             </EPC.PurchaseDateLabel>
//                             <EPC.PurchaseFromLabel>
//                                 Purchased From
//                             </EPC.PurchaseFromLabel>
//                             <EPC.PriceLabel>Price</EPC.PriceLabel>
//                         </EPC.LabelsContainer>
//                         <EPC.EditsFormControl>
//                             <EPC.InputFieldEdit
//                                 startingValue={retreivedInfoState['title']}
//                                 type={'title'}
//                             />
//                             <EPC.InputFieldEdit
//                                 startingValue="teamPlaceholder"
//                                 type={'team'}
//                                 adornment={SearchIcon}
//                             />
//                             <EPC.InputFieldEdit
//                                 startingValue="locationPlaceholder"
//                                 type={'location'}
//                                 adornment={SearchIcon}
//                             />
//                             <EPC.InputFieldEdit
//                                 startingValue={retreivedInfoState['purchaseDate']}
//                                 type={'purchaseDate'}
//                             />
//                         </EPC.EditsFormControl>
//                     </EPC.LabelsEditsContainer>

//                     <EditWrapper>{EPC.historyRenderer}</EditWrapper>
//                 </Box>
//             </Container>
//         </PageDiv>
//     );
// };

// const PageDiv = styled('div')(({ theme }) => ({
//     backgroundColor: 'rgba(244, 244, 244, 0.63);',
//     width: '100vw',
//     height: '100vh',
// }));

// const EditGroup = styled('div')(({ theme }) => ({
//     fontWeight: theme.fontWeight,
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'start',
// }));

// const EditIcon = styled(EditNoteIcon)(({ theme }) => ({
//     display: 'flex',
//     width: 24,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 5,
// }));

// const EditIconText = styled('div')(({ theme }) => ({
//     display: 'flex',
//     width: 106,
//     height: 52,
//     flexDirection: 'column',
//     color: theme.color,
//     fontFamily: 'Source Sans Pro',
//     fontSize: 22,
//     fontStyle: 'normal',
//     fontWeight: 600,
//     lineHeight: 'normal',
//     letterSpacing: 0.22,
// }));

// const ItemTitle = styled('text')(() => ({
//     display: 'flex',
//     width: 420,
//     height: 44,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     flexShrink: 0,
//     color: '#000',
//     fontFamily: 'Source Sans Pro',
//     fontSize: 20,
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     fontHeight: 600,
//     lineHeight: 'normal',
//     letterSpacing: 0.2,
//     marginLeft: 30,
//     marginTop: 10,
//     marginBottom: 10,
// }));

// const TitleDivider = styled(Divider)(() => ({
//     width: 842,
//     height: 1,
//     background: '#DBDBDB',
// }));

// const EditWrapper = styled('div')(() => ({
//     width: 842,
//     height: 417,
//     marginTop: 70,
// }));

// const Edit = styled('text')(() => ({
//     width: 491,
//     height: 22,
//     flexShrink: 0,
//     color: '#000',
//     textAlign: 'left',
//     fontFamily: 'Source Sans Pro',
//     fontSize: 15,
//     fontStyle: 'normal',
//     fontWeight: 400,
//     lineHeight: 'normal',
// }));

// export default BooksEdit;
