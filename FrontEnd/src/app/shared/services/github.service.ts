import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitHubCommits } from './github.model';

import { Observable } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';

const URL = "https://api.github.com/repos/juliancuni/AutoMotive/commits";

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    public commits: GitHubCommits[];
    constructor(
        private _http: HttpClient
    ) {
    }
    /**
     * getCommits
    */
    public getCommits(): Observable<GitHubCommits[]> {
        return this._http.get<GitHubCommits[]>(URL);
    }
}
