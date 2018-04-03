// @flow

/**
 * Creates an object from the keys passed in. Each key's value will be defaultValue.
 * If nothing is passed as defaultValue, then all the values will be set to false
 * 
 * @param {Array<string>} keys 
 * @param {*} defaultValue 
 */
export const objFromKeys = (keys: string[], defaultValue?: boolean | any = false) => {
  const returnObj = {};
  keys.forEach(keyName => {
    returnObj[keyName] = defaultValue;
  });
  return returnObj;
};