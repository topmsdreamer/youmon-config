import * as yup from "yup";
import { JsonSchemaType } from "../src/types/youmoni-schema.types";

type YupSchemaType = yup.AnyObjectSchema;

export const parseSchemaToYupSchema = (schema: JsonSchemaType): YupSchemaType => {
  const { type, properties, required, anyOf } = schema;

  let yupSchema = yup.object();
  const schemaObject = {} as any;

  if (type !== "object" || !properties) {
    throw new Error("Invalid schema");
  }

  for (const [propName, propSchema] of Object.entries(properties)) {
    const { type, properties: items, enum: enumValues, minimum, maximum } = propSchema;

    if (type === "object") {
      let subSchemaObject = parseSchemaToYupSchema(propSchema);
      if (required && required.includes(propName)) {
        subSchemaObject = subSchemaObject.required(`${propName} is a required field`);
      }
      schemaObject[propName] = subSchemaObject;
    } /* else if (type === "array") {
      let itemSchema: YupSchemaType | undefined;
      itemSchema = parseSchemaToYupSchema(items);
      yupSchema = yup.array().of(itemSchema);
      if (required && required.includes(propName)) {
        yupSchema = yupSchema.required(`${propName} isa required field`);
      }
    } */ else {
      let yupType: yup.SchemaOf<any> = yup.mixed();
      if (type === "string") {
        yupType = yup.string();
      } else if (type === "integer") {
        yupType = yup.number();

        if (minimum !== null && minimum !== undefined) {
          yupType = (yupType as yup.NumberSchema<number | undefined, any, number | undefined>).min(minimum);
        }

        if (maximum !== null && maximum !== undefined) {
          yupType = (yupType as yup.NumberSchema<number | undefined, any, number | undefined>).max(maximum);
        }
      } else if (type === "boolean") {
        yupType = yup.boolean();
      }
      if (enumValues) {
        yupType = yupType.oneOf(enumValues);
      }
      // yupType = yupType.when(propName, (value: any, schema: YupSchemaType) => {
      //   return yupType;
      // });
      if (required && required.includes(propName)) {
        yupType = yupType.required(`${propName} is a required field`);
      }

      schemaObject[propName] = yupType;
    }
  }

  yupSchema = yupSchema.shape(schemaObject);

  return yupSchema;
};
