// Centralized error handler
export const handleError = <T>(message: string, returnValue: T = false as T): T => {
  console.error(message);
  return returnValue;
};