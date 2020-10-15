import { UsermasterModule } from './usermaster.module';

describe('UsermasterModule', () => {
  let usermasterModule: UsermasterModule;

  beforeEach(() => {
    usermasterModule = new UsermasterModule();
  });

  it('should create an instance', () => {
    expect(usermasterModule).toBeTruthy();
  });
});
