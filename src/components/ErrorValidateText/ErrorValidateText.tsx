import "./ErrorValidateText.scss";

interface ErrorValidateProps {
  validateErrorText: string;
  styles?: React.CSSProperties;
  isValid: boolean;
}

function ErrorValidateText(props: ErrorValidateProps) {
  const { validateErrorText, styles, isValid } = props;

  return (
    <div className="errorContainer" style={styles}>
      <span className={isValid ? "errorText" : "errorText errorText-visible"}>
        {validateErrorText}
      </span>
    </div>
  );
}

export default ErrorValidateText;
