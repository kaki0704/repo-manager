import { TestBed } from '@angular/core/testing';

import { GithubApiService } from './github-api.service';

describe('GithubApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: GithubApiService = TestBed.get(GithubApiService);
    expect(service).toBeTruthy();
  });
});
