import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisersRoutingModule } from './advertisers-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';

import { AdvertisersService } from 'src/app/core/services/advertisers.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';




@NgModule({
  declarations: [CreateComponent, ViewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdvertisersRoutingModule,
    NgbModule
  ],
  providers: [
    AdvertisersService
  ]
})
export class AdvertisersModule { }
