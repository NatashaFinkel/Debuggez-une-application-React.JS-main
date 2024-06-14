import { useCallback, useState } from "react";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

// eslint-disable-next-line react/prop-types
const Form = ({ onSuccess = () => null, onError = () => null }) => {
  const [sending, setSending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      // eslint-disable-next-line no-alert
      setFeedbackMessage("Message envoyé !");
      setSending(true);

      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
      } catch (err) {
        setSending(false);
        onError(err);
      }finally{
        setTimeout(() => {
          setFeedbackMessage('');
        }, 300);
      }
    },
    [onSuccess, onError]
  );

  return (
    <div>

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
            <div className="submitBtn-and-feedback">
              <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
                {sending ? "En cours" : "Envoyer"}
              </Button>
              {feedbackMessage && (
                <div className="feedback-message">
                  {feedbackMessage}
                </div>
              )}
            </div>
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
    </div>
  );
};
export default Form;
