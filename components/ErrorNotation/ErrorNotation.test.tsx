import React from "react";
import { render, screen } from "../../test-utils";

import ErrorNotation from "./ErrorNotation";

describe("ErrorNotation", () => {
  it("renders", async () => {
    render(<ErrorNotation>Children</ErrorNotation>);
    let component = await screen.findByText("Children");
    expect(component).toBeTruthy();
  });
});
