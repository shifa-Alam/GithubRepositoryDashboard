import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ItemFilter } from "../Models/itemFilter";
@Injectable({ providedIn: 'root' })
export class RepositoryService {
  private baseUrl = "https://api.github.com/search/repositories?q=language:";

  constructor(private httpClient: HttpClient) { }

  getRepositories(filter: ItemFilter): Observable<any> {

    // var x = `https://api.github.com/search/repositories?q=language:${filter.language}&sort=${filter.sort}&order=${filter.order}&page=1&per_page=${filter.per_page}`;
    return this.httpClient.get<any>(`${this.baseUrl}${filter.language}&sort=${filter.sort}&order=${filter.order}&page=${filter.page}&per_page=${filter.per_page}`);
  }
}