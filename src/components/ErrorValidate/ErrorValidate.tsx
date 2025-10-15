import "./ErrorValidate.scss";

interface ErrorValidateProps {
  validateErrorText: string;
  errorTextRef: React.RefObject<HTMLSpanElement | null>;
  marginLeftValue?: number;
}

function ErrorValidate(props: ErrorValidateProps) {
  const { validateErrorText, errorTextRef, marginLeftValue } = props;
  return (
    <div className="errorContainer" style={{ marginLeft: marginLeftValue }}>
      <span className="errorText" ref={errorTextRef}>
        {validateErrorText}
      </span>
    </div>
  );
}

export default ErrorValidate;
