import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassNPlayComponent } from './pass-n-play.component';

describe('PassNPlayComponent', () => {
  let component: PassNPlayComponent;
  let fixture: ComponentFixture<PassNPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassNPlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassNPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
