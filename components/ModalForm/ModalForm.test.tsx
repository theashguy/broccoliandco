import React from "react";
import { render, screen } from "../../test-utils";

import ModalForm from "./ModalForm";

describe("ModalForm", () => {
  it("renders", async () => {
    render(<ModalForm name="My Name">Children</ModalForm>);
    let component = await screen.findByText("Children");
    let title = await screen.findByText("My Name");
    expect(component).toBeTruthy();
    expect(title).toBeTruthy();
  });
});
