import { TestBed } from '@angular/core/testing';

import { LoginVerifierService } from './login-verifier.service';

describe('LoginVerifierService', () => {
  let service: LoginVerifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginVerifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
