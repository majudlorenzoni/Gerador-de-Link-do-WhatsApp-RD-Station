import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';

const VALID_ROLES = [
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
];

@Injectable()
export class LinkService {
  async generateLink(dto: CreateLinkDto) {
    const { name, phone, message, role } = dto;

    if (!name || name.trim().length < 2) {
      throw new BadRequestException('Nome inválido');
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      throw new BadRequestException('Telefone inválido');
    }

    if (!message) {
      throw new BadRequestException('Mensagem não pode ser vazia');
    }

    if (!VALID_ROLES.includes(role)) {
      throw new BadRequestException('Cargo inválido');
    }

    const link = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    return { success: true, link };
  }
}
