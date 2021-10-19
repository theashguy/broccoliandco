import { logDOM } from "@testing-library/dom";
import React, { useEffect, useState } from "react";

const ENDPOINT =
  "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";

/**
 * @name FormState
 * @description Represents the differt states a form can be in.
 */
type FormState = "Pending" | "Submitted" | "Loading" | "Error" | "Reset";

/**
 * @name FormData
 * @description Represents the shape of the state object holding the form data.
 */
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
  return field.indexOf("@") > -1 && field.length >= 3;
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
    formData.email !== formData.confirm
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
    console.log(
      "Are we submittable",
      formData.submittable,
      formData.confirm,
      formData.confirmError,
      formData.emailError,
      formData.nameError
    );
    if (formData.submittable) {
      setFormState("Loading");
    }
  };

  // Perform fetch if status at 'Loading', and change state as a result
  useEffect(() => {
    // Handle state where we're transitioning to Loading
    if (formState == "Loading") {
      // Note: We're doing this this way rather than using more complex hooks
      // like reducer etc. as the form state is fairly simple. We're likely
      // close to the upper threshold of what we can achieve in a single render
      // and any changes that increase complexity should consider refactoring.

      fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      })
        .then((response) => {
          if (response.status != 200) {
            throw response.statusText || "Error submitting form";
          }

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

/**
 * @name Scaffold
 * @description Test scaffold for exercising the useFormState hook in a sane and
 * thorough way. If updating this scaffold be sure to only take into account the
 * shape of the returned data from the function, rather than the intent of the
 * UI that will utilise it.
 */
const Scaffold = () => {
  let [targetField, setTargetField] = useState(""); // Allow testing custom field names
  let [setField, submitForm, resetForm, formState, formData] = useFormState();

  return (
    <div>
      <dl data-testid="vars">
        <dt>State</dt>
        <dd data-testid="fieldState">{formState}</dd>
        <dt>Name</dt>
        <dd data-testid="fieldName">{formData.name}</dd>
        <dt>Name Error</dt>
        <dd data-testid="fieldNameError">{formData.nameError}</dd>
        <dt>Email</dt>
        <dd data-testid="fieldEmail">{formData.email}</dd>
        <dt>Email Error</dt>
        <dd data-testid="fieldEmailError">{formData.emailError}</dd>
        <dt>Confirm</dt>
        <dd data-testid="fieldConfirm">{formData.confirm}</dd>
        <dt>Confirm Error</dt>
        <dd data-testid="fieldConfirmError">{formData.confirmError}</dd>
        <dt>Submittable</dt>
        <dd data-testid="fieldSubmittable">
          {formData.submittable ? "true" : "false"}
        </dd>
        <dt>Submit Error</dt>
        <dd data-testid="fieldSubmitError">{formData.submitError}</dd>
      </dl>

      <div data-testid="entry">
        <input
          data-testid="targetField"
          onChange={(e) => setTargetField(e.target.value)}
        />
        <input
          data-testid="fieldValue"
          onChange={(e) => setField(targetField, e.target.value)}
        />
      </div>

      <div data-testid="actions">
        <button data-testid="submit" onClick={() => submitForm()}>
          Submit
        </button>
        <button data-testid="reset" onClick={() => resetForm()}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default useFormState;
export {
  ENDPOINT,
  Scaffold,
  notEmpty,
  hasValidName,
  hasValidEmail,
  isSubmittable,
};
