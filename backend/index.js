const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.TODO_TABLE;

exports.handler = async (event) => {
  const { httpMethod, path, body, queryStringParameters } = event;

  if (httpMethod === 'GET' && path === '/todos') {
    return await getTodos();
  }

  if (httpMethod === 'POST' && path === '/todos') {
    const { title, completed } = JSON.parse(body);
    return await createTodo({ title, completed });
  }

  if (httpMethod === 'PUT' && path === '/todos/{id}') {
    const todoId = path.split('/')[2];
    const { title, completed } = JSON.parse(body);
    return await updateTodo({ todoId, title, completed });
  }

  if (httpMethod === 'DELETE' && path === '/todos/{id}') {
    const todoId = path.split('/')[2];
    return await deleteTodo({ todoId });
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Resource not found' }),
  };
};

async function getTodos() {
  const params = {
    TableName: TABLE_NAME,
  };

  try {
    const result = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not fetch to-dos' }),
    };
  }
}

async function createTodo({ title, completed }) {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: AWS.util.uuid.v4(),
      title,
      completed,
    },
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Todo created successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not create todo' }),
    };
  }
}

async function updateTodo({ todoId, title, completed }) {
  const params = {
    TableName: TABLE_NAME,
    Key: { id: todoId },
    UpdateExpression: 'set title = :t, completed = :c',
    ExpressionAttributeValues: {
      ':t': title,
      ':c': completed,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  try {
    await dynamoDB.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Todo updated successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not update todo' }),
    };
  }
}

async function deleteTodo({ todoId }) {
  const params = {
    TableName: TABLE_NAME,
    Key: { id: todoId },
  };

  try {
    await dynamoDB.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Todo deleted successfully' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not delete todo' }),
    };
  }
}
