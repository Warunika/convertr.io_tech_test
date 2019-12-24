import { Component, OnInit } from '@angular/core';
import { AdvertisersService } from 'src/app/core/services/advertisers.service';
import { Advertiser, Address } from 'src/app/core/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  advertisers: Advertiser[];

  constructor(
    private _advertiserService: AdvertisersService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getAdvertisers();
  }

  getAdvertisers() {
    this._advertiserService.getAdvertisers().subscribe(
      data => {
        this.advertisers = data.body["hydra:member"];
        this.getAddress();
      }, error => {
        this.toastr.error(error.message, 'Error');
      }
    )
  }

  getAddress() {
    this.advertisers.forEach(advertiser => {
      this._advertiserService.getAddresseByAdvertiser(advertiser.address).subscribe(
        data => {
          advertiser['_address'] = data.body;
        }, error => {
          this.toastr.error(error.message, 'Error');
        }
      )
    })
  }
}
