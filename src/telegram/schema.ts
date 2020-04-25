
export interface Update {
  updateId: number;
  message?: Message;
  editedMessage?: Message;
  channelPost?: Message;
  editedChannelPost?: Message;
  inlineQuery?: InlineQuery;
  chosenInlineResult?: ChosenInlineResult;
  callbackQuery?: CallbackQuery;
  shippingQuery?: ShippingQuery;
  preCheckoutQuery?: PreCheckoutQuery;
}

export interface User {
  id: number;
  isBot: boolean;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
}

export interface Chat {
  id: number;
  type: string;
  title?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  allMembersAreAdministrators?: boolean;
  photo?: ChatPhoto;
  description?: string;
  inviteLink?: string;
  pinnedMessage?: Message;
  stickerSetName?: string;
  canSetStickerSet?: boolean;
}

export interface Message {
  messageId: number;
  from?: User;
  date: number;
  chat: Chat;
  forwardFrom?: User;
  forwardFromChat?: Chat;
  forwardFromnumber?: number;
  forwardSignature?: string;
  forwardDate?: number;
  replyToMessage?: Message;
  editDate?: number;
  mediaGroupId?: string;
  authorSignature?: string;
  text?: string;
  entities?: MessageEntity[];
  captionEntities?: MessageEntity[];
  audio?: Audio;
  document?: Document;
  game?: Game;
  photo?: Photo;
  sticker?: Sticker;
  video?: Video;
  voice?: Voice;
  videoNote?: VideoNote;
  caption?: string;
  contact?: Contact;
  location?: Location;
  venue?: Venue;
  newChatMembers?: User[];
  leftChatMember?: User;
  newChatTitle?: string;
  newChatPhoto?: Photo;
  deleteChatPhoto?: boolean;
  groupChatCreated?: boolean;
  supergroupChatCreated?: boolean;
  channelChatCreated?: boolean;
  migrateToChatId?: number;
  migrateFromChatId?: number;
  pinnedMessage?: Message;
  invoice?: Invoice;
  successfulPayment?: SuccessfulPayment;
}

export interface MessageEntity {
  type: string;
  offset: number;
  length: number;
  url?: string;
  user?: User;
}

export type Photo = PhotoSize[];

export interface PhotoSize {
  fileId: string;
  width: number;
  height: number;
  fileSize?: number;
}

export interface Audio {
  fileId: string;
  duration: number;
  performer?: string;
  title?: string;
  mimeType?: string;
  fileSize?: number;
}

export interface Document {
  fileId: string;
  thumb?: PhotoSize;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export interface Video {
  fileId: string;
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  mimeType?: string;
  fileSize?: number;
}

export interface Voice {
  fileId: string;
  duration: number;
  mimeType?: string;
  fileSize?: number;
}

export interface VideoNote {
  fileId: string;
  length: number;
  duration: number;
  thumb?: PhotoSize;
  fileSize?: number;
}

export interface Contact {
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  userId?: number;
}

export interface Location {
  longitude: number;
  latitude: number;
}

export interface Venue {
  location: Location;
  title: string;
  address: string;
  foursquareId?: string;
}

export interface UserProfilePhotos {
  totalCount: number;
  photos: Photo[];
}

export interface File {
  fileId: string;
  fileSize?: number;
  filePath?: string;
}

export interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[][];
  resizeKeyboard?: boolean;
  oneTimeKeyboard?: boolean;
  selective?: boolean;
}

export interface KeyboardButton {
  text: string;
  requestContact?: boolean;
  requestLocation?: boolean;
}

export interface ReplyKeyboardHide {
  removeKeyboard: boolean;
  selective?: boolean;
}

export interface InlineKeyboard {
  inlineKeyboard: InlineKeyboardButton[][];
}

export interface InlineKeyboardButton {
  text: string;
  url?: string;
  callbackData?: string;
  switchInlineQuery?: string;
  switchInlineQueryCurrentChat?: string;
  callbackGame?: CallbackGame;
  pay?: boolean;
}

export interface CallbackQuery {
  id: string;
  from: User;
  message?: Message;
  inlineMessageId?: string;
  chatInstance: string;
  data?: string;
  gameShortName?: string;
}

export interface ForceReply {
  forceReply: boolean;
  selective?: boolean;
}

export interface ChatPhoto {
  smallFileId: string;
  bigFileId: string;
}

export interface ChatMember {
  user: User;
  status: string;
  untilDate?: number;
  canBeEdited?: boolean;
  canChangeInfo?: boolean;
  canPostMessages?: boolean;
  canEditMessages?: boolean;
  canDeleteMessages?: boolean;
  canInviteUsers?: boolean;
  canRestrictMembers?: boolean;
  canPinMessages?: boolean;
  canPromoteMembers?: boolean;
  canSendMessages?: boolean;
  canSendMediaMessages?: boolean;
  canSendOtherMessages?: boolean;
  canAddWebPagePreviews?: boolean;
}

