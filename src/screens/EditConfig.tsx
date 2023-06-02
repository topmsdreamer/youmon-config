import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import baseSchema from "../assets/base-schema.json";
import { parseSchemaToYupSchema } from "../../utils/convertSchema";
import { useForm } from "../hooks/useForm";
import { ConfigForm } from "../components/ConfigForm";
import { JsonSchemaType } from "../types/youmoni-schema.types";
import DefaultButton from "../components/DefaultButton";

const DeviceConfig = parseSchemaToYupSchema(baseSchema as unknown as JsonSchemaType);

export const EditConfig = (props: any) => {
  const editConfigForm = useForm({
    schema: DeviceConfig,
    defaultValues: {}
  });

  const handleSubmit = useCallback((value: any) => {
    console.log("handleSubmit", value);
  }, []);

  const handleError = useCallback((errors: any) => {
    console.log("handleError", errors);
    console.log(JSON.stringify(errors, null, 4));
  }, []);

  const handleFormSubmit = useCallback(() => {
    if (editConfigForm) {
      editConfigForm.handleSubmit(handleSubmit, handleError)();
    }
  }, [editConfigForm]);

  const formValue = editConfigForm.watch();

  return (
    <View style={{ paddingHorizontal: 20, height: "100%" }}>
      <ConfigForm fields={{ properties: baseSchema as JsonSchemaType }} form={editConfigForm} />
      <DefaultButton
        style={{ marginTop: 20, marginBottom: 10 }}
        color="primary"
        text="Submit"
        onPress={handleFormSubmit}
      ></DefaultButton>
    </View>
  );
};
