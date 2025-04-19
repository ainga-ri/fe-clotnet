import { Box, Container, Button, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink, Outlet } from 'react-router-dom';

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: isMobile ? 1.5 : 2,
          mb: 2,
          width: '100%'
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3 },
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            component="h1"
            sx={{ textAlign: { xs: 'center', sm: 'left' } }}
          >
            Invoice Management
          </Typography>
        </Container>
      </Box>

      {/* Navigation */}
      <Box
        component="nav"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          mb: 4,
          width: '100%'
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3 },
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 2, 
              py: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'stretch', sm: 'center' }
            }}
          >
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              color="primary"
              fullWidth={isMobile}
            >
              Create Invoice
            </Button>
            <Button
              component={RouterLink}
              to="/history"
              variant="outlined"
              color="primary"
              fullWidth={isMobile}
            >
              History
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flex: 1,
          width: '100%',
          maxWidth: '100vw',
          overflow: 'hidden'
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3 },
            maxWidth: '1200px',
            mx: 'auto',
            width: '100%'
          }}
        >
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
          mt: 'auto',
          width: '100%'
        }}
      >
        <Container 
          maxWidth={false} 
          sx={{ 
            px: { xs: 2, sm: 3 },
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            © {new Date().getFullYear()} Invoice Management System
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 