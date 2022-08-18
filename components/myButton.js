import styled from "styled-components/native";
import { Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useState } from "react";

export default function MyButton({ children, onPress, style, textStyle }) {

    const [ripplePosition, setRippleposition] = useState({ left: 0, top: 0 });
    const sharedValue = new useSharedValue(0);
    let rippleAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: sharedValue.value,
            transform: [
                {
                    scale: sharedValue.value
                }
            ]
        }
    })

    const _handlePress = () => {
        if (typeof onPress === "function") {
            onPress();
        }
    }

    const handlePressIn = (e) => {
        console.log(e.nativeEvent.locationX);
        setRippleposition(
            {
                left: e.nativeEvent.locationX,
                top: e.nativeEvent.locationY
            }
        );
    }

    return (
        <Btn testID="btn" onPress={_handlePress} style={style} onPressIn={handlePressIn}>
            <Text style={textStyle}>{children}</Text>
            <RippleCircle testID="rippleCircle" ripplePosition={ripplePosition} style={rippleAnimationStyle} />
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
    padding:5px;
    border-radius:50%;
    position:absolute;
    top:${(props) => `${props.ripplePosition.top}px`};
    left:${(props) => `${props.ripplePosition.left}px`};
   
`;