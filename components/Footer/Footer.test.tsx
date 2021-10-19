import React from "react";
import { render, screen } from "../../test-utils";

import Footer from "./Footer";

describe("Footer", () => {
  it("renders", async () => {
    render(<Footer />);
    let component = await screen.findByText("Made with 🥦 in Melbourne.");
    expect(component).toBeTruthy();
  });
});
