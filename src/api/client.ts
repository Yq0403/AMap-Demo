import axios from "axios";

export const client = axios.create({
  baseURL: "/api",
});

export class HTTPError extends Error {
  public status: number;

  constructor(message?: string, status?: number) {
    super(message || "系统异常，请稍后重试");
    this.status = status || 500;
  }
}
