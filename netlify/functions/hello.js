

exports.handler = async (event, context) => {

  return {
    statusCode: 200,
    body: JSON.stringify({message: 'hello from sk8 studio'})
  };
};
