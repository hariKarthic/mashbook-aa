import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoitemComponent } from './photoitem.component';

describe('PhotoitemComponent', () => {
  let component: PhotoitemComponent;
  let fixture: ComponentFixture<PhotoitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
