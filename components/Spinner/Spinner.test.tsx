import React from "react";
import { render, screen } from "@testing-library/react";

import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders", async () => {
    render(<Spinner />);
    let rendered = await screen.findByText("Working...");
    expect(rendered).toBeTruthy();
  });
});
