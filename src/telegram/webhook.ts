import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import { Service, Inject } from 'typedi';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import * as T from './index';
import { Message, CallbackQuery } from './updates';
import { toCamelCase } from './helpers';

interface IClassConstructor<T> {
  new(...args: any[]): T;
}

interface IUpdate {
  type: Function;
  data: any;
}

export interface WebhookConfig {
  path: string;
  port: number;
}

@Service()
export class Webhook {

  @Inject('config.webhook') private config: WebhookConfig = {
    path: 'webhook',
    port: 3000,
  };

  private app: express.Application = express();
  private updates = new Subject<IUpdate>();

  constructor(private api: T.Api) { }

  private dispatch<I>(instance: I): void {
    this.updates.next({
      type: instance.constructor,
      data: instance,
    });
  }

  public of<I>(type: IClassConstructor<I>): Observable<I> {
    return this.updates.pipe(
      filter(update => update.type === type),
      map(update => update.data),
    );
  }

  public async run() {
    this.app.post(this.config.path, bodyParser.json(), (req, res) => {
      res.status(200).end();

      const update = toCamelCase(req.body) as T.Update;

      if ('message' in update && update.message !== undefined) {
        this.dispatch(new Message(this.api, update.message));
      }

      if ('callbackQuery' in update && update.callbackQuery !== undefined) {
        this.dispatch(new CallbackQuery(this.api, update.callbackQuery));
      }

    });

    this.app.all(this.config.path, (req, res) => {
      res.status(404).end();
    });

    await this.app.listen(this.config.port);
  }

}
