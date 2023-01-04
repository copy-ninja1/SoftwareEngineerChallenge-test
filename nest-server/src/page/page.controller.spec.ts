import { Test, TestingModule } from '@nestjs/testing';
import { PagesController } from './page.controller';
import { PagesService } from './page.service';

describe('PagesController', () => {
  let controller: PagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesController],
      providers: [PagesService],
    }).compile();

    controller = module.get<PagesController>(PagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
