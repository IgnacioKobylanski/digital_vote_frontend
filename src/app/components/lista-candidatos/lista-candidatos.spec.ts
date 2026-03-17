import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCandidatos } from './lista-candidatos';

describe('ListaCandidatos', () => {
  let component: ListaCandidatos;
  let fixture: ComponentFixture<ListaCandidatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCandidatos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaCandidatos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
