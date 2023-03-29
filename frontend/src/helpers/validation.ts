export const isCorrectUserName = (userName: string) => {
  if (userName.trim().length === 0) {
    return false;
  }

  const validChars = "1234567890_qwertyuiopasdfghjklzxcvbnm";

  for (const char of userName) {
    if (!validChars.includes(char.toLowerCase())) {
      return false;
    }
  }

  return true;
};

export const isValidTag = (text: string) => {
  if (text.trim().length === 0) {
    return true;
  }

  if (
    (!text.includes(">") && !text.includes("<")) ||
    (text.includes(">") && !text.includes("<")) ||
    (!text.includes(">") && text.includes("<"))
  ) {
    return true;
  }

  const allowedTagsRegex = /<(i|strong|code|a)\b[^>]*>/gi;

  return (
    !/<(?!\/?(i|strong|code|a)\b)[^>]+>/gi.test(text) &&
    allowedTagsRegex.test(text)
  );
};

export const hasAllTagsClosed = (text: string) => {
  if (text.trim().length === 0) {
    return true;
  }

  if (
    (!text.includes(">") && !text.includes("<")) ||
    (text.includes(">") && !text.includes("<")) ||
    (!text.includes(">") && text.includes("<"))
  ) {
    return true;
  }

  const openingTagRegex = /<[^/][^>]*>/g;
  const closingTagRegex = /<\/[^>]*>/g;
  const openingTags = text.match(openingTagRegex);
  const closingTags = text.match(closingTagRegex);

  return (
    openingTags !== null &&
    closingTags !== null &&
    openingTags.length === closingTags.length
  );
};
