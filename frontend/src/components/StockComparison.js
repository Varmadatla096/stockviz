import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Box
} from '@mui/material';

const StockComparison = ({ stocks }) => {
  const [selectedStocks, setSelectedStocks] = useState(['NVDA', 'TSLA']);

  const chartData = {
    labels: stocks[selectedStocks[0]]?.dates || [],
    datasets: selectedStocks.map((symbol, index) => ({
      label: symbol,
      data: stocks[symbol]?.historical_data || [],
      borderColor: `hsl(${index * 120}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 120}, 70%, 50%, 0.1)`,
      fill: true,
      tension: 0.4
    }))
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Comparison'
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Compare Stocks
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Stock 1</InputLabel>
              <Select
                value={selectedStocks[0]}
                label="Stock 1"
                onChange={(e) => setSelectedStocks([e.target.value, selectedStocks[1]])}
              >
                {Object.keys(stocks).map((symbol) => (
                  <MenuItem key={symbol} value={symbol}>{symbol}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Stock 2</InputLabel>
              <Select
                value={selectedStocks[1]}
                label="Stock 2"
                onChange={(e) => setSelectedStocks([selectedStocks[0], e.target.value])}
              >
                {Object.keys(stocks).map((symbol) => (
                  <MenuItem key={symbol} value={symbol}>{symbol}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ height: 400, position: 'relative' }}>
                <Line data={chartData} options={options} key={`comparison-${selectedStocks.join('-')}`} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StockComparison;