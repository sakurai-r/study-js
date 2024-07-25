export const isEmailAddress = (email: string | null | undefined) => {
  if (!email) {
    return false;
  }

  if (email.length > 256) {
    return false;
  }

  const spaceRegex = /\s/;

  if (spaceRegex.test(email)) {
    return false;
  }

  const emailRegex =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  const [localPart, domainPart] = email.split("@");

  console.log(localPart);
  console.log(domainPart);

  if (localPart.length > 64 || domainPart.length > 255) {
    return false;
  }

  return true;
};
