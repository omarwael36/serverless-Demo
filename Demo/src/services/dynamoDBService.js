// const AWS = require('aws-sdk');

// AWS.config.update({ region: 'us-east-1' });
// const dynamoDB = new AWS.DynamoDB();

// const ORDERS_TABLE_NAME = 'Orders';

// async function createOrdersTable() {
//   const params = {
//     TableName: ORDERS_TABLE_NAME,
//     KeySchema: [
//       { AttributeName: 'orderId', KeyType: 'HASH' },
//     ],
//     AttributeDefinitions: [
//       { AttributeName: 'orderId', AttributeType: 'S' },
//     ],
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 5,
//       WriteCapacityUnits: 5,
//     },
//   };

//   try {
//     await dynamoDB.createTable(params).promise();
//     console.log('Table created:', ORDERS_TABLE_NAME);
//   } catch (error) {
//     console.error('Error creating table:', error);
//   }
// }

// module.exports = { createOrdersTable };
