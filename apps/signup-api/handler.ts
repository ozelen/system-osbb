import { APIGatewayProxyHandler } from 'aws-lambda';
// import 'source-map-support/register';

import { client } from '@osbb/lib-db';

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(client.from('users'))
  };
}