export interface ResponseParameters {
  migrateToChatId?: number;
  retryAfter?: number;
}

export interface InputMedia { }

export interface InputMediaPhoto {
  type: string;
  media: string;
  caption?: string;
}

export interface InputMediaVideo {
  type: string;
  media: string;
  caption?: string;
  width?: number;
  height?: number;
  duration?: number;
}

export interface Sticker {
  fileId: string;
  width: number;
  height: number;
  thumb?: PhotoSize;
  emoji?: string;
  setName?: string;
  maskPosition?: MaskPosition;
  fileSize?: number;
}

export interface StickerSet {
  name: string;
  title: string;
  containsMasks: boolean;
  stickers: Sticker[];
}

export interface MaskPosition {
  point: string;
  xShift: number;
  yShift: number;
  scale: number;
}

export interface InlineQuery {
  id: string;
  from: User;
  location?: Location;
  query: string;
  offset: string;
}

export interface AnswerInlineQuery {
  results?: InlineQueryResult[];
  cacheTime?: number;
  isPersonal?: boolean;
  nextOffset?: string;
  switchPmText?: string;
  switchPmParameter?: string;
}

export type InlineQueryResult = any;

export interface ChosenInlineResult {
  resultId: string;
  from: User;
  location?: Location;
  inlineMessageId?: string;
  query: string;
}

export interface LabeledPrice {
  label: string;
  amount: number;
}

export interface Invoice {
  title: string;
  description: string;
  startParameter: string;
  currency: string;
  totalAmount: number;
}

export interface ShippingAddress {
  countryCode: string;
  state: string;
  city: string;
  streetLine1: string;
  streetLine2: string;
  postCode: string;
}

export interface OrderInfo {
  name?: string;
  phoneNumber?: string;
  email?: string;
  shippingAddress?: ShippingAddress;
}

export interface ShippingOption {
  id: string;
  title: string;
  prices: LabeledPrice[];
}

export interface SuccessfulPayment {
  currency: string;
  totalAmount: number;
  invoicePayload: string;
  shippingOptionId?: string;
  orderInfo?: OrderInfo;
  telegramPaymentChargeId: string;
  providerPaymentChargeId: string;
}

export interface ShippingQuery {
  id: string;
  from: User;
  invoicePayload: string;
  shippingAddress: ShippingAddress;
}

export interface PreCheckoutQuery {
  id: string;
  from: User;
  currency: string;
  totalAmount: number;
  invoicePayload: string;
  shippingOptionId?: string;
  orderInfo?: OrderInfo;
}

export interface Game {
  title: string;
  description: string;
  photo: Photo;
  text?: string;
  textEntities?: MessageEntity[];
  animation?: Animation;
}

export interface Animation {
  fileId: string;
  thumb?: PhotoSize;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export type CallbackGame = any;

export interface GameHighScore {
  position: number;
  user: User;
  score: number;
}

export type ReplyMarkup = InlineKeyboard | ReplyKeyboardMarkup | ReplyKeyboardHide | ForceReply;

export enum ParseMode {
  Markdown = 'Markdown',
  HTML = 'HTML',
}

export enum ChatActions {
  Typing = 'typing',
  UploadPhoto = 'upload_photo',
  RecordVideo = 'record_video',
  UploadVideo = 'upload_video',
  RecordAudio = 'record_audio',
  UploadAudio = 'upload_audio',
  UploadDocument = 'upload_document',
  FindLocation = 'find_location',
}

export type ChatId = number | string;

export interface SendMessageOpts {
  parseMode?: ParseMode;
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface ForwardMessageOpts {
  disableNotification?: boolean;
}

export interface SendPhotoOpts {
  caption?: string;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface SendAudioOpts {
  caption?: number;
  duration?: number;
  performer?: string;
  title?: string;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface SendDocumentOpts {
  caption?: string;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface SendStickerOpts {
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface SendVideoOpts {
  duration?: number;
  width?: number;
  height?: number;
  caption?: string;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface SendVoiceOpts {
  caption?: number;
  duration?: number;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface SendLocationOpts {
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface SendVenueOpts {
  foursquareId?: string;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface SendContactOpts {
  lastName?: string;
  disableNotification?: boolean;
  replyToMessageId?: number;
  replyMarkup?: ReplyMarkup;
}

export interface GetUserProfilePhotosOpts {
  offset?: number;
  limit?: number;
}

export interface EditMessageTextOpts {
  parseMode?: ParseMode;
  inlineMessageId?: string;
  disableWebPagePreview?: boolean;
  replyMarkup?: InlineKeyboard;
}

export interface EditMessageCaptionOpts {
  inlineMessageId?: string;
  replyMarkup?: InlineKeyboard;
}

export interface EditMessageReplyMarkupOpts {
  chatId: ChatId;
  messageId: number;
  inlineMessageId?: string;
  replyMarkup?: InlineKeyboard;
}
