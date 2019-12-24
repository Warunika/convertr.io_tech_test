import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Advertiser, Address } from 'src/app/core/models';
import { AdvertisersService } from 'src/app/core/services/advertisers.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createAdvertiserForm: FormGroup;

  advertiser: Advertiser;
  address: Address;

  constructor(
    private fb: FormBuilder,
    private _advertiserService: AdvertisersService,
    private toastr: ToastrService
  ) {

    this.advertiser = {
      "@id": null,
      "@type": null,
      id: 0,
      name: null,
      orgurl: null,
      firstName: null,
      lastName: null,
      email: null,
      telephone: null,
      updatedTs: null,
      address: null
    } as Advertiser;

    this.address = {
      "@context": null,
      "@id": null,
      "@type": null,
      id: 0,
      address: null,
      city: null,
      postcode: null,
      updatedTs: null
    } as Address;
  }

  ngOnInit() {

    const url = '(http://|https://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const phoneNumber = '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$';
    const ukPostCode = '([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})$'

    this.createAdvertiserForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      telephone: [
        '',
        [
          Validators.required,
          Validators.pattern(phoneNumber)
        ]
      ],
      orgurl: [
        '',
        [
          Validators.required,
          Validators.pattern(url)
        ]
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.maxLength(250)
        ]
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ]
      ],
      postcode: [
        '',
        [
          Validators.required,
          Validators.pattern(ukPostCode)
        ]
      ],
    });

  }

  createAdvertiser() {
    if (this.createAdvertiserForm.valid) {
      console.log('Submitted');

      this.address.address = this.createAdvertiserForm.controls['address'].value;
      this.address.city = this.createAdvertiserForm.controls['city'].value;
      this.address.postcode = this.createAdvertiserForm.controls['postcode'].value;
      this.address.updatedTs = new Date(Date.now());

      this._advertiserService.createAddress(this.address).subscribe(
        data => {
          this.advertiser.name = this.createAdvertiserForm.controls['name'].value;
          this.advertiser.orgurl = this.createAdvertiserForm.controls['orgurl'].value;
          this.advertiser.firstName = this.createAdvertiserForm.controls['firstName'].value;
          this.advertiser.lastName = this.createAdvertiserForm.controls['lastName'].value;
          this.advertiser.email = this.createAdvertiserForm.controls['email'].value;
          this.advertiser.telephone = this.createAdvertiserForm.controls['telephone'].value;
          this.advertiser.address = "/addresses/6" //This needs to be generated according to response of the ID of the Address object
          this.advertiser.updatedTs = new Date(Date.now());

          this._advertiserService.createAdvertiser(this.advertiser).subscribe(
            data => {
              this.toastr.success('Advertiser created successfully.', 'Success');
            }, error => {
              this.toastr.error(error.message, 'Error');
            }
          )
        }, error => {
          this.toastr.error(error.message, 'Error');
        }
      )
      console.log(this.address)
    }
  }

}
