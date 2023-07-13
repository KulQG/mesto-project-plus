export default class InvalidError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
