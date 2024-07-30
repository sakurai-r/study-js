export function isEmailAddress(email) {
  if (!email) {
    return false;
  }

  if (email.length < 1 || email.length > 254) {
    return false;
  }

  const [localPart, domain] = email.split("@");

  // local-part と domain が存在し、各々の長さが範囲内であることを確認
  if (!localPart || !domain || localPart.length > 64 || domain.length > 253) {
    return false;
  }

  // '.' が 2 つ以上続く場合は無効
  const consecutiveDots = /[.]{2}/u;
  if (consecutiveDots.test(email)) {
    return false;
  }

  // local-part または domain の前後に '.' がある場合は無効
  const edgeDots = /^[.]|[.]@|@[.]|[.]$/u;
  if (edgeDots.test(email)) {
    return false;
  }

  // 許可されている文字:
  // アルファベット (大文字 & 小文字) A~Z, a~z
  // 数字 0~9
  // 記号 19 種類 !#$%&'*+-/=?^_`{|}~.
  const validChars =
    /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/u;
  if (!validChars.test(email)) {
    return false;
  }

  return true;
}
