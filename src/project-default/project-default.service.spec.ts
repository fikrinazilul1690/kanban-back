import { Test, TestingModule } from '@nestjs/testing';
import { ProjectDefaultService } from './project-default.service';

describe('ProjectDefaultService', () => {
  let service: ProjectDefaultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectDefaultService],
    }).compile();

    service = module.get<ProjectDefaultService>(ProjectDefaultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
