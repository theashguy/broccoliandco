import React from "react";
import { render, screen, fireEvent } from "../../test-utils";

import Button from "./Button";

describe("Button", () => {
  it("renders", async () => {
    render(
      <Button
        onClick={() => true}
        autoFocus={false}
        disabled={false}
        working={false}
      >
        Children
      </Button>
    );
    let component = await screen.findByText("Children");
    expect(component).toBeTruthy();
  });

  it("runs the click fuction when clicked", async () => {
    let tracker = { clicked: false };
    render(
      <Button
        onClick={() => (tracker.clicked = true)}
        autoFocus={false}
        disabled={false}
        working={false}
      >
        Children
      </Button>
    );

    let clickable = await screen.findByText("Children");
    await fireEvent.click(clickable);

    expect(tracker.clicked).toBeTruthy();
  });

  it("doesn't run the click fuction when disabled", async () => {
    let tracker = { clicked: false };
    render(
      <Button
        onClick={() => (tracker.clicked = true)}
        autoFocus={false}
        disabled={true}
        working={false}
      >
        Children
      </Button>
    );

    let clickable = await screen.findByText("Children");
    await fireEvent.click(clickable);

    expect(tracker.clicked).toBeFalsy();
  });
});
