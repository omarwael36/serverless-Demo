const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  DeleteCommand,
  ScanCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "Orders";

const createOrder = async (order) => {
  const params = {
    TableName: tableName,
    Item: order,
  };

  try {
    await dynamo.send(new PutCommand(params));
    console.log('Order created:', order.orderId);
    return { success: true };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

const getOrder = async (orderId) => {
  const params = {
    TableName: tableName,
    Key: { orderId },
  };

  try {
    const result = await dynamo.send(new GetCommand(params));
    return result.Item || null;
  } catch (error) {
    console.error('Error reading order:', error);
    throw error;
  }
};

const updateOrder = async (order) => {
  const params = {
    TableName: tableName,
    Key: { orderId: order.orderId },
    UpdateExpression: 'set productName = :pn, quantity = :q',
    ExpressionAttributeValues: {
      ':pn': order.productName,
      ':q': order.quantity,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    const result = await dynamo.send(new UpdateCommand(params));
    return result.Attributes || null;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};


const deleteOrder = async (orderId) => {
  const params = {
    TableName: tableName,
    Key: { orderId },
  };

  try {
    await dynamo.send(new DeleteCommand(params));
    console.log('Order deleted:', orderId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

const getAllOrders = async () => {
  const params = {
    TableName: tableName,
  };

  try {
    const result = await dynamo.send(new ScanCommand(params));
    return result.Items || [];
  } catch (error) {
    console.error('Error retrieving all orders:', error);
    throw error;
  }
};

module.exports = { createOrder, getOrder, updateOrder, deleteOrder, getAllOrders };