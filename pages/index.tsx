import { useEffect, useState } from "react";

import Button from "components/Button";
import ButtonGroup from "components/ButtonGroup";
import ErrorNotation from "components/ErrorNotation";
import Footer from "components/Footer";
import Header from "components/Header";
import Hero from "components/Hero";
import Modal from "components/Modal";
import ModalForm from "components/ModalForm";
import Stage from "components/Stage";

import useFormState from "hooks/useFormState";

const Home = () => {
  let [showModal, setShowModal] = useState(false);
  let [setField, submitForm, resetForm, formState, formData] = useFormState();

  // Close modal when we transition back into a pending state
  useEffect(() => {
    if (formState == "Reset") {
      setShowModal(false);
    }
  }, [formState]);

  // Handle escape keypress
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          setShowModal(false);
        }
      },
      false
    );
  }, []);

  // Handle enter keypress
  const onEnter = (key) => {
    if (key === "Enter" && formData.submittable) {
      submitForm();
    }
  };

  return (
    <Stage>
      <Header>Something</Header>
      <Hero>
        <h1>A better way to enjoy every day.</h1>
        <h2>Be the first to know when we launch.</h2>

        <Button
          working={false}
          onClick={() => setShowModal(true)}
          autoFocus={true}
        >
          Request an Invite
        </Button>
      </Hero>
      <Footer />

      {showModal ? (
        <Modal onDismiss={() => resetForm()}>
          {formState === "Submitted" ? (
            <div>
              <h2>All done!</h2>
              <p>
                You will be sent an invite to register for Broccoli & Co after
                we launch.
              </p>
              <Button onClick={() => resetForm()} autoFocus={true}>
                Done
              </Button>
            </div>
          ) : null}

          {formState !== "Submitted" ? (
            <ModalForm name={"Request an Invite"}>
              <label>
                <span>Full Name</span>
                <input
                  name="name"
                  autoFocus={true}
                  value={formData.name}
                  disabled={formState === "Loading"}
                  onChange={(e) => setField("name", e.target.value)}
                  onKeyPress={(e) => onEnter(e.key)}
                />
                {formData.nameError ? (
                  <ErrorNotation>{formData.nameError}</ErrorNotation>
                ) : null}
              </label>

              <label>
                <span>Email</span>
                <input
                  name="email"
                  value={formData.email}
                  disabled={formState === "Loading"}
                  onChange={(e) => setField("email", e.target.value)}
                  onKeyPress={(e) => onEnter(e.key)}
                />
                {formData.emailError ? (
                  <ErrorNotation>{formData.emailError}</ErrorNotation>
                ) : null}
              </label>

              <label>
                <span>Confirm Email</span>
                <input
                  name="confirm_email"
                  value={formData.confirm}
                  disabled={formState === "Loading"}
                  onChange={(e) => setField("confirm", e.target.value)}
                  onKeyPress={(e) => onEnter(e.key)}
                />
                {formData.confirmError ? (
                  <ErrorNotation>{formData.confirmError}</ErrorNotation>
                ) : null}
              </label>

              {formState !== "Error" ? (
                <Button
                  disabled={!formData.submittable}
                  working={formState === "Loading"}
                  onClick={() => submitForm()}
                >
                  Send Request
                </Button>
              ) : null}

              {formState === "Error" ? (
                <>
                  <ErrorNotation>
                    Error submitting invite request...
                  </ErrorNotation>
                  <ButtonGroup>
                    <Button onClick={() => submitForm()} autoFocus={true}>
                      Retry
                    </Button>
                    <Button onClick={() => resetForm()}>Cancel</Button>
                  </ButtonGroup>
                </>
              ) : null}
            </ModalForm>
          ) : null}
        </Modal>
      ) : null}
    </Stage>
  );
};

export default Home;
