import * as rename from 'deep-rename-keys';

export function toSnakeCase(obj: Object): Object {
  return rename(obj, (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  });
}

export function toCamelCase(obj: Object): Object {
  return rename(obj, (name: string) => {
    return name.replace(/(\_\w)/g, ([, char]) => {
      return char.toUpperCase();
    });
  });
}
