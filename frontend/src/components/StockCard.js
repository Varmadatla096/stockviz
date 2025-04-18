import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const StockCard = ({ symbol, data }) => {
    return (
        <Card sx={{ minWidth: 275, margin: 2 }}>
            <CardContent>
                <Typography variant='h5' component='div'>
                    {symbol}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography color='text.secondary'>
                            Current Price
                        </Typography>
                        <Typography variant='body2'>
                            ${data.currentPrice?.toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='text.secondary'>
                            Market Cap
                        </Typography>
                        <Typography variant='body2'>
                            ${(data.marketCap / 1000000000).toFixed(2)}B
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default StockCard;