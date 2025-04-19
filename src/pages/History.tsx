import { Typography, Paper, Box } from '@mui/material';

const History = () => {
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Invoice History
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Invoice history will be displayed here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default History; 