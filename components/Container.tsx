import React, { useRef } from "react"
import { View, ScrollView, StyleSheet, Animated, Dimensions } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { DefaultText } from "./DefaultText";
export const Container = (props: any) => {
  const { children, style } = props;
  const containerStyle = style !== undefined ? [styles.container, styles.container, props.style] : styles.container;
  return (<View style={containerStyle}>
    {children}
  </View>)
}

export const ScrollContainer = (props: any) => {
  const { children, style } = props;

  const scrollStyle = style !== undefined ? [styles.scrollContainer, styles.scrollContainer, props.style] : styles.scrollContainer;
  return <ScrollView contentContainerStyle={scrollStyle}>
    {children}
  </ScrollView>
}


export const AnimatedScrollContainer = (props: any) => {
  const { component, children, height } = props;
  const HEIGHT = height !== undefined ? height : 350;
  const scrollA: Animated.Value = useRef<Animated.Value>(new Animated.Value(0)).current;

  const transition = ((scrollA: any) => ({
    height: HEIGHT,
    width: Dimensions.get('screen').width,
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-HEIGHT, 0, HEIGHT, HEIGHT],
          outputRange: [-HEIGHT / 2, 0, HEIGHT * 0.75, HEIGHT * 0.5],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-HEIGHT, 0, HEIGHT, HEIGHT + 0],
          outputRange: [2, 1, 1, 0.75],
        }),
      },
    ],
  }))

  const refreshControl = props.refreshControl ? props.refreshControl : undefined;

  return (
    <Animated.ScrollView
      style={{ backgroundColor: '#fff' }}
      refreshControl={refreshControl}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollA } } }],
        { useNativeDriver: true },
      )}
      scrollEventThrottle={1}
    >
      <View style={{ marginTop: -500, paddingTop: 500, alignItems: 'center', overflow: 'hidden', backgroundColor: "#fff" }}>
        <Animated.View style={[transition(scrollA)]}>
          {component}
        </Animated.View>
      </View>
      {children}
    </Animated.ScrollView>

  );

}

export const Card = (props: any) => {
  const { children, style } = props;
  const cardStyle = style !== undefined ? [styles.card, styles, props.style] : styles.card;
  return <View style={cardStyle}>{children}</View>
}

export const Section = (props: any) => {
  const { children, style } = props;
  const sectionStyle = style !== undefined ? [styles.section, styles, style] : styles.section;
  return <View style={sectionStyle}>
    {children}
  </View>
}

export const EmptyResult = () => (
  <View style={{ flex: 1, justifyContent: 'flex-start', alignSelf: 'center', marginTop: 10 }}>
    <View style={{ width: 100, height: 100, backgroundColor: "#f6f6f6", borderRadius: 100 / 2, justifyContent: 'center' }}>
      <FontAwesome5 style={{ alignSelf: 'center' }} name="search" size={24} color="black" />
    </View>
    <DefaultText style={{ alignSelf: 'center', marginTop: 20 }} tag={'h4'}>No results</DefaultText>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },

  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    elevation: 4,


    marginHorizontal: 10,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    shadowColor: "#282828",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  section: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 10
  }
});