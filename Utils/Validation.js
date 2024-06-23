const pattern =
  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

const passwordPattern =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/;

export function EmailValidator(email) {
  const lowerEmail = email.toLowerCase();
  return pattern.test(lowerEmail);
}
export function FullNameValidator(fullName) {
  if (fullName.length >= 2 && fullName.length < 20) {
    return true;
  } else {
    return false;
  }
}

export function PasswordValidator(password) {
  return passwordPattern.test(password);
}
