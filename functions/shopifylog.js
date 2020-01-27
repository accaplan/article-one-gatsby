exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 400,
      body: ''
    };
  }

  let data;

  try {
    data = JSON.parse(event.body);
    console.log(`This is the data`, data)
  } catch (error) {
    console.log('JSON parsing error:', error);

    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Bad request body'
      })
    };
  }
};