import React, { useCallback, useEffect, useMemo } from "react";
import get from "lodash.get";
import { Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { JsonSchemaType } from "../types/youmoni-schema.types";
import { UseFormReturn } from "react-hook-form";

interface FormFieldProps {
  field: JsonSchemaType;
  formPath: string[];
  form: UseFormReturn<any, object>;
}

export const FormField: React.FC<FormFieldProps> = ({ field, form, formPath }) => {
  const path = useMemo(() => formPath.join("."), [formPath]);
  const errorMessage = get(form.formState.errors, path)?.message;

  const fieldValue = form.getValues(path);

  const handleFieldChange = useCallback(
    (field: string, value: any) => {
      form.setValue(field, value, { shouldTouch: true, shouldValidate: true });
      form.trigger(field);
    },
    [form]
  );

  useEffect(() => {
    form.setValue(path, field.default, { shouldTouch: false, shouldValidate: false });
  }, [field.default, path]);

  const fieldComponent = useMemo(() => {
    if (field.enum) {
      const options = field.enum.map((item: number | string) => ({ label: `${item}`, value: item }));
      return (
        <RNPickerSelect
          placeholder={{
            label: field.description,
            value: field.defaultValue,
            key: "category"
          }}
          style={{
            placeholder: { color: "#ccc", fontSize: 18 },
            inputIOS: { fontSize: 18 },
            inputAndroid: { fontSize: 14, color: "#000" },
            viewContainer: {
              borderRadius: 10,
              padding: 10,
              height: 40,
              borderColor: errorMessage ? "red" : "#ccc",
              borderWidth: 1,
              justifyContent: "center",
              backgroundColor: "#fff"
            }
          }}
          value={fieldValue ?? ""}
          onValueChange={(value) => handleFieldChange(path, value)}
          items={options}
        />
      );
    } else {
      switch (field.type) {
        case "string":
          return (
            <>
              <TextInput
                style={{
                  height: 40,
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  textAlignVertical: "top",
                  width: "100%",
                  fontSize: 14,
                  borderRadius: 10,
                  borderColor: errorMessage ? "red" : "#ccc",
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  justifyContent: "flex-start"
                }}
                placeholderTextColor="#ccc"
                numberOfLines={5}
                placeholder={field.description}
                multiline={true}
                value={`${fieldValue ?? ""}`}
                defaultValue={fieldValue ?? ""}
                onChangeText={(value) => handleFieldChange(path, value)}
                // value={description}
              />
            </>
          );
        case "integer":
          return (
            <>
              <TextInput
                style={{
                  height: 40,
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  textAlignVertical: "top",
                  width: "100%",
                  fontSize: 14,
                  borderRadius: 10,
                  borderColor: errorMessage ? "red" : "#ccc",
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  justifyContent: "flex-start"
                }}
                placeholderTextColor="#ccc"
                placeholder={field.description}
                value={`${fieldValue ?? ""}`}
                defaultValue={fieldValue ?? ""}
                onChangeText={(value) => handleFieldChange(path, value)}
                // value={description}
              />
            </>
          );
        default:
          return <></>;
      }
    }
  }, [field, fieldValue, errorMessage]);
  return (
    <View style={{ paddingBottom: 15, marginBottom: 5 }}>
      {fieldComponent}
      {errorMessage && (
        <Text style={{ position: "absolute", bottom: 0, left: 12, fontSize: 10, color: "red" }}>{errorMessage}</Text>
      )}
    </View>
  );
};
