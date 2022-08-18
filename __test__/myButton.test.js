import { render, screen, fireEvent } from "@testing-library/react-native";
import MyButton from "../components/myButton";
import React, { useRef } from "react";
import { act } from "react-test-renderer";
import {
    withReanimatedTimer,
    advanceAnimationByTime,
    advanceAnimationByFrame,
    getAnimatedStyle
} from "react-native-reanimated/src/reanimated2/jestUtils";


// jest.mock("react", () => {
//     return {
//         ...jest.requireActual('react'),
//         useRef: jest.fn()
//     }
// });



describe("Basic testing of MyButton", () => {

    test("MyButton must bind it's children correctly", () => {
        render(<MyButton>Click</MyButton>);

        let btn = screen.getByTestId("btn");
        expect(btn).toHaveTextContent("Click");

    });

    test("MyButton must be pressable", () => {
        const handlePress = jest.fn();
        render(<MyButton onPress={handlePress}>Click</MyButton>);
        let btn = screen.getByTestId("btn");
        fireEvent(btn, "onPress");
        expect(handlePress).toHaveBeenCalledTimes(1);

    });

    test("MyButton must apply the styles given in style attribute.", () => {
        render(<MyButton style={{ baackgroundColor: "yellow" }}>Click</MyButton>);
        let btn = screen.getByTestId("btn");
        expect(btn).toHaveStyle({ baackgroundColor: "yellow" });
    });

    test("MyButton must apply textStyle Properly", () => {
        render(<MyButton textStyle={{ color: "white" }}>Click</MyButton>);
        let btn = screen.getByTestId("btn");
        expect(btn.children[0]).toHaveStyle({ color: "white" });
    });

});

describe("MyButton Animation Tests.", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    test("MyButton must have a RippleCircle Animated View", () => {
        render(<MyButton>Click</MyButton>);
        let rippleCircle = screen.getByTestId("rippleCircle");
        expect(rippleCircle._fiber.elementType).toBe("View");
    });

    test.only("MyButton RippleCircle must move to the position where clicked. ", () => {
        withReanimatedTimer(() => {
            render(<MyButton>Click</MyButton>);
            let btn = screen.getByTestId("btn");
            let rippleCircle = screen.getByTestId("rippleCircle");
            expect(rippleCircle).toHaveStyle({ left: -5, top: -5 });

            fireEvent(btn, "onPressIn", { nativeEvent: { locationX: 10, locationY: 15 } });

            advanceAnimationByTime(500);
            rippleCircle = screen.getByTestId("rippleCircle");
            expect(rippleCircle).toHaveAnimatedStyle({ left: 5, top: 10 });
        })

    });

    test.skip("RippleCircle initial Opacity & Scale must be 0. ", () => {
        render(<MyButton>Click</MyButton>);

        let rippleCircle = screen.getByTestId("rippleCircle");
        expect(rippleCircle).toHaveAnimatedStyle({ opacity: 0, transform: [{ scale: 0 }] });
    });


    test("With press in RippleCircle must scale to fit button width with it's opacity must grow to 1.", () => {

        const ref = { current: {} };


        Object.defineProperty(ref, 'current', {
            set(value) {
                this._current = value;
                if (this._current && this._current.props && this._current.props.testID === "btn") {
                    this._current.offsetWidth = 100;
                }
            },
            get() {

                return this._current;
            },
        });

        jest.spyOn(React, "useRef").mockReturnValue(ref);




        render(<MyButton>Click</MyButton>);
        let btn = screen.getByTestId("btn");
        let rippleCircle = screen.getByTestId("rippleCircle");
        fireEvent(btn, "onPressIn", { nativeEvent: { locationX: 10, locationY: 15 } });
        //fireEvent(btn, "onPressIn");
        // jest.runAllTimers();

        //  expect(rippleCircle).toHaveAnimatedStyle({ opacity: 1, transform: [{ scale: 20 }] });




        //   let rippleCircle = screen.getByTestId("rippleCircle");
        // fireEvent(rippleCircle, "onPressIn", { nativeEvent: { locationX: 10, locationY: 15 } });

    });
});
