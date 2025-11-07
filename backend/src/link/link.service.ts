import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CreateLinkDto } from './dto/create-link.dto';
import * as dotenv from 'dotenv';

dotenv.config();

export interface LinkResponse {
  success: boolean;
  link: string;
}

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);
  private readonly ZAPIER_HOOK =
    process.env.ZAPIER_WEBHOOK_URL ||
    'https://hooks.zapier.com/hooks/catch/13309391/uie4g8v/';
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
    const { phone, message } = dto;

    const international = this.normalizePhone(phone);

    const encodedMessage = encodeURIComponent(message || '');

    const link = `https://wa.me/${international}?text=${encodedMessage}`;

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
        this.logger.warn('Falha ao enviar dados para Zapier: erro desconhecido');
      }
    }

    return { success: true, link };
  }
}
