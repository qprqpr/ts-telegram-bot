import * as T from '../';

import { Message } from './Message';

const parseQuery = (data: string) => {
  const [method, ...args] = data.split(':');
  return { method, args };
}

export class CallbackQuery {

  public readonly id: string;
  public readonly data: string;

  public readonly method: string;
  public readonly args: string[];

  public readonly userId: number;
  public readonly chatId: number | null = null;

  public readonly message: Message | null = null;

  constructor(private api: T.Api, raw: T.CallbackQuery) {
    this.id = raw.id;
    this.data = raw.data || '';

    const { method, args } = parseQuery(this.data);

    this.method = method;
    this.args = args;

    if (raw.message) {
      this.message = new Message(this.api, raw.message);
      this.chatId = this.message.chatId;
    }

    this.userId = raw.from.id;
  }

  public async answer() {
    return await this.api.answerCallbackQuery(this.id);
  }

  public async reply(text: string, markup?: T.ReplyMarkup, opts?: T.SendMessageOpts) {
    if (this.message) {
      return await this.message.reply(text, markup, opts);
    }
  }

  public async edit(text: string, markup?: T.InlineKeyboard, opts?: T.EditMessageTextOpts) {
    if (this.message) {
      return await this.message.edit(text, markup, opts);
    }
  }

}
