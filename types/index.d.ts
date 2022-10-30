interface NIVErrorRes {
  [key: string]: Array<{
    rule: string;
    message: string;
  }>;
}
type RecaptchaErrors = Array<string>;

interface ErrorResponse {
  code: number;
  message: string;
  type: "VALIDATION" | "RECAPTCHA" | "UNKNOWN" | "EMAIL";
  errors?: NIVErrorRes | RecaptchaErrors;
}
