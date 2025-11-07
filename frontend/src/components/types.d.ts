export interface CreateLinkDto {
  name: string;
  phone: string;
  message: string;
  role: string;
}

export interface LinkResponse {
  success: boolean;
  link: string;
}
