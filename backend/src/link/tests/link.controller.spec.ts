import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from '../link.controller';
import { LinkService } from '../link.service';
import { CreateLinkDto } from '../dto/create-link.dto';
import { BadRequestException } from '@nestjs/common';

describe('LinkController', () => {
  let controller: LinkController;
  let service: LinkService;

  beforeEach(async () => {
    const mockLinkService = {
      generateLink: jest.fn().mockImplementation((dto: CreateLinkDto) => {
        const { phone, message } = dto;
        const cleanPhone = phone.replace(/\D/g, '');
        return {
          success: true,
          link: `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`,
        };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [{ provide: LinkService, useValue: mockLinkService }],
    }).compile();

    controller = module.get<LinkController>(LinkController);
    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should generate WhatsApp link correctly', async () => {
    const dto: CreateLinkDto = {
      name: 'Maria',
      phone: '(51) 99999-9999',
      message: 'Olá!',
      role: 'Outros Cargos',
    };

    const result = await controller.create(dto);

    expect(service.generateLink).toHaveBeenCalledWith(dto);
    expect(result.success).toBe(true);
    expect(result.link).toContain('https://wa.me/55');
    expect(result.link).toContain('51999999999');
    expect(result.link).toContain('text=Ol%C3%A1!');
  });

  it('should throw error if phone is invalid', async () => {
    const dto: CreateLinkDto = {
      name: 'Maria',
      phone: '123',
      message: 'Teste',
      role: 'Outros Cargos',
    };

    jest.spyOn(service, 'generateLink').mockImplementation(() => {
      throw new BadRequestException('Telefone inválido');
    });

    await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
  });

  it('should throw error if name is invalid', async () => {
    const dto: CreateLinkDto = {
      name: 'A',
      phone: '(51) 99999-9999',
      message: 'Teste',
      role: 'Outros Cargos',
    };

    jest.spyOn(service, 'generateLink').mockImplementation(() => {
      throw new BadRequestException('Nome inválido');
    });

    await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
  });
});
