import { Test, TestingModule } from '@nestjs/testing';
import { UsStatusController } from './us-status.controller';
import { UsStatusService } from './us-status.service';

describe('UsStatusController', () => {
  let controller: UsStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsStatusController],
      providers: [UsStatusService],
    }).compile();

    controller = module.get<UsStatusController>(UsStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
