import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
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
  Box,
  Tabs,
  Tab
} from '@mui/material';

const StockChart = ({ symbol, data }) => {
  const [timeRange, setTimeRange] = useState('1y');
  const [chartType, setChartType] = useState('line');
  const [chartData, setChartData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    if (data) {
      // Line chart data
      const lineChartData = {
        labels: data.dates,
        datasets: [
          {
            label: symbol,
            data: data.historical_data,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      };

      // Calculate performance metrics
      const initialPrice = data.historical_data[0];
      const currentPrice = data.current_price;
      const performance = ((currentPrice - initialPrice) / initialPrice) * 100;

      // Pie chart data for performance
      const pieChartData = {
        labels: ['Gain/Loss', 'Initial Value'],
        datasets: [
          {
            data: [Math.abs(performance), 100 - Math.abs(performance)],
            backgroundColor: [
              performance >= 0 ? '#4CAF50' : '#F44336',
              '#E0E0E0'
            ],
          }
        ]
      };

      setChartData({
        line: lineChartData,
        pie: pieChartData
      });
      setPerformanceData({
        percentage: performance.toFixed(2),
        isPositive: performance >= 0
      });
    }
  }, [data, symbol]);

  const lineChartOptions = {
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
        text: `${symbol} Stock Price`
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${symbol}: $${context.parsed.y.toFixed(2)}`;
          }
        }
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

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance'
      }
    }
  };

  const renderChart = () => {
    if (!chartData) return null;

    return (
      <Box sx={{ height: 300, position: 'relative' }}>
        {chartType === 'line' && (
          <Line
            data={chartData.line}
            options={lineChartOptions}
            key={`line-${symbol}`}
          />
        )}
        {chartType === 'pie' && (
          <Pie
            data={chartData.pie}
            options={pieChartOptions}
            key={`pie-${symbol}`}
          />
        )}
      </Box>
    );
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {symbol}
              </Typography>
              <Typography 
                variant="h6" 
                color={performanceData?.isPositive ? 'success.main' : 'error.main'}
              >
                ${data?.current_price?.toFixed(2)} ({performanceData?.percentage}%)
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Tabs 
              value={chartType} 
              onChange={(e, newValue) => setChartType(newValue)}
              centered
            >
              <Tab value="line" label="Price History" />
              <Tab value="pie" label="Performance" />
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              {renderChart()}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="1m">1 Month</MenuItem>
                <MenuItem value="3m">3 Months</MenuItem>
                <MenuItem value="6m">6 Months</MenuItem>
                <MenuItem value="1y">1 Year</MenuItem>
                <MenuItem value="5y">5 Years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StockChart;