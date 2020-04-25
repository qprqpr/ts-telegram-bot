import * as T from '../';

// ------ Keyboard ------

export function keyboard(lines: string[][], oneTime: boolean = true, resize: boolean = true): T.ReplyKeyboardMarkup {
  return {
    keyboard: lines.map(line => line.map((text) => {
      return { text };
    })),
    oneTimeKeyboard: oneTime,
    resizeKeyboard: resize,
  };
}

export function hideKeyboard(): T.ReplyKeyboardHide {
  return { removeKeyboard: true };
}

// ------ Inline Keyboard ------

export function iBtns(line: T.InlineKeyboardButton[], size: number = 1): T.InlineKeyboardButton[][] {
  const sets = [];
  const chunks = line.length / size;
  let i = 0;
  while (i < chunks) {
    sets.push(line.splice(0, size));
    i += 1;
  }
  return sets;
}

export function iKeyboard(lines: T.InlineKeyboardButton[][] = []): T.InlineKeyboard {
  return { inlineKeyboard: lines };
}

export function iUrl(text: string, url: string): T.InlineKeyboardButton {
  return { text, url };
}

export function iBtn(text: string, method: string, ...args: string[]): T.InlineKeyboardButton {
  return {
    text,
    callbackData: [method, ...args].join(':'),
  };
}
