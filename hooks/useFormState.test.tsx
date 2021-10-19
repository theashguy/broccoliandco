import React from "react";

import { rest } from "msw";
import { setupServer } from "msw/node";

import { render, screen, fireEvent } from "@testing-library/react";

import { Scaffold, ENDPOINT } from "./useFormState";

/**
 * @name server
 * @description Mocked server object & associated registration
 */

const server = setupServer(
  rest.post(ENDPOINT, (req, res, ctx) => {
    return res(ctx.json({}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 * @name setField
 * @description Convenience method to set the value of a field in our test
 * scaffold in a single line (as we'll be doing this a lot).
 * @param field
 * @param value
 */
const setField = (field, value) => {
  fireEvent.change(screen.getByTestId("targetField"), {
    target: { value: field },
  });

  fireEvent.change(screen.getByTestId("fieldValue"), {
    target: { value: value },
  });
};

describe("Form State", () => {
  it("initialises with clean data", () => {
    render(<Scaffold />);

    expect(screen.getByTestId("fieldState").innerHTML).toBe("Pending");
    expect(screen.getByTestId("fieldName").innerHTML).toBe("");
    expect(screen.getByTestId("fieldEmail").innerHTML).toBe("");
    expect(screen.getByTestId("fieldConfirm").innerHTML).toBe("");
  });

  it("updates the name when called", () => {
    render(<Scaffold />);

    setField("name", "My Name");

    expect(screen.getByTestId("fieldName").innerHTML).toBe("My Name");
  });

  it("updates the email when called", () => {
    render(<Scaffold />);

    setField("email", "email@email.com");

    expect(screen.getByTestId("fieldEmail").innerHTML).toBe("email@email.com");
  });

  it("updates the confirm when called", () => {
    render(<Scaffold />);

    setField("confirm", "email@email.com");

    expect(screen.getByTestId("fieldConfirm").innerHTML).toBe(
      "email@email.com"
    );
  });

  it("resets its internal state when reset is run", () => {
    render(<Scaffold />);

    setField("name", "My Name");
    setField("email", "email@email.com");
    setField("confirm", "email@email.com");

    fireEvent.click(screen.getByTestId("reset"));

    expect(screen.getByTestId("fieldName").innerHTML).toBe("");
    expect(screen.getByTestId("fieldEmail").innerHTML).toBe("");
    expect(screen.getByTestId("fieldConfirm").innerHTML).toBe("");
  });

  it("handles a successful submit", async () => {
    render(<Scaffold />);

    setField("confirm", "email@email.com");
    setField("name", "My Name");
    setField("email", "email@email.com");

    fireEvent.click(screen.getByTestId("submit"));
    await screen.findByText("Submitted");

    expect(screen.getByTestId("fieldState").innerHTML).toBe("Submitted");
  });

  it("handles a failed submit", async () => {
    render(<Scaffold />);

    // Return an error from the endpoint
    server.use(
      rest.post(ENDPOINT, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    setField("confirm", "email@email.com");
    setField("name", "My Name");
    setField("email", "email@email.com");

    await fireEvent.click(screen.getByTestId("submit"));
    await screen.findByText("Error");

    expect(screen.getByTestId("fieldState").innerHTML).toBe("Error");
  });

  it("validates names correctly", () => {
    render(<Scaffold />);

    setField("name", "F");
    expect(screen.getByTestId("fieldNameError").innerHTML).toBeTruthy();

    setField("name", "Fred");
    expect(screen.getByTestId("fieldNameError").innerHTML).toBeFalsy();
  });

  it("validates emails correctly", () => {
    render(<Scaffold />);

    setField("email", "fred&someplace.net");
    expect(screen.getByTestId("fieldEmailError").innerHTML).toBeTruthy();

    setField("email", "fred@someplace.net");
    expect(screen.getByTestId("fieldEmailError").innerHTML).toBeFalsy();
  });

  it("requires both emails to be equal", async () => {
    render(<Scaffold />);

    const email1 = "fred@someplace.net";
    const email2 = "fred@otherplace.org";

    setField("name", "Fred Jenkins");

    setField("email", email1);
    setField("confirm", email2);
    expect(screen.getByTestId("fieldSubmittable").innerHTML).toBe("false");

    setField("confirm", "fred@someplace.net");

    expect(screen.getByTestId("fieldSubmittable").innerHTML).toBe("true");
  });

  it("does not submit with an invalid form", async () => {
    render(<Scaffold />);

    setField("confirm", "email@email.com");
    setField("name", "My Name");
    setField("email", "different@email.com");

    await fireEvent.click(screen.getByTestId("submit")); // State will be Loading
    await screen.findByText("Pending");

    expect(screen.getByTestId("fieldState").innerHTML).toBe("Pending");
  });
});
