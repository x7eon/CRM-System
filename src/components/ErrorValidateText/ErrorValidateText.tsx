import "./ErrorValidateText.scss";

interface ErrorValidateProps {
  errorValidateText: string;
  errorTextRef: React.RefObject<HTMLSpanElement | null>;
  styles?: React.CSSProperties;
  isValid: boolean;
}

function ErrorValidateText(props: ErrorValidateProps) {
  const { errorValidateText, errorTextRef, styles, isValid } = props;

  return (
    <div className="errorContainer" style={styles}>
      <span
        className={isValid ? "errorText" : "errorText errorText-visible"}
        ref={errorTextRef}
      >
        {errorValidateText}
      </span>
    </div>
  );
}

export default ErrorValidateText;
