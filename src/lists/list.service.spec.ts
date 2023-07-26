import { List } from './entities/list.entity';
import { ListsService } from './lists.service';

const mockListEntity = {};

const mockListModel = {
  create: jest.fn().mockReturnValue(
    Promise.resolve(
      new List({
        name: 'My List',
      }),
    ),
  ),
};

const mockHttpService = {
  post: jest.fn(),
};

describe('ListService', () => {
  let service: ListsService;

  beforeEach(() => {
    service = new ListsService(mockListModel as any, mockHttpService as any);
  });

  it('should create a list', async () => {
    const list = await service.create({ name: 'My List' });
    console.log({ list });
  });
});
