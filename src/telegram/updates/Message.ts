import * as T from '../';

import { hideKeyboard, iKeyboard, parseCommand, Command } from '../helpers';

enum MessageTypes {
  Text = 'TEXT',
  Photo = 'PHOTO',
  Other = 'OTHER',
}

export class Message {

  static defaultSendOptions: Partial<T.SendMessageOpts> = {
    parseMode: T.ParseMode.Markdown,
  };

  static defaultEditOptions: Partial<T.EditMessageTextOpts> = {
    parseMode: T.ParseMode.Markdown,
  };

  public readonly id: number;
  public readonly type: MessageTypes;
  public readonly date: number;

  public readonly chatId: number;
  public readonly userId: number | null;

  public readonly text: string | null = null;
  public readonly edited: boolean = false;
  public readonly command: Command | null = null;

  public readonly photo: T.Photo | null = null;

  get isText(): boolean { return this.type === MessageTypes.Text; }
  get isPhoto(): boolean { return this.type === MessageTypes.Photo; }
  get isCommand(): boolean { return this.isText && this.command !== null; }

  constructor(private api: T.Api, raw: T.Message) {
    this.id = raw.messageId;
    this.date = raw.date;

    this.userId = raw.from ? raw.from.id : null;
    this.chatId = raw.chat.id;

    if ('text' in raw) {
      this.type = MessageTypes.Text;
      this.text = raw.text || null;

      if (this.text) {
        this.command = parseCommand(this.text);
      }

    } else if ('photo' in raw) {
      this.type = MessageTypes.Photo;
      this.text = raw.caption || '';
      this.photo = raw.photo || null;

    } else {
      this.type = MessageTypes.Other;
    }
  }

  public async reply(
    text: string,
    markup?: T.ReplyMarkup,
    opts?: T.SendMessageOpts,
  ) {
    return await this.api.sendMessage(this.chatId, text, {
      replyMarkup: markup ? markup : hideKeyboard(),
      ...Message.defaultSendOptions,
      ...opts,
    });
  }

  public async quote(
    text: string,
    markup?: T.ReplyMarkup,
    opts?: T.SendMessageOpts,
  ) {
    return await this.reply(text, markup, {
      replyToMessageId: this.id,
      ...opts,
    });
  }

  public async edit(
    text: string,
    markup?: T.InlineKeyboard,
    opts?: T.EditMessageTextOpts,
  ) {
    return await this.api.editMessageText(this.chatId, this.id, text, {
      replyMarkup: markup ? markup : iKeyboard([]),
      ...Message.defaultEditOptions,
      ...opts,
    });
  }

  public async editMarkup(
    markup?: T.InlineKeyboard,
  ) {
    return await this.api.editMessageReplyMarkup(this.chatId, this.id, {
      replyMarkup: markup,
    });
  }

}
