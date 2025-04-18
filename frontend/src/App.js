import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import StockChart from './components/StockChart';
import StockComparison from './components/StockComparison';
import axios from 'axios';
import './chartConfig';

function App() {
  const [stocks, setStocks] = useState({});
  const [etfs, setEtfs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stocksResponse, etfsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/stocks'),
          axios.get('http://localhost:5000/api/etfs')
        ]);
        setStocks(stocksResponse.data);
        setEtfs(etfsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Set up real-time updates every 5 minutes
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Stock Market Visualization
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StockComparison stocks={stocks} />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom>
              Stocks
            </Typography>
          </Grid>
          
          {Object.entries(stocks).map(([symbol, data]) => (
            <Grid item xs={12} md={6} lg={4} key={symbol}>
              <StockChart symbol={symbol} data={data} />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography variant="h4" component="h2" gutterBottom style={{ marginTop: '2rem' }}>
              ETFs
            </Typography>
          </Grid>

          {Object.entries(etfs).map(([symbol, data]) => (
            <Grid item xs={12} md={6} lg={4} key={symbol}>
              <StockChart symbol={symbol} data={data} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;