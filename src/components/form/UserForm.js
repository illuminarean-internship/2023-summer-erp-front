import { Delete } from '@mui/icons-material';
import {
    Autocomplete,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';

const UserForm = ({
    userInfo,
    teamList,
    projectList,
    handleChange,
    handleProjectChange,
    handleSubmit,
    handleAddProject,
    handleDeleteProject,
    handleTeamChange,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <Container maxWidth="sm">
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Name</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <TextField
                                name="name"
                                label="Enter name"
                                fullWidth
                                value={userInfo.name}
                                onChange={handleChange}
                                required
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Team</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <Autocomplete
                                id="team"
                                name="team"
                                fullWidth
                                value={userInfo.team}
                                onChange={handleTeamChange}
                                options={teamList}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select team"
                                        required
                                    />
                                )}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{ p: 2, pt: 3 }}
                        >
                            <Typography>Project</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            flexDirection="column" // Change the flex direction to column
                            sx={{ width: '100%' }}
                        >
                            {userInfo.projects.map((projectData, index) => (
                                <Box
                                    key={index} // Use a unique key for each project input field
                                    display="flex"
                                    alignItems="center"
                                    height="100%"
                                    sx={{ my: 1 }} // Add some margin between input fields
                                >
                                    <Autocomplete
                                        id={`project-${index}`}
                                        name={`project-${index}`}
                                        fullWidth
                                        value={projectData.project}
                                        onChange={(event, newValue) =>
                                            handleProjectChange(index, newValue)
                                        }
                                        options={projectList}
                                        getOptionLabel={(option) => option}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Select project"
                                                required
                                            />
                                        )}
                                    />
                                    <IconButton
                                        color="error"
                                        onClick={() =>
                                            handleDeleteProject(index)
                                        }
                                        sx={{ ml: 1 }}
                                        disabled={index === 0}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            ))}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={handleAddProject}
                            >
                                Add New Project
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Field</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <TextField
                                name="field"
                                label="Enter field"
                                fullWidth
                                value={userInfo.field}
                                onChange={handleChange}
                                required
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ p: 2 }}>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Typography>Remarks</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box
                            display="flex"
                            alignItems="center"
                            height="100%"
                            sx={{ width: '100%' }}
                        >
                            <TextField
                                name="remarks"
                                label="Enter remarks"
                                fullWidth
                                value={userInfo.remarks}
                                onChange={handleChange}
                                required
                                inputProps={{
                                    style: {
                                        height: '16px',
                                    },
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                <Box display="flex" justifyContent="center" mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </Container>
        </form>
    );
};

export default UserForm;
