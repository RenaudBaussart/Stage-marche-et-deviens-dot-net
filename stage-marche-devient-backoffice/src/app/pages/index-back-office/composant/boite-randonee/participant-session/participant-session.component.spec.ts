import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantSessionComponent } from './participant-session.component';

describe('ParticipantSessionComponent', () => {
  let component: ParticipantSessionComponent;
  let fixture: ComponentFixture<ParticipantSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
