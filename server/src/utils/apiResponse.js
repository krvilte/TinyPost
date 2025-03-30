class ApiResponse {
  constructor(statusCode, message = "Success", data = {}) {
    this.message = message;
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default ApiResponse;
