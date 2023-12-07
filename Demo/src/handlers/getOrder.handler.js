const { getOrder } = require('../controllers/orderController');

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const result = await getOrder(id);
    if (!result) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Order not found' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to get order', error: error.message }),
    };
  }
};
