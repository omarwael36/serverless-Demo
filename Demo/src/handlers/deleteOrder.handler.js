const { deleteOrder } = require('../controllers/orderController');

module.exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const result = await deleteOrder(id);
    if (!result.success) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Order not found' }),
      };
    }
    return {
      statusCode: 204,
      body: JSON.stringify({ message: 'Order deleted successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to delete order', error: error.message }),
    };
  }
};
