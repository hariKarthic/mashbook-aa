import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadviewComponent } from './uploadview.component';

describe('UploadviewComponent', () => {
  let component: UploadviewComponent;
  let fixture: ComponentFixture<UploadviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
