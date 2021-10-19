import React from "react";
import { render, screen } from "../../test-utils";

import ButtonGroup from "./ButtonGroup";

describe("ButtonGroup", () => {
  it("renders", async () => {
    render(<ButtonGroup>Children</ButtonGroup>);
    let component = await screen.findByText("Children");
    expect(component).toBeTruthy();
  });
});
