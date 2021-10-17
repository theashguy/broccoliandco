import { useState } from "react";

import Header from "components/Header";
import Hero from "components/Hero";
import Footer from "components/Footer";
import Stage from "components/Stage";
import Button from "components/Button";
import Modal from "components/Modal";
import ModalForm from "components/ModalForm";

const Home = () => {
  let [showModal, setShowModal] = useState(false);

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
        <Modal onDismiss={() => setShowModal(false)}>
          <ModalForm name={"Request an Invite"}>
            <label>
              <span>Full Name</span>
              <input name="name" autoFocus={true} />
            </label>

            <label>
              <span>Email</span>
              <input name="email" />
            </label>

            <label>
              <span>Confirm Email</span>
              <input name="confirm_email" />
            </label>

            <Button working={false} onClick={() => setShowModal(true)}>
              Send Request
            </Button>
          </ModalForm>
        </Modal>
      ) : null}
    </Stage>
  );
};

export default Home;
