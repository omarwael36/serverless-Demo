const { getAllOrders } = require('../controllers/orderController');

module.exports.handler = async () => {
  try {
    const result = await getAllOrders();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
       statusCode: 500,
      body: JSON.stringify({ message: 'Failed to get all orders', error: error.message }),
    };
  }
};

