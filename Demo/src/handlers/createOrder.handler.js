const { createOrder } = require('../controllers/orderController');

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const result = await createOrder(body);
    return {
      statusCode: 201,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create order', error: error.message }),
    };
  }
};
