import play from './play.js';

exports.handler = async (event, context) => {
  const elementParam = event.path.split('/').pop;
  const playBall = play(elementParam, 0)
  return {
    statusCode: 200,
    body: JSON.stringify(playball)
  };
};
