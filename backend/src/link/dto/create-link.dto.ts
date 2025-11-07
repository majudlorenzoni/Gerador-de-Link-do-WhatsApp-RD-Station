import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'O nome deve ter pelo menos 2 caracteres.' })
  name: string;

  @Matches(/^\(?\d{2}\)? ?\d{4,5}-?\d{4}$/, {
    message: 'Invalid phone format',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'A mensagem não pode estar vazia.' })
  message: string;

  @IsString()
  @IsNotEmpty({ message: 'O cargo é obrigatório.' })
  role: string;
}
