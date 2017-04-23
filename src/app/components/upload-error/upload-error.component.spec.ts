import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadErrorComponent } from './upload-error.component';

describe('UploadErrorComponent', () => {
  let component: UploadErrorComponent;
  let fixture: ComponentFixture<UploadErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
