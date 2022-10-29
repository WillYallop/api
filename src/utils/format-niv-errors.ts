interface NIVErrors {
  [key: string]:
    | {
        rule: string;
        message: string;
      }
    | Array<{
        rule: string;
        message: string;
      }>;
}

const formatNIVErrors = (errors: NIVErrors): NIVErrorRes => {
  const formattedErrors: NIVErrorRes = {};
  for (const key in errors) {
    const err = errors[key];
    if (Array.isArray(errors[key])) {
      formattedErrors[key] = err as Array<{
        rule: string;
        message: string;
      }>;
    } else {
      formattedErrors[key] = [
        err as {
          rule: string;
          message: string;
        },
      ];
    }
  }
  return formattedErrors;
};
export default formatNIVErrors;
