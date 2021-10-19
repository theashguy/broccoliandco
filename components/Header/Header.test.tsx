import React from "react";
import { render, screen } from "../../test-utils";

import Header from "./Header";

describe("Header", () => {
  it("renders", async () => {
    render(<Header />);
    let component = await screen.findByText("Broccoli");
    expect(component).toBeTruthy();
  });
});
