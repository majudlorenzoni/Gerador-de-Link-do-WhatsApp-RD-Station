import { LinkService } from '../src/link/link.service';
import { BadRequestException } from '@nestjs/common';
import { CreateLinkDto } from '../src/link/dto/create-link.dto';

describe('LinkService', () => {
  let service: LinkService;

  beforeEach(() => {
    service = new LinkService();
  });

  it('deve gerar link do WhatsApp corretamente', async () => {
    const dto: CreateLinkDto = {
      name: 'Maria',
      phone: '(51) 99999-9999',
      message: 'Olá!',
      role: 'CEO',
    };
    const result = await service.generateLink(dto);

    expect(result.success).toBe(true);
    expect(result.link).toContain('https://wa.me/55');
    expect(result.link).toContain('text=Ol%C3%A1%21');
  });

  it('deve lançar erro se telefone for inválido', async () => {
    const dto: CreateLinkDto = {
      name: 'Maria',
      phone: '123',
      message: 'Teste',
      role: 'CEO',
    };

    await expect(service.generateLink(dto)).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.generateLink(dto)).rejects.toThrow(
      /Número de telefone deve conter DDD/,
    );
  });
});
