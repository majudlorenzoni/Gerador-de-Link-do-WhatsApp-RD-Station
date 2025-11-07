import { LinkService } from '../link.service';
import { CreateLinkDto } from '../dto/create-link.dto';
import { BadRequestException } from '@nestjs/common';

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
      role: 'Outros Cargos',
    };

    const result = await service.generateLink(dto);

    expect(result.success).toBe(true);
    expect(result.link).toContain('https://wa.me/55');
    expect(result.link).toContain('51999999999');
    expect(result.link).toContain('text=Ol%C3%A1!');
  });

  it('deve lançar erro se telefone for inválido', async () => {
    const dto: CreateLinkDto = {
      name: 'Maria',
      phone: '123',
      message: 'Teste',
      role: 'Outros Cargos',
    };

    await expect(service.generateLink(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve lançar erro se nome for inválido', async () => {
    const dto: CreateLinkDto = {
      name: 'M',
      phone: '(51) 99999-9999',
      message: 'Teste',
      role: 'Outros Cargos',
    };

    await expect(service.generateLink(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('deve lançar erro se cargo for inválido', async () => {
    const dto: CreateLinkDto = {
      name: 'Maria',
      phone: '(51) 99999-9999',
      message: 'Teste',
      role: 'Cargo inválido',
    };

    await expect(service.generateLink(dto)).rejects.toThrow(
      BadRequestException,
    );
  });
});
