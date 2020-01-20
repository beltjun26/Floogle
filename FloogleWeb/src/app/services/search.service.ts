import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
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

    let params = new HttpParams();
    params = params.append('search', $keyword);

    return this.http.get('http://api/api/search', { params }).pipe(
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
