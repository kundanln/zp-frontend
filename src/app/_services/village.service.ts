import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { BaseserviceService } from "./baseservice.service";


@Injectable()

export class VillageService {
    constructor(private _http: HttpClient,private _baseService:BaseserviceService) { }

  //  baseUrl: string = "http://localhost:8080/ZP_Backend/rest/village";


    create(record: any) {

       // console.log("record ",JSON.stringify(record));
        return this._http.post(this._baseService.BaseUrl()+'/village/add',record);

    }

    update(record: any) {
        //console.log("at enquiry service ",enquiry);
        return this._http.put(this._baseService.BaseUrl() + '/village/update/id/' + record.id, record);
    }
    
    getAll() {

        // Make the GET HTTP request:
        return this._http.get(this._baseService.BaseUrl() + "/village/getAll");
        // return this._http.get<User[]>('/api/users');
    }

    getRecoredById(id : Number)
    {
        //reg id
        return this._http.get<any>(this._baseService.BaseUrl()+"/village/getById/id/"+ id);
    }
    delete(id: number) {
        return this._http.delete(this._baseService.BaseUrl()+'/village/delete/id/' + id);
    }

}