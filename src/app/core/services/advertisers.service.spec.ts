import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { AdvertisersService } from './advertisers.service';
import { Advertiser, Address } from '../models';

describe('AdvertisersService', () => {
  let service: AdvertisersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdvertisersService]
    });

    service = TestBed.get(AdvertisersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('Should retrieve advertisers from API via GET /advertisers', () => {
    const dummyAdvertisers: Advertiser[] = [
      {
        "@id": "/advertisers/1",
        "@type": "Advertiser",
        "id": 1,
        "name": "Fiat",
        "orgurl": "http://www.fiat.co.uk/",
        "firstName": "John",
        "lastName": "Smith",
        "email": "info@fiat.co.uk",
        "telephone": "02012345678",
        "updatedTs": new Date("2017-08-07T14:36:49+00:00"),
        "address": "/addresses/1"
      } as Advertiser,
      {
        "@id": "/advertisers/2",
        "@type": "Advertiser",
        "id": 2,
        "name": "Mercedes-Benz",
        "orgurl": "http://www.mercedes-benz.co.uk/",
        "firstName": "Jim",
        "lastName": "Hendrix",
        "email": "info@mercedes-benz.co.uk",
        "telephone": "02012345678",
        "updatedTs": new Date("2017-08-08T14:36:49+00:00"),
        "address": "/addresses/2"
      } as Advertiser
    ];

    service.getAdvertisers().subscribe(response => {
      var advertisers = response.body['hydra:member'];
      expect(response.status).toBe(200);
      expect(advertisers.length).toBe(2);
      expect(advertisers).toEqual(dummyAdvertisers);
    });

    const request = httpMock.expectOne(`${service.apiBaseUrl}/advertisers`);
    expect(request.request.method).toBe('GET');
    request.flush({
      'hydra:member': dummyAdvertisers
    });
  });


  it('Should retrieve addresses from API via GET /addresses', () => {
    const dummyAddress: Address = {
      "@context": "/contexts/Address",
      "@id": "/addresses/1",
      "@type": "Address",
      "id": 1,
      "address": "Convertr Media 6-8, St. John's Square",
      "city": "London",
      "postcode": "EC1M 4NH",
      "updatedTs": new Date("2017-04-03T10:01:27+00:00")
    };

    service.getAddresseByAdvertiser(dummyAddress["@id"]).subscribe(response => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(dummyAddress);
    });

    const request = httpMock.expectOne(`${service.apiBaseUrl}${dummyAddress["@id"]}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyAddress);
  });

  it('Should create address from API via POST /addresses', () => {
    const dummyAddress: Address = {
      "@context": "/contexts/Address",
      "@id": null,
      "@type": "Address",
      "id": null,
      "address": "Convertr Media 6-8, St. John's Square",
      "city": "London",
      "postcode": "EC1M 4NH",
      "updatedTs": new Date()
    };

    service.createAddress(dummyAddress).subscribe(response => {
      expect(response.status).toBe(201);
    });

    const request = httpMock.expectOne(`${service.apiBaseUrl}/addresses`);
    expect(request.request.method).toBe('POST');
  });

  
  it('Should create address from API via POST /advertisers', () => {
    const dummyAdvertiser: Advertiser = {
      "@id": null,
      "@type": "Advertiser",
      "id": null,
      "name": "Fiat",
      "orgurl": "http://www.fiat.co.uk/",
      "firstName": "John",
      "lastName": "Smith",
      "email": "info@fiat.co.uk",
      "telephone": "02012345678",
      "updatedTs": new Date("2017-08-07T14:36:49+00:00"),
      "address": "/addresses/1",
      "_address": null
    };

    service.createAdvertiser(dummyAdvertiser).subscribe(response => {
      expect(response.status).toBe(201);
    });

    const request = httpMock.expectOne(`${service.apiBaseUrl}/advertisers`);
    expect(request.request.method).toBe('POST');
  });
});


