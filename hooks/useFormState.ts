import { logDOM } from "@testing-library/dom";
import React, { useEffect, useState } from "react";

/**
 * @name FormState
 * @description Represents the differt states a form can be in.
 */
type FormState = "Pending" | "Submitted" | "Loading" | "Error" | "Reset";

type FormData = {
  name: string;
  nameError?: string;
  email: string;
  emailError?: string;
  confirm: string;
  confirmError?: string;
  submittable: boolean;
  submitError?: string;
};

/**
 * @name notEmpty
 * @description Checks for emptiness on string, including ignoring whitespace.
 */

const notEmpty = (field: string): boolean => {
  if (field && field.trim() !== "") {
    return true;
  }

  return false;
};

/**
 * @name hasValidName
 * @description Checks to see if the minimum length of 3 characters is correct.
 */

const hasValidName = (field: string): boolean => {
  return field.length >= 3;
};

/**
 * @name hasValidEmail
 * @description Checks to see if the string in the email field looks emaily.
 */

const hasValidEmail = (field: string): boolean => {
  return field.indexOf("@") > -1;
};

/**
 * @name isSubmittable
 * @description Simple check that validates if the form has been completed to
 * sufficient standard to submit it to the backend. Specifically checks that
 * there are no errors and that the fields aren't blank.
 */

const isSubmittable = (formData: FormData) => {
  if (
    !formData.nameError &&
    !formData.emailError &&
    !formData.confirmError &&
    notEmpty(formData.name) &&
    notEmpty(formData.email) &&
    notEmpty(formData.confirm)
  ) {
    return true;
  }

  return false;
};

/**
 * @name useFormState
 * @description Hook used to handle the collection and submission of form data
 * for the Broccoli and Co request and invite form.
 */

const useFormState = (): [
  Function,
  Function,
  Function,
  FormState,
  FormData
] => {
  const [formState, setFormState] = useState<FormState>("Pending");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Init form object with data
  const formData: FormData = {
    name: name,
    email: email,
    confirm: confirm,
    submittable: false,
  };

  // Validate name
  formData.nameError = !hasValidName(formData.name)
    ? "Must be at least 3 characters long"
    : undefined;

  // Validate emails
  formData.confirmError =
    formData.email != formData.confirm
      ? "Email and confirmation fields must match."
      : undefined;

  formData.emailError = !hasValidEmail(formData.email)
    ? "Must be a valid email address"
    : undefined;

  formData.confirmError = !hasValidEmail(formData.confirm)
    ? "Must be a valid email address"
    : formData.confirmError;

  // Set submittable
  formData.submittable = isSubmittable(formData);

  // Provide convenient access to set field
  const setField = (field: string, value: string) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "confirm":
        setConfirm(value);
        break;
      default:
        console.warn("Invalid field name passed to setField", field);
    }
  };

  // Sets the form state to loading causing a fetch on next tick
  const submitForm = () => {
    setFormState("Loading");
  };

  // Perform fetch if status at 'Loading', and change state as a result
  useEffect(() => {
    // Handle state where we're transitioning to Loading
    if (formState == "Loading") {
      // Note: We're doing this this way rather than using more complex hooks
      // like reducer etc. as the form state is fairly simple. We're likely
      // close to the upper threshold of what we can achieve in a single render
      // and any changes that increase complexity should consider refactoring.

      fetch(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
          }),
        }
      )
        .then((response) => {
          if (response.status != 200) {
            throw response.statusText || "Error submitting form";
          }

          console.log("Response is", response);
          response.json();
        })
        .then((json) => setFormState("Submitted"))
        .catch((e) => {
          console.error("Error submitting form:", e);
          setSubmitError(e);
          setFormState("Error");
        });
    }

    // Handle state where we're transitioning to Pending
    else if (formState == "Pending") {
      // TODO: Transition to single state...
      setName("");
      setEmail("");
      setConfirm("");
    }

    // Handle state where we're transitioning to Reset
    else if (formState == "Reset") {
      // Required so we can clear the form when pending and still trigger UI
      // effects to change and so we can sequence clearing data vs hiding modal
      setFormState("Pending");
    }
  }, [formState]);

  // Provide quick method for resetting form
  const resetForm = () => {
    setFormState("Reset");
  };

  return [
    setField, // Method for setting an given value in the form
    submitForm, // Submits the form to the server
    resetForm, // Clears the form to an empty state
    formState, // Current state of the from from the given set
    formData, // Actual form data that can be rendered
  ];
};

export default useFormState;
