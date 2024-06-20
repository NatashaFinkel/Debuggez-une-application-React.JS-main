import { useCallback, useState } from "react";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

// eslint-disable-next-line react/prop-types
const Form = ({ onSuccess = () => null, onError = () => null }) => {
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(false);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        onSuccess();
        setSending(true);
       setTimeout(() => {
          setSending(false);
        }, 500); 
      } catch (err) {
        setSending("error");
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
            <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
              {sending ? "En cours" : "Envoyer"}
            </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};
export default Form;
