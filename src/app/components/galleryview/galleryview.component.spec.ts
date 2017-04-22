import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryviewComponent } from './galleryview.component';

describe('GalleryviewComponent', () => {
  let component: GalleryviewComponent;
  let fixture: ComponentFixture<GalleryviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
