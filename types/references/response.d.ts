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
  type:
    | "VALIDATION"
    | "RECAPTCHA"
    | "UNKNOWN"
    | "EMAIL"
    | "NOT_FOUND"
    | "UNAUTHORIZED"
    | "CONFLICT";
  errors?: NIVErrorRes | RecaptchaErrors;
}

interface JSONResponse {
  data: Array<{
    id: string;
    type: "project" | "user";
    attributes: {
      [key: string]: any;
    };
  }>;
  meta?: {
    [key: string]: any;
  };
  links?: {
    self?: string;
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
  };
}
