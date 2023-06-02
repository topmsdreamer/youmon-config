import React, { useEffect, useMemo } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { JsonSchemaType } from "../types/youmoni-schema.types";
import { FormField } from "./FormField";
import { UseFormReturn } from "react-hook-form";

interface ConfigFormProps {
  depth?: number;
  fields?: { [key: string]: JsonSchemaType };
  form: UseFormReturn<any, object>;
  parentFields?: string[];
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ depth = 0, fields = {}, parentFields = [], form }) => {
  const formFields = useMemo(() => Object.entries(fields), [fields]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}>
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          {depth === 0 && (
            <Text
              style={{
                marginVertical: 35,
                fontSize: 35,
                textAlign: "center"
              }}
            >
              {formFields[0][1]?.description}
            </Text>
          )}
          {formFields.map(([fieldName, field]) => (
            <React.Fragment key={fieldName}>
              {field.type === "object" ? (
                <View style={{ flexDirection: "column" }}>
                  {depth > 0 && (
                    <Text
                      style={{
                        marginVertical: depth === 1 ? 20 : 15,
                        fontSize: depth === 1 ? 20 : 15
                      }}
                    >
                      {field.description}
                    </Text>
                  )}
                  <ConfigForm
                    depth={depth + 1}
                    fields={field.properties}
                    parentFields={
                      fieldName === "properties" && parentFields.length === 0 ? [] : [...parentFields, fieldName]
                    }
                    form={form}
                  />
                </View>
              ) : (
                <FormField field={field} form={form} formPath={[...parentFields, fieldName]} />
              )}
            </React.Fragment>
          ))}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
