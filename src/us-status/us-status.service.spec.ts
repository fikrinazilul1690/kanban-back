import { Test, TestingModule } from '@nestjs/testing';
import { UsStatusService } from './us-status.service';

describe('UsStatusService', () => {
  let service: UsStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsStatusService],
    }).compile();

    service = module.get<UsStatusService>(UsStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
