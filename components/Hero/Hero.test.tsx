import React from "react";
import { render, screen } from "../../test-utils";

import Hero from "./Hero";

describe("Hero", () => {
  it("renders", async () => {
    render(<Hero>Children</Hero>);
    let component = await screen.findByText("Children");
    expect(component).toBeTruthy();
  });
});
