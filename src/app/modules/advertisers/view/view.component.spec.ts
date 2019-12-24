import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { AdvertisersService } from 'src/app/core/services/advertisers.service';
import { of } from 'rxjs';
import { Advertiser } from 'src/app/core/models';
import { HttpResponse } from '@angular/common/http';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let service: AdvertisersService;
  let fixture: ComponentFixture<ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComponent ],
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [ToastrService, AdvertisersService]
    })
    .compileComponents();

    service = TestBed.get(AdvertisersService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
