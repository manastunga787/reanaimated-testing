import { render, screen, fireEvent } from "@testing-library/react-native";
import MyButton from "../components/myButton";
import React, { useRef } from "react";


// jest.mock("react", () => {
//     return {
//         ...jest.requireActual('react'),
//         useRef: jest.fn()
//     }
// });

// describe("Basic testing of MyButton", () => {

//     test("MyButton must bind it's children correctly", () => {
//         render(<MyButton>Click</MyButton>);

//         let btn = screen.getByTestId("btn");
//         expect(btn).toHaveTextContent("Click");

//     });

//     test("MyButton must be pressable", () => {
//         const handlePress = jest.fn();
//         render(<MyButton onPress={handlePress}>Click</MyButton>);
//         let btn = screen.getByTestId("btn");
//         fireEvent(btn, "onPress");
//         expect(handlePress).toHaveBeenCalledTimes(1);

//     });

//     test("MyButton must apply the styles given in style attribute.", () => {
//         render(<MyButton style={{ baackgroundColor: "yellow" }}>Click</MyButton>);
//         let btn = screen.getByTestId("btn");
//         expect(btn).toHaveStyle({ baackgroundColor: "yellow" });
//     });

//     test("MyButton must apply textStyle Properly", () => {
//         render(<MyButton textStyle={{ color: "white" }}>Click</MyButton>);
//         let btn = screen.getByTestId("btn");
//         expect(btn.children[0]).toHaveStyle({ color: "white" });
//     });

// });

describe("MyButton Animation Tests.", () => {
    // test("MyButton must have a RippleCircle Animated View", () => {
    //     render(<MyButton>Click</MyButton>);
    //     let rippleCircle = screen.getByTestId("rippleCircle");
    //     expect(rippleCircle._fiber.elementType).toBe("View");
    // });

    // test("MyButton RippleCircle must move to the position where clicked. ", () => {
    //     render(<MyButton>Click</MyButton>);
    //     let btn = screen.getByTestId("btn");
    //     let rippleCircle = screen.getByTestId("rippleCircle");
    //     expect(rippleCircle).toHaveStyle({ left: -5, top: -5 });
    //     fireEvent(btn, "onPressIn", { nativeEvent: { locationX: 10, locationY: 15 } });
    //     expect(rippleCircle).toHaveStyle({ left: 5, top: 10 });
    // });

    // test.skip("RippleCircle initial Opacity & Scale must be 0. ", () => {
    //     render(<MyButton>Click</MyButton>);
    //     let rippleCircle = screen.getByTestId("rippleCircle");
    //     expect(rippleCircle).toHaveAnimatedStyle({ opacity: 0, transform: [{ scale: 0 }] });
    // });


    test.only("With press in RippleCircle must scale to fit button width with it's opacity must grow to 1.", () => {
        const ref = { current: {} };
        const spyedUseRef = jest.spyOn(React, "useRef").mockReturnValue({ current: { offsetWidth: 55 } });

        render(<MyButton>Click</MyButton>);
        let btn = screen.getByTestId("btn");




        expect(spyedUseRef).toHaveBeenCalledTimes(2);

        //   let rippleCircle = screen.getByTestId("rippleCircle");
        // fireEvent(rippleCircle, "onPressIn", { nativeEvent: { locationX: 10, locationY: 15 } });

    });
});
