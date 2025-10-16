import "./ErrorValidateText.scss";

interface ErrorValidateProps {
  errorValidateText: string;
  errorTextRef: React.RefObject<HTMLSpanElement | null>;
  styles?: React.CSSProperties;
}

function ErrorValidateText(props: ErrorValidateProps) {
  const { errorValidateText, errorTextRef, styles } = props;
  return (
    <div className="errorContainer" style={styles}>
      <span className="errorText" ref={errorTextRef}>
        {errorValidateText}
      </span>
    </div>
  );
}

export default ErrorValidateText;
