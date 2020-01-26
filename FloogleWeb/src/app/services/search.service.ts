import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchResult } from '../search/search.model';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }


  search($keyword) {
    // const httpOption = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Headers': 'Content-Type',
    //     'Accept': 'application/json',
    //   })
    // };

    const api = environment.api;

    let params = new HttpParams();
    params = params.append('search', $keyword);

    return this.http.get(api.concat('search'), { params }).pipe(
      map(data => {
        console.log(data);
        const result = data['result'];
        return result.map(searchResult => {
          return {
            url: searchResult.url,
            title: searchResult.title,
            content: searchResult.content,
            type: searchResult.type,
            meta: searchResult.meta
          };
        });
      })
    );
  }

}
