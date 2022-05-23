import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimationModalComponent } from './confrimation-modal.component';

describe('ConfrimationModalComponent', () => {
  let component: ConfrimationModalComponent;
  let fixture: ComponentFixture<ConfrimationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfrimationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfrimationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
