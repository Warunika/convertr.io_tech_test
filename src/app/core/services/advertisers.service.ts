import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Address } from '../models/address';
import { Advertiser } from '../models/advertiser';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertisersService {
  advertisersApiURL: string = environment.API_BASE_URL + '/advertisers';
  addressApiURL: string = environment.API_BASE_URL + '/addresses'

  constructor(private http: HttpClient) { }

  public getAdvertisers(): Observable<HttpResponse<Advertiser[]>> {
    return this.http.get<Advertiser[]>(this.advertisersApiURL, { observe: 'response' });
  }

  public getAddresseByAdvertiser(addressUrl: string): Observable<HttpResponse<Address>> {
    return this.http.get<Address>(environment.API_BASE_URL + addressUrl, { observe: 'response' })
  }

  public createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.addressApiURL, address);
  }

  public createAdvertiser(advertiser: Advertiser): Observable<Advertiser> {
    return this.http.post<Advertiser>(this.advertisersApiURL, advertiser);
  }
}
