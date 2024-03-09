import { WebSocketServer } from "ws";


/**
 * Websocket instance
 * Primary Goal: Creates an instance of a websocket server
 */


export const wss = new WebSocketServer({ noServer: true });