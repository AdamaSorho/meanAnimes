export class Response {
  #error!: boolean;
  #message!: string;
  #statusCode!: number;
  #data!: any;

  get error() { return this.#error; }
  get message() { return this.#message; }
  get statusCode() { return this.#statusCode; }
  get data() { return this.#data; }

  set error(error: boolean) { this.#error = error; }
  set message(message: string) { this.#message = message; }
  set statusCode(statusCode: number) { this.#statusCode = statusCode; }
  set data(data: any) { this.#data = data; }

  constructor(error: boolean, message: string, statusCode: number, data: any) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}