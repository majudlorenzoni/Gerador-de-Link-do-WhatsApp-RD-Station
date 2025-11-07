import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from '../src/link/link.controller';
import { LinkService } from '../src/link/link.service';
import { CreateLinkDto } from '../src/link/dto/create-link.dto';

describe('LinkController', () => {
  let controller: LinkController;
  let service: LinkService;

  beforeEach(async () => {
    const mockLinkService = {
      create: jest.fn().mockImplementation((dto: CreateLinkDto) => ({
        success: true,
        link: `https://wa.me/${dto.phone}?text=${encodeURIComponent(dto.message)}`,
      })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        {
          provide: LinkService,
          useValue: mockLinkService,
        },
      ],
    }).compile();

    controller = module.get<LinkController>(LinkController);
    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create and return WhatsApp link', async () => {
    const dto: CreateLinkDto = {
      name: 'Maria',
      phone: '51999999999',
      message: 'Olá!',
      role: 'Outros Cargos',
    };

    const result = await controller.create(dto);

    expect(service.generateLink).toHaveBeenCalledWith(dto);
    expect(result.link).toContain('https://wa.me/');
    expect(result.link).toContain('51999999999');
  });
});
