import {
    FormControl,
    MenuItem,
    Select,
    TextField,
    Checkbox,
    FormControlLabel,
    InputLabel,
    InputAdornment,
    Autocomplete,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';

export const FormGroup = () => {
    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="text-input">Text Input</InputLabel>
            <TextField id="text-input" variant="outlined" />
            <InputLabel htmlFor="select-input">Select Input</InputLabel>
            <Select
                labelId="select-input"
                id="select-input"
                label="Select Input"
                variant="outlined"
            >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
            </Select>
            <FormControlLabel control={<Checkbox />} label="Checkbox Input" />
        </FormControl>
    );
};

export const LabelsContainer = styled('div')(() => ({
    width: 302,
    display: 'flex',
    height: 457,
    justifyContent: 'right',
    flexDirection: 'column',
    flexShrink: 0,
}));

export const EditsFormControl = styled(FormControl)(() => ({
    width: 491,
    marginLeft: 49,
    display: 'flex',
    height: 457,
    justifyContent: 'left',
    flexShrink: 0,
}));

export const LabelsEditsContainer = styled('div')(() => ({
    marginTop: 52,
    height: 457,
    alignItems: 'flex-start',
    flexShrink: 0,
    display: 'flex',
}));

const Label = styled('text')(() => ({
    width: 302,
    height: 22,
    flexShrink: 0,
    color: '#000',
    textAlign: 'right',
    fontFamily: 'Source Sans Pro',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
}));

const Edit = styled('text')(() => ({
    width: 491,
    height: 22,
    flexShrink: 0,
    color: '#000',
    textAlign: 'left',
    fontFamily: 'Source Sans Pro',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
}));

export const TitleLabel = styled(Label)(() => ({ marginBottom: 22 }));
export const TeamLabel = styled(Label)(() => ({ marginBottom: 22 }));
export const LocationLabel = styled(Label)(() => ({ marginBottom: 22 }));
export const PurchaseDateLabel = styled(Label)(() => ({ marginBottom: 14 }));
export const PurchaseFromLabel = styled(Label)(() => ({ marginBottom: 26 }));
export const PriceLabel = styled(Label)(() => ({ marginBottom: 20 }));
export const HistoryLabel = styled(Label)(() => ({}));

//Determines what type of input is rendered based on type of data
const inputFieldData = {
    title: ['1.375rem', 'textField'],
    team: ['1.375rem', 'locationField'],
    location: ['1.375rem', 'locationField'],
    purchaseDate: ['0.875rem', 'dateField'],
    purchaseFrom: ['1.625rem', 'textField'],
    price: ['1.375rem', 'textField'],
    history: 0,
};

const EditTextField = styled(TextField)(() => ({
    display: 'flex',
    width: 382,
    height: 22,
    marginBottom: 25,
}));

const EditAutocompleteField = styled(Autocomplete)(() => ({
    display: 'flex',
    width: 382,
    height: 22,
}));

const EditDatePicker = styled(DatePicker)(() => ({
    display: 'flex',
    width: 200,
    height: 22,
    marginBottom: 25,
}));

const locationsList = ['Office', 'Resold', 'Disuse'];

//This is a general input field renderer for all types of components that will be used that can just be added in to [id].js
//Takes in a "startingValue" which is the value of the label currently, "type" which selects the type of field from the array,
// and adornment for the symbol.
export const InputFieldEdit = ({ startingValue, type, adornment = null }) => {
    const [textValue, setTextValue] = useState(startingValue);

    const handleChange = (event) => {
        setTextValue(event.target.value);
    };

    function renderInputField() {
        return inputFieldData[type][1] == 'textField' ? (
            <EditTextField
                sx={{
                    marginBottom: inputFieldData[type][0],
                    width: { sm: 200, md: 400 },
                    '& .MuiInputBase-root': {},
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {adornment}
                        </InputAdornment>
                    ),
                }}
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
                defaultValue={textValue}
                size="small"
            />
        ) : inputFieldData[type][1] == 'selectField' ? (
            <EditTextField
                sx={{
                    marginBottom: inputFieldData[type][0],
                    width: { sm: 200, md: 400 },
                    '& .MuiInputBase-root': {},
                }}
                select
                onChange={handleChange}
                id="outlined-basic"
                variant="outlined"
                defaultValue={textValue}
                size="small"
            >
                <option value={'team'}>team placeholder</option>
                <option value={'team2'}>team2 placeholder</option>
                <option value={'team3'}>team3 placeholder</option>
            </EditTextField>
        ) : inputFieldData[type][1] == 'locationField' ? (
            <EditAutocompleteField
                disablePortal
                id="combo-box-demo"
                size="small"
                options={locationsList}
                sx={{
                    marginBottom: inputFieldData[type][0],
                    width: { sm: 200, md: 400 },
                    '& .MuiInputBase-root': {},
                }}
                InputProps={{
                    fontSize: 1,
                    startAdornment: (
                        <InputAdornment position="start">
                            {adornment}
                        </InputAdornment>
                    ),
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        ) : inputFieldData[type][1] == 'dateField' ? (
            <>Date picker</>
        ) : (
            <>nothing</>
        );
    }

    return renderInputField();
};

const history = [
    //hardcoded for now
    '07 / 10 / 2019 - 10 / 28 / 2020      Jonghyun Lee ',
    '10 / 29 / 2020 -                             Office ',
];
const HistoryEditContainer = styled('div')(() => ({
    width: 491,
    marginLeft: 351,
    display: 'flex',
    height: 22,
    justifyContent: 'left',
    flexShrink: 0,
}));

export const historyRenderer = history.map(
    (v) =>
        v !== history[0] && (
            <HistoryEditContainer
                key={v}
                sx={{
                    width: 281,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Edit style={{ whiteSpace: 'pre' }}>{v}</Edit>
            </HistoryEditContainer>
        ),
);
