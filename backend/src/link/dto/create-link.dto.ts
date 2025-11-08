import {
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsIn,
} from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  name: string;

  @IsString()
  @Matches(/^(\(\d{2}\)\s\d{4,5}-\d{4}|\d{10,11})$/, {
    message: 'Telefone inválido. Use: (99) 99999-9999 ou 99999999999',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Mensagem não pode ser vazia' })
  message: string;

  @IsString()
  @IsIn(
    [
      'Sócio(a) / CEO / Proprietário(a)',
      'Diretor(a) de Vendas',
      'Diretor(a) de Marketing',
      'Diretor(a) Outras Áreas',
      'Gerente de Marketing',
      'Gerente de Vendas',
      'Coordenador(a)/Supervisor(a) de Marketing',
      'Coordenador(a)/Supervisor(a) de Vendas',
      'Analista/Assistente de Marketing',
      'Analista/Assistente de Vendas',
      'Vendedor(a) / Executivo(a) de Contas',
      'Estudante',
      'Outros Cargos',
    ],
    { message: 'Cargo inválido' },
  )
  role: string;
}
