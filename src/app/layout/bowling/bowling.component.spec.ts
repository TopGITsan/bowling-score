import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BowlingComponent } from './bowling.component';

describe('BowlingComponent', () => {
  let component: BowlingComponent;
  let fixture: ComponentFixture<BowlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BowlingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BowlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
