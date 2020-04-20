const { defaults, camelCase, snakeCase, isArray, map, toPairs, fromPairs, isObject, isDate, flow, toUpper, filter } = require('lodash/fp');

const processKeys = processor => input =>
  isArray(input)
    ? map(processKeys(processor))(input)
    : isObject(input) && !isDate(input)
      ? flow(
          toPairs,
          map(([key, val]) => [processor(key), processKeys(processor)(val)]),
          fromPairs,
        )(input)
      : input;

exports.serializeValues = payload =>
  flow(
    toPairs,
    map(([key, val]) => [
      key,
      isDate(val)
        ? new Date(val).getTime()
        : isDate(val) ? val
        : isObject(val)
          ? JSON.stringify(val)
          : val
    ]),
    fromPairs,
  )(payload);

exports.postProcessResponse = processKeys(camelCase);
exports.wrapIdentifier = (value, origImpl) =>
  value === '*' ? value : origImpl(snakeCase(value));

exports.ifCond = (obj) =>
  flow(
    defaults({isReviewed: true}),
    toPairs,
    filter(([key, val]) => !!val),
    fromPairs
  )(obj);
