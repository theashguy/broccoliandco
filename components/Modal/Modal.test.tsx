import React from "react";
import { render, screen, fireEvent } from "../../test-utils";

import Modal from "./Modal";

describe("Modal", () => {
  it("renders", async () => {
    render(<Modal onDismiss={() => true}>Children</Modal>);
    let component = await screen.findByText("Children");
    expect(component).toBeTruthy();
  });

  it("runs the dismiss function when the mask is clicked", async () => {
    let tracker = { clicked: false };
    render(<Modal onDismiss={() => (tracker.clicked = true)}>Children</Modal>);

    let clickable = screen.getByTestId("mask");
    await fireEvent.click(clickable);

    expect(tracker.clicked).toBeTruthy();
  });
});
