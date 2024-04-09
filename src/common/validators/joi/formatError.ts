import Joi = require('joi');

export const formatError = (error: Joi.ValidationError) => {
  return error.details.map((e) => {
    const property = (e.path.length === 1 ? e.path : e.path.slice(1)).join('.');
    let errorMessage = e.message;
    if (Number.isInteger(e.path.at(-1))) {
      const elementAtPosition = e.path.slice(-2);
      const coreMessage = e.message.slice(0, e.message.indexOf(' ')).trim();
      errorMessage = `${elementAtPosition.join('.')} ${coreMessage}`;
    }
    return { property, errorMessage };
  });
};
