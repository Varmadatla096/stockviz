from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# List of stocks and ETFs to track
STOCKS = ['NVDA', 'TSLA', 'INTC']
ETFS = ['SOXL', 'TSLL', 'SPXS']

def get_stock_data(symbol, start_date, end_date):
    stock = yf.Ticker(symbol)
    hist = stock.history(start=start_date, end=end_date)
    return {
        'current_price': hist['Close'][-1],
        'historical_data': hist['Close'].tolist(),
        'dates': hist.index.strftime('%Y-%m-%d').tolist(),
        'volume': hist['Volume'].tolist(),
        'high': hist['High'].tolist(),
        'low': hist['Low'].tolist()
    }

@app.route('/api/stocks', methods=['GET'])
def get_all_stocks():
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=365)
        
        stock_data = {}
        for symbol in STOCKS:
            stock_data[symbol] = get_stock_data(symbol, start_date, end_date)
        
        return jsonify(stock_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stocks/<symbol>', methods=['GET'])
def get_single_stock(symbol):
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=365)
        
        if symbol not in STOCKS:
            return jsonify({'error': 'Stock not found'}), 404
        
        return jsonify(get_stock_data(symbol, start_date, end_date))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/etfs', methods=['GET'])
def get_all_etfs():
    try:
        end_date = datetime.now()
        start_date = end_date - timedelta(days=365)
        
        etf_data = {}
        for symbol in ETFS:
            etf_data[symbol] = get_stock_data(symbol, start_date, end_date)
        
        return jsonify(etf_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)