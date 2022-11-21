import { Overwrite } from "tsbuffer-schema";
import { BaseConnectionFlows, BaseServiceType, Flow, SendDataFlow } from "tsrpc-base";
import { BaseServer } from "./BaseServer";
import { BaseServerConnection } from "./BaseServerConnection";

export type BaseServerFlows<Conn extends BaseServerConnection<ServiceType>, ServiceType extends BaseServiceType> = Overwrite<BaseConnectionFlows<Conn>, {
    preBroadcastMsgFlow: Flow<BroadcastMsgFlow<Conn, ServiceType>>,
    preSendDataFlow: Flow<SendDataFlow<Conn> & {
        /** When `server.broadcastMsg()`, preSendDataFlow would only run once, with this param. (`conn` would be `conns[0]`) */
        readonly conns: Conn[]
    }>,
    postSendDataFlow: Flow<SendDataFlow<Conn> & {
        /** When `server.broadcastMsg()`, postSendDataFlow would only run once, with this param. (`conn` would be `conns[0]`) */
        readonly conns: Conn[]
    }>,

    /** @deprecated Use `preRecvDataFlow` instead */
    preRecvBufferFlow?: never,
    /** @deprecated Use `preSendDataFlow` instead */
    preSendBufferFlow?: never,
    /** @deprecated Use `preApiCallReturnFlow` instead */
    preApiReturnFlow?: never,
    /** @deprecated Use `postApiCallReturnFlow` instead */
    postApiReturnFlow?: never,
    /** @deprecated Use `postApiCallReturnFlow` instead */
    postApiCallFlow?: never,
    /** @deprecated Use `preRecvMsgFlow` instead */
    preMsgCallFlow?: never,
    /** @deprecated Use `onMsg` instead */
    postMsgCallFlow?: never,
    /** @deprecated Use `postSendDataFlow` instead */
    postSendMsgFlow?: never,
}>;

export type BroadcastMsgFlow<Conn extends BaseServerConnection<any>, ServiceType extends BaseServiceType> = {
    [K in keyof ServiceType['msg']]: {
        msgName: K & string,
        msg: ServiceType['msg'][K],
        readonly conns: Conn[],
    }
}[keyof ServiceType['msg']];