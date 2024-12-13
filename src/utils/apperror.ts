export default class AppError extends Error {
  public statuscode: number;
  public status: string;
  public isoperational: boolean;

  constructor(message: string, statuscode: number) {
    super(message);
    this.statuscode = statuscode;
    this.status = `${statuscode}`.startsWith("4") ? "fail" : "error";
    this.isoperational = true;

    // Ensure the prototype chain is correctly set up
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
