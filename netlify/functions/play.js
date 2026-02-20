import {play} from './play/game.js';

exports.handler = async (event, context) => {
  const elementParam = event.queryStringParameters?.element;
  const playBall = play(elementParam, 0)
  return {
    statusCode: 200,
    body: JSON.stringify(playball)
  };
};
