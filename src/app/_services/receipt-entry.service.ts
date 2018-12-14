import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable()

export class ReceiptEntryService {
    constructor(private _http: HttpClient) { }

   // baseUrl: string = "http://localhost:8080/ZP_Backend/rest/receipt-entry";
   baseUrl: string = "https://zp-back1.herokuapp.com/rest/receipt-entry";

    create(record: any) {

       // console.log("record ",JSON.stringify(record));
        return this._http.post(this.baseUrl+'/add',record);

    }

    update(record: any) {
        //console.log("at enquiry service ",enquiry);
        return this._http.put(this.baseUrl + '/update/id/' + record.id, record);
    }

    getAll() {

        // Make the GET HTTP request:
        return this._http.get(this.baseUrl + "/getAll");
        // return this._http.get<User[]>('/api/users');
    }

    getRecoredById(id : Number)
    {
        //reg id
        return this._http.get<any>(this.baseUrl+"/getById/id/"+ id);
    }

}