import 'reflect-metadata';
import fetch from 'node-fetch';
import { Service, Inject } from 'typedi';

import * as T from './index';
import { toSnakeCase } from './helpers';

export interface ApiConfig {
  token: string;
}

@Service()
export class Api {

  @Inject('config.api') private config: ApiConfig = {
    token: '',
  };

  private url(method: string): string {
    return `https://api.telegram.org/bot${this.config.token}/${method}`;
  }

  private async request(method: string, payload: any = {}): Promise<any> {
    const response = await fetch(this.url(method), {
      method: 'POST',
      body: JSON.stringify(toSnakeCase(payload)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    if (data && data.ok) {
      return data.result;
    }

    throw `${data.error_code} ${data.description}`;
  }

  // Available methods

  public async getMe() {
    return await this.request('getMe');
  }

  public async sendMessage(
    chatId: T.ChatId,
    text: string,
    opts?: T.SendMessageOpts,
  ) {
    return await this.request('sendMessage', { chatId, text, ...opts });
  }

  public async forwardMessage(
    chatId: T.ChatId,
    fromChatId: T.ChatId,
    messageId: number,
    opts?: T.ForwardMessageOpts,
  ) {
    return await this.request('forwardMessage', { chatId, fromChatId, messageId, ...opts });
  }

  public async sendPhoto(
    chatId: T.ChatId,
    photo: string,
    opts?: T.SendPhotoOpts,
  ) {
    return await this.request('sendPhoto', { chatId, photo, ...opts });
  }

  public async sendAudio(
    chatId: T.ChatId,
    audio: string,
    opts?: T.SendAudioOpts,
  ) {
    return await this.request('sendAudio', { chatId, audio, ...opts });
  }

  public async sendDocument(
    chatId: T.ChatId,
    document: string,
    opts?: T.SendDocumentOpts,
  ) {
    return await this.request('sendDocument', { chatId, document, ...opts });
  }

  public async sendSticker(
    chatId: T.ChatId,
    sticker: string,
    opts?: T.SendStickerOpts,
  ) {
    return await this.request('sendSticker', { chatId, sticker, ...opts });
  }

  public async sendVideo(
    chatId: T.ChatId,
    video: string,
    opts?: T.SendVideoOpts,
  ) {
    return await this.request('sendVideo', { chatId, video, ...opts });
  }

  public async sendVoice(
    chatId: T.ChatId,
    voice: string,
    opts?: T.SendVoiceOpts,
  ) {
    return await this.request('sendVoice', { chatId, voice, ...opts });
  }

  public async sendLocation(
    chatId: T.ChatId,
    latitude: number,
    longitude: number,
    opts?: T.SendLocationOpts,
  ) {
    return await this.request('sendLocation', { chatId, latitude, longitude, ...opts });
  }

  public async sendVenue(
    chatId: T.ChatId,
    latitude: number,
    longitude: number,
    title: string,
    address: string,
    opts?: T.SendVenueOpts,
  ) {
    return await this.request('sendVenue', { chatId, latitude, longitude, title, address, ...opts });
  }

  public async sendContact(
    chatId: T.ChatId,
    phoneNumber: number,
    firstName: number,
    opts?: T.SendContactOpts,
  ) {
    return await this.request('sendContact', { chatId, phoneNumber, firstName, ...opts });
  }

  public async sendChatAction(
    chatId: T.ChatId,
    action: T.ChatActions,
  ) {
    return await this.request('sendChatAction', { chatId, action });
  }

  public async getUserProfilePhotos(
    userId: number,
    opts?: T.GetUserProfilePhotosOpts,
  ) {
    return await this.request('getUserProfilePhotos', { userId, ...opts });
  }

  public async getFile(
    fileId: number,
  ) {
    return await this.request('getFile', { fileId });
  }

  public async answerCallbackQuery(
    callbackQueryId: string,
    opts?: T.AnswerInlineQuery,
  ) {
    return await this.request('answerCallbackQuery', { callbackQueryId, ...opts });
  }

  // Updating messages

  public async editMessageText(
    chatId: T.ChatId,
    messageId: number,
    text: string,
    opts?: T.EditMessageTextOpts,
  ) {
    return await this.request('editMessageText', { chatId, messageId, text, ...opts });
  }

  public async editMessageCaption(
    chatId: T.ChatId,
    messageId: number,
    caption: string,
    opts?: T.EditMessageCaptionOpts,
  ) {
    return await this.request('editMessageCaption', { chatId, messageId, caption, ...opts });
  }

  public async editMessageReplyMarkup(
    chatId: number,
    messageId: number,
    opts?: Partial<T.EditMessageReplyMarkupOpts>,
  ) {
    return await this.request('editMessageReplyMarkup', { chatId, messageId, ...opts });
  }

}
