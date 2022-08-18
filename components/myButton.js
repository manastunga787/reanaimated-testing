import styled from "styled-components/native";
import { Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useState, useRef, useEffect } from "react";

export default function MyButton({ children, onPress, style, textStyle }) {

    const [ripplePosition, setRippleposition] = useState({ left: 0, top: 0 });
    const sharedValue = new useSharedValue(0);
    const toScale = useRef(0);
    console.log("toscale", toScale);
    const btnRef = useRef();
    console.log("btnRef", btnRef);
    let rippleAnimationStyle = useAnimatedStyle(() => {
        return {
            opacity: 1,
            transform: [
                {
                    scale: 1
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

    useEffect(() => {

        console.log("btn width", btnRef.current);
        // toScale.current = Math.ceil((btnRef.current.offsetWidth * 2) / 10);
        // console.log("toScale", toScale.current);
    }, []);


    return (
        <Btn testID="btn" ref={btnRef}>
            <Text style={textStyle}>{children}</Text>
            <RippleCircle testID="rippleCircle" ripplePosition={ripplePosition} style={rippleAnimationStyle} />
        </Btn>
    );
}

const Btn = styled.View`
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
    top:${(props) => `${props.ripplePosition.top - 5}px`};
    left:${(props) => `${props.ripplePosition.left - 5}px`};
   
`;