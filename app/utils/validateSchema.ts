import type { Schema } from "joi";
import { ary } from "lodash";

const validateSchema = ary((schema: Schema, value: any) => {
  const { error } = schema.validate(value);

  if (error) {
    const message = JSON.stringify(error.details.map(x => x.message));
    throw new Error(message);
  }
  return;
}, 2);

export default validateSchema;
