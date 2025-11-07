import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { CreateLinkDto } from './dto/create-link.dto';

export interface LinkResponse {
  success: boolean;
  link: string;
}

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);
  private readonly ZAPIER_HOOK =
    'https://hooks.zapier.com/hooks/catch/13309391/uie4g8v/';
  private readonly COUNTRY_CODE = '55';

  /**
   * Gera o link do WhatsApp, tenta postar no Zapier e retorna o link.
   */
  async generateLink(dto: CreateLinkDto): Promise<LinkResponse> {
    const { phone, message } = dto;

    // 1) extrai apenas dígitos
    const digitsOnly = (phone || '').replace(/\D/g, '');

    // 2) Remove leading zeros/spaces (só por segurança)
    const cleaned = digitsOnly.replace(/^0+/, '');

    // 3) Se o número vier já com código do país (55...), remove para análise
    let national = cleaned;
    if (national.startsWith(this.COUNTRY_CODE)) {
      national = national.slice(this.COUNTRY_CODE.length);
    }

    // 4) Validar quantidade de dígitos do número nacional (DDD + número)
    // aceitamos 10 (DDD + 8) ou 11 (DDD + 9)
    if (!(national.length === 10 || national.length === 11)) {
      throw new BadRequestException(
        'Número de telefone deve conter DDD + 8 ou 9 dígitos (ex: (99) 99999-9999).',
      );
    }

    // 5) Monta o número internacional com código do país
    const international = `${this.COUNTRY_CODE}${national}`; // ex: 55XXXXXXXXXXX

    // 6) Codifica a mensagem para uso em query string
    const encodedMessage = encodeURIComponent(message || '');

    // 7) Monta o link final
    const link = `https://wa.me/${international}?text=${encodedMessage}`;

    // 8) Tenta enviar os dados para o Zapier (não falhar a rota por causa de Zapier)
    try {
      await axios.post(this.ZAPIER_HOOK, {
        ...dto,
        phone: international,
        link,
      });
    } catch (err: unknown) {
      // tratamos erro como unknown e fazemos log; não propagamos para o cliente
      this.logger.warn(
        'Falha ao enviar dados para Zapier (não impede retorno do link).',
        String(err),
      );
    }

    return { success: true, link };
  }
}
