class ValidationError extends Error {
  field: string;
  constructor(message: string, field: string) {
    super(`Validation error: ${message}`);
    this.field = field;
  }

  get name() {
    return "ValidationError";
  }
}

let error = new ValidationError("Invalid email address", "email");
console.log(error.message); // -> "Validation error: Invalid email address"
console.log(error.field); // -> "email"
console.log(error.name); // > "ValidationError"
