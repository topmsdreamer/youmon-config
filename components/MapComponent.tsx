import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { MAP_TYPES, Marker, Region, UrlTile } from "react-native-maps";
import { StyleProp, ViewStyle } from "react-native";

interface IMapProps {
  children?: React.ReactNode;
  onPress?: () => void;
  style?: any;
  mapstyle?: any;
  region?: Region;
}

export default class MapComponent extends Component<IMapProps> {

  onMapPress = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    const { children, style, mapstyle, region } = this.props;
    const viewstyle: StyleProp<ViewStyle> = style !== undefined ?
      [styles.container, styles.container, style] :
      styles.container;
    const mapstyles: StyleProp<ViewStyle> = mapstyle !== undefined ? [styles.map, styles.map, mapstyle] : styles.map;
    return (

      <View style={viewstyle}>
        <MapView
          mapType={MAP_TYPES.NONE}
          region={region}
          onLongPress={() => this.onMapPress()}
          onPress={() => this.onMapPress()} style={mapstyles}
        >
          {/*<UrlTile*/}
          {/*  urlTemplate="https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"*/}
          {/*  maximumZ={19}*/}
          {/*  tileSize={256}*/}
          {/*  doubleTileSize*/}
          {/*/>*/}
          {/*{region && <Marker coordinate={region} />}*/}
          {/*{children}*/}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    map: {
      height: "100%",
      width: "100%",
      borderColor: "#fff",
    }
  }
);