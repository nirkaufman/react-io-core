export const isString = anyType => typeof anyType === 'string';

export const isNumber = anyType => typeof anyType === 'number';

export const isFunction = anyType => typeof anyType === 'function';

export const isEvent = anyName => anyName.startsWith("on");