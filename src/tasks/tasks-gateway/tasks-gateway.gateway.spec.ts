import { Test, TestingModule } from '@nestjs/testing';
import { TasksGatewayGateway } from './tasks-gateway.gateway';

describe('TasksGatewayGateway', () => {
  let gateway: TasksGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksGatewayGateway],
    }).compile();

    gateway = module.get<TasksGatewayGateway>(TasksGatewayGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
