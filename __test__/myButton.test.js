import { render, screen, fireEvent } from "@testing-library/react-native";
import MyButton from "../components/myButton";

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
    test("MyButton must have a RippleCircle Animated View", () => {
        render(<MyButton>Click</MyButton>);
        let rippleCircle = screen.getByTestId("rippleCircle");
        expect(rippleCircle._fiber.elementType).toBe("View");
    });

    test("MyButton RippleCircle must move to the position where clicked. ", () => {
        render(<MyButton>Click</MyButton>);
        let rippleCircle = screen.getByTestId("rippleCircle");
        expect(rippleCircle).toHaveStyle({ left: 0, top: 0 });
        fireEvent(rippleCircle, "onPressIn", { nativeEvent: { locationX: 10, locationY: 15 } });
        expect(rippleCircle).toHaveStyle({ left: 10, top: 15 });
    });

    test("RippleCircle initial Opacity & Scale must be 0. ", () => {
        render(<MyButton>Click</MyButton>);
        let rippleCircle = screen.getByTestId("rippleCircle");
        expect(rippleCircle).toHaveAnimatedStyle({ opacity: 0, transform: [{ scale: 0 }] });
    });

    test("", () => {

    });
});
