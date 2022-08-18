import styled from "styled-components/native";
import { Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useState, useRef, useEffect } from "react";

export default function MyButton({ children, onPress, style, textStyle }) {

    // const sharedValue = new useSharedValue(0);
    const ripplePositonSharedValueLeft = useSharedValue(-5);
    const ripplePositonSharedValueTop = useSharedValue(-5);

    const btnRef = useRef();

    let rippleAnimationStyle = useAnimatedStyle(() => {
        return {
            left: ripplePositonSharedValueLeft.value,
            top: ripplePositonSharedValueTop.value,

        }
    })

    const _handlePress = () => {
        // console.log("called");
        if (typeof onPress === "function") {
            onPress();
        }
    }

    const handlePressIn = (e) => {
        ripplePositonSharedValueLeft.value = withTiming(e.nativeEvent.locationX - 5, { duration: 500 });
        ripplePositonSharedValueTop.value = withTiming(e.nativeEvent.locationY - 5, { duration: 500 });
    }

    useEffect(() => {
        // console.log("btn width", btnRef.current.offsetWidth);
        // toScale.current = Math.ceil((btnRef.current.offsetWidth * 2) / 10);
        // console.log("toScale", toScale.current);
    }, []);


    return (
        <Btn testID="btn" ref={btnRef} onPressIn={handlePressIn} onPress={_handlePress} style={style}>
            <Text style={textStyle}>{children}</Text>
            <Animated.View testID="rippleCircle" style={[styles.ripple, rippleAnimationStyle]} />
        </Btn>
    );
}

const Btn = styled.Pressable`
    padding:8px 10px;
    background-color:blue;
    border-radius:5px;
    position:relative;
    justify-content:center;
    align-items:center;
`;

const RippleCircle = styled(Animated.View)`
    background-color:red;
    width:10px;
    height:10px;
    /* padding:5px; */
    border-radius:50%;
    position:absolute;
    
   
`;

const styles = StyleSheet.create({
    ripple: {
        backgroundColor: "red",
        width: 10,
        height: 10,
        borderRadius: 5,
        position: "absolue"
    }
});