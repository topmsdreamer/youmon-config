import React, { useState, useEffect, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Switch,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Camera } from "expo-camera";
import * as _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import * as ImageManipulator from "expo-image-manipulator";
import PrimaryButton from "./DefaultButton";

export const UploadPhoto = (props: any) => {
  const cameraRef: React.RefObject<Camera> = React.createRef();
  const { navigation } = props;

  const [hasPermission, setHasPermission] = useState<boolean | undefined>(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [pictureSource, setPictureSource] = useState(null);

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.1, base64: false };
      const data = await cameraRef.current.takePictureAsync(options);
      const source: any = data;

      if (source) {
        await cameraRef.current.pausePreview();

        const manipResult: any = await ImageManipulator.manipulateAsync(source.localUri || source.uri, [], {
          compress: 0,
          format: ImageManipulator.SaveFormat.JPEG
        });

        setPictureSource(manipResult);
        setIsPreview(true);
      }
    }
  };

  const usePreview = async () => {
    const { navigation, onAddPhoto } = props;
    const source = pictureSource;
    onAddPhoto(source);
  };

  const cancelPreview = async () => {
    if (cameraRef && cameraRef.current) {
      await cameraRef.current.resumePreview();
      setPictureSource(null);
      setIsPreview(false);
    }
  };

  const cancelSnap = () => {
    const { onDismiss } = props;
    onDismiss();
  };

  useEffect(() => {
    (async () => {
      const { status }: any = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Text>Ingen tillgång till kameran, lägg till den här appen i dina kamerainställningar</Text>
        <PrimaryButton onPress={() => cancelSnap()} text="Stäng"></PrimaryButton>
      </View>
    );
  }

  const screenWidth =
    Dimensions.get("screen").width < Dimensions.get("screen").height
      ? Dimensions.get("screen").width
      : Dimensions.get("screen").height;

  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#000" }}>
      <Camera ref={cameraRef} style={StyleSheet.absoluteFillObject} ratio="16:9" type={type}></Camera>
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          {!isPreview && (
            <View style={{ alignSelf: "flex-end", margin: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="camera-reverse" size={42} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginHorizontal: 10,
            marginBottom: 5
          }}
        >
          {!isPreview && (
            <>
              <TouchableOpacity onPress={onSnap}>
                <Ionicons
                  style={{ alignSelf: "center", marginBottom: 20 }}
                  name="radio-button-on"
                  size={120}
                  color="#fff"
                />
              </TouchableOpacity>
              <PrimaryButton onPress={cancelSnap} text="Cancel"></PrimaryButton>
            </>
          )}
          {isPreview && (
            <>
              <PrimaryButton style={{ marginBottom: 10 }} onPress={usePreview} text="Select photo"></PrimaryButton>
              <PrimaryButton
                style={{ marginBottom: 10 }}
                color={"secondary"}
                onPress={cancelPreview}
                text="New photo"
              ></PrimaryButton>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UploadPhoto;
