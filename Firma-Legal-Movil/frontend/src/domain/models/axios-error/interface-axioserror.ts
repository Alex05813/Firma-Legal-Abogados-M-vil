export interface AxiosError {
    message: string;
    response?: {
      data: any;
      status: number;
    };
  }