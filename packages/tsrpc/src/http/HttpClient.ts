import http from 'http';
import https from 'https';
import { BaseServiceType, ServiceProto } from 'tsrpc-base';
import {
  BaseHttpClient,
  BaseHttpClientOptions,
  defaultBaseHttpClientOptions,
} from 'tsrpc-base-client';
import { defaultBaseNodeClientOptions } from '../models/BaseNodeClientOptions';
import { getClassObjectId } from '../models/getClassObjectId';
import { TSRPC_VERSION } from '../models/version';
import { HttpUtil } from './models/HttpUtil';

export class HttpClient<
  ServiceType extends BaseServiceType = any
> extends BaseHttpClient<ServiceType> {
  declare options: HttpClientOptions;

  constructor(
    proto: ServiceProto<ServiceType>,
    options?: Partial<HttpClientOptions>
  ) {
    super(
      proto,
      {
        ...defaultHttpClientOptions,
        ...options,
      },
      {
        classObjectId: getClassObjectId(),
        env: {
          tsrpc: TSRPC_VERSION,
          node: process.version,
        },
        request: (v) => HttpUtil.request(v, this.options.agent),
      }
    );
  }
}

export const defaultHttpClientOptions: BaseHttpClientOptions = {
  ...defaultBaseHttpClientOptions,
  ...defaultBaseNodeClientOptions,
};

export interface HttpClientOptions extends BaseHttpClientOptions {
  /** NodeJS HTTP Agent */
  agent?: http.Agent | https.Agent;
}
