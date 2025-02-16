import { TestBed } from '@angular/core/testing';

import { ManageTaskService } from './manage-task.service';

describe('ManageTaskService', () => {
  let service: ManageTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
