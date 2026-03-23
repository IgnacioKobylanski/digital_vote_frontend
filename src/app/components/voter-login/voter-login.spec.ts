import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterLogin } from './voter-login';

describe('VoterLogin', () => {
  let component: VoterLogin;
  let fixture: ComponentFixture<VoterLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoterLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(VoterLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
