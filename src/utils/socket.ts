import { io } from "socket.io-client";
import { API_URL } from "./api-url";

export const socket = io(API_URL);
