import { useState } from 'react';
import generateImage from './lib/openai';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Dialog,
} from '@mui/material';
import { Image } from '@mui/icons-material';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    setLoading(true);
    const response = await generateImage(prompt);
    if (response && response.data.length > 0) {
      setImageUrl(response.data[0].url);
    }
    setLoading(false);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Typography component="h1" variant="h4" gutterBottom>
            Image Generator
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter your prompt"
                variant="outlined"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleGenerateImage}
                startIcon={<Image />}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Image'}
              </Button>
            </Grid>
          </Grid>
          {imageUrl && (
            <>
              <Typography component="h2" variant="h6" gutterBottom>
                Generated Image:
              </Typography>
              <img
                src={imageUrl}
                alt="Generated"
                style={{
                  maxWidth: '100%',
                  border: '2px solid #3f51b5',
                  borderRadius: '8px',
                }}
              />
            </>
          )}
        </Box>
      </Container>
      <Dialog open={loading}>
        <Box sx={{ padding: 2 }}>
          <CircularProgress />
        </Box>
      </Dialog>
    </>
  );
}

export default App;
