export class AppResponse {
  static Ok(data: any | null, message: string) {
    return {
      data,
      message,
      success: true,
    };
  }
}
