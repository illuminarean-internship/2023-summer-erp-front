import { EditNote } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useLocationsData from '../../../../hooks/useLocationsData';
import moment from 'moment';
import BookForm from '../../../../components/form/BookForm';
import PageWrapper from '../../../../components/form/PageWrapper';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../../../../utils/stringUtils';

const BooksEdit = () => {
    const router = useRouter();
    const { id } = router.query;

    const locations = useLocationsData();

    const [bookInfo, setBookInfo] = useState({
        title: '',
        team: '',
        location: null,
        purchaseDate: '',
        purchasedFrom: 'G 마켓',
        price: '',
        currency: '₩',
        history: [
            {
                startDate: '',
                endDate: '',
                historyLocation: null,
                historyRemark: '',
                id: uuidv4(),
            },
        ],
    });

    useEffect(() => {
        axios
            .get(`http://43.200.193.130:4040/api/books/item/${id}`)
            .then((res) => {
                const bookData = res.data;
                const filteredData = filterRelevantData(bookData);
                setBookInfo(filteredData);
            });
    }, []);

    const filterRelevantData = (bookData) => {
        const {
            title,
            team,
            location,
            purchaseDate,
            purchasedFrom,
            price,
            currency,
            history,
        } = bookData;

        const updatedHistory = history.length
            ? history.map((historyEntry) => ({
                  ...historyEntry,
                  id: uuidv4(),
                  startDate: formatDate(historyEntry.startDate),
                  endDate: formatDate(historyEntry.endDate),
              }))
            : [
                  {
                      startDate: '',
                      endDate: '',
                      historyLocation: null,
                      historyRemark: '',
                      id: uuidv4(),
                  },
              ];

        return {
            title,
            team,
            location,
            purchaseDate: moment(purchaseDate).format('YYYY-MM-DD'),
            purchasedFrom,
            price,
            currency,
            history: updatedHistory,
        };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    // Update team value when location is selected
    const handleLocationChange = (event, newValue) => {
        if (newValue) {
            const selectedLocation = locations.find(
                (location) => location.name === newValue,
            );
            if (selectedLocation) {
                setBookInfo((prevInfo) => ({
                    ...prevInfo,
                    location: newValue,
                    team: selectedLocation.team,
                }));
            }
        } else {
            setBookInfo((prevInfo) => ({
                ...prevInfo,
                location: newValue,
                team: '', // If location is cleared, also clear the team
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://43.200.193.130:4040/api/books/item/${id}`,
                bookInfo,
            );
            console.log('Book updated successfully:', response.data);
            router.push(`/assets/books/info/${id}`); // Redirect to the book details page
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleHistoryChange = (id, field, value) => {
        setBookInfo((prevBookInfo) => {
            const updatedHistory = prevBookInfo.history.map((historyData) => {
                if (historyData.id === id) {
                    return { ...historyData, [field]: value };
                }
                return historyData;
            });
            return { ...prevBookInfo, history: updatedHistory };
        });
    };

    const handleDeleteHistory = (index) => {
        setBookInfo((prevBookInfo) => {
            const updatedHistory = prevBookInfo.history.filter(
                (_, i) => i !== index,
            );
            return { ...prevBookInfo, history: updatedHistory };
        });
    };

    const handleAddHistory = () => {
        setBookInfo((prevBookInfo) => ({
            ...prevBookInfo,
            history: [
                ...prevBookInfo.history,
                {
                    id: uuidv4(),
                    startDate: '',
                    endDate: '',
                    historyLocation: null,
                    historyRemark: '',
                },
            ],
        }));
    };

    const handleHistoryLocationChange = (id, newValue) => {
        setBookInfo((prevBookInfo) => {
            // Find the index of the history entry with the given id
            const historyIndex = prevBookInfo.history.findIndex(
                (historyData) => historyData.id === id,
            );

            // Create a copy of the history entry and update the historyLocation field
            const updatedHistoryEntry = {
                ...prevBookInfo.history[historyIndex],
                historyLocation: newValue,
            };

            // Create a copy of the history array and replace the updated history entry
            const updatedHistory = [...prevBookInfo.history];
            updatedHistory[historyIndex] = updatedHistoryEntry;

            // Update the bookInfo state with the updated history array
            return {
                ...prevBookInfo,
                history: updatedHistory,
            };
        });
    };

    return (
        <PageWrapper title="Edit" icon={<EditNote />} href="/assets/books">
            <Typography variant="h5" component="h5">
                {bookInfo.title}
            </Typography>
            <Divider sx={{ my: 2, borderColor: 'gray' }} />
            <BookForm
                handleSubmit={handleSubmit}
                bookInfo={bookInfo}
                handleChange={handleChange}
                locations={locations}
                handleLocationChange={handleLocationChange}
                handleHistoryChange={handleHistoryChange}
                handleDeleteHistory={handleDeleteHistory}
                handleAddHistory={handleAddHistory}
                handleHistoryLocationChange={handleHistoryLocationChange}
            />
        </PageWrapper>
    );
};

export default BooksEdit;

export async function getServerSideProps() {
    return {
        props: {},
    };
}
