import unittest
from app import app

class TestStockAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_stock_data(self):
        response = self.app.get('/api/stocks/NVDA')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('symbol', data)
        self.assertIn('prices', data)

    def test_get_multiple_stocks(self):
        response = self.app.get('/api/stocks/multiple')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('NVDA', data)
        self.assertIn('TSLA', data)

if __name__ == '__main__':
    unittest.main()
