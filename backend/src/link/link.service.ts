import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CreateLinkDto } from './dto/create-link.dto';
import * as dotenv from 'dotenv';

dotenv.config();

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

export interface LinkResponse {
  success: boolean;
  link: string;
}

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);
  private readonly ZAPIER_HOOK = process.env.ZAPIER_WEBHOOK_URL;
  private readonly COUNTRY_CODE = '55';

  normalizePhone(phone: string): string {
    if (!phone) throw new BadRequestException('Telefone é obrigatório');

    let digitsOnly = phone.replace(/\D/g, '');
    digitsOnly = digitsOnly.replace(/^0+/, '');

    this.logger.debug(`Telefone original: ${phone}, Processado: ${digitsOnly}`);

    if (digitsOnly.length === 12 || digitsOnly.length === 13) {
      if (digitsOnly.startsWith('55')) {
        return digitsOnly;
      }
      throw new BadRequestException('Número internacional deve começar com 55');
    }

    if (digitsOnly.length === 10 || digitsOnly.length === 11) {
      return '55' + digitsOnly;
    }

    throw new BadRequestException(
      `Formato inválido. Use: (DDD) + número com 8 ou 9 dígitos. Recebido: ${digitsOnly} (${digitsOnly.length} dígitos)`,
    );
  }

  async generateLink(dto: CreateLinkDto): Promise<LinkResponse> {
    const { name, phone, message, role } = dto;

    if (!name || name.trim().length < 2) {
      throw new BadRequestException('Nome inválido');
    }

    if (!VALID_ROLES.includes(role)) {
      throw new BadRequestException('Cargo inválido');
    }

    if (!message || !message.trim()) {
      throw new BadRequestException('Mensagem não pode ser vazia');
    }

    const international = this.normalizePhone(phone);
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${international}?text=${encodedMessage}`;

    try {
      await axios.post(this.ZAPIER_HOOK!, {
        ...dto,
        phone: international,
        link,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.logger.warn(`Falha ao enviar dados para Zapier: ${err.message}`);
      } else {
        this.logger.warn(
          'Falha ao enviar dados para Zapier: erro desconhecido',
        );
      }
    }

    return { success: true, link };
  }
}
