import { TestBed } from '@angular/core/testing';

import { ArchiveAssistantService } from './archive-assistant.service';

describe('ArchiveAssistantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArchiveAssistantService = TestBed.get(ArchiveAssistantService);
    expect(service).toBeTruthy();
  });
});
