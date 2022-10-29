const verifySite = async (token: string, secret: string) => {
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  const response = await fetch(url, {
    body: formData,
    method: "POST",
  });
  const data = await response.json();
  if (data.success) {
    return {
      success: true,
    };
  } else {
    return {
      success: false,
      errors: data["error-codes"] as RecaptchaErrors,
    };
  }
};
export default verifySite;
