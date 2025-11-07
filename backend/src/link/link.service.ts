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
    const digitsOnly = (phone || '').replace(/\D/g, '');
    const cleaned = digitsOnly.replace(/^0+/, '');
    let national = cleaned;

    if (national.startsWith(this.COUNTRY_CODE)) {
      national = national.slice(this.COUNTRY_CODE.length);
    }

    if (!(national.length === 10 || national.length === 11)) {
      throw new BadRequestException(
        'Número de telefone deve conter DDD + 8 ou 9 dígitos (ex: (99) 99999-9999).',
      );
    }

    return `${this.COUNTRY_CODE}${national}`;
  }

  async generateLink(dto: CreateLinkDto): Promise<LinkResponse> {
    const { name, phone, message, role } = dto;

    // VALIDAÇÃO DO NOME
    if (!name || name.trim().length < 2) {
      throw new BadRequestException('Nome inválido');
    }

    // VALIDAÇÃO DO CARGO
    if (!VALID_ROLES.includes(role)) {
      throw new BadRequestException('Cargo inválido');
    }

    // VALIDAÇÃO DA MENSAGEM
    if (!message || !message.trim()) {
      throw new BadRequestException('Mensagem não pode ser vazia');
    }

    // Normaliza telefone
    const international = this.normalizePhone(phone);

    // Cria link
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/${international}?text=${encodedMessage}`;

    // Envia para Zapier (ignora falhas)
    try {
      await axios.post(this.ZAPIER_HOOK, {
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
