import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { LinkController } from '../link.controller';
import { LinkService } from '../link.service';

describe('LinkController (e2e)', () => {
  let app: INestApplication;
  let mockLinkService: Partial<LinkService>;

  beforeAll(async () => {
    mockLinkService = {
      generateLink: jest.fn().mockImplementation(({ phone, message }) => {
        return {
          success: true,
          link: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        };
      }),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        {
          provide: LinkService,
          useValue: mockLinkService,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/link (POST) deve retornar link do WhatsApp', async () => {
    const response = await request(app.getHttpServer())
      .post('/link')
      .send({ phone: '51999999999', message: 'Oi!' })
      .expect(201);

    expect(response.body.link).toContain('https://wa.me/');
    expect(response.body.link).toContain('51999999999');
  });

  afterAll(async () => {
    await app.close();
  });
});
