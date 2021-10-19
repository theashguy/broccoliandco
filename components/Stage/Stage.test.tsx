import React from "react";
import { render, screen } from "@testing-library/react";

import Stage from "./Stage";

describe("Stage", () => {
  it("renders", async () => {
    render(<Stage>TestText</Stage>);
    let rendered = await screen.findByText("TestText");
    expect(rendered).toBeTruthy();
  });
});
