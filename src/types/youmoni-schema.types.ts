export interface Field {
  type: string;
  description: string;
}

export interface Schema {
  $schema: string;
  type: string;
  description: string;
  properties: string;
  required: string;
}

export type JsonSchemaType = {
  type: "object" | "integer" | "string";
  if?: { [key: string]: any; properties: any };
  properties?: { [key: string]: JsonSchemaType };
  [key: string]: any;
};
