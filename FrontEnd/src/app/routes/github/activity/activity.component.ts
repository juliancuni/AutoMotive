import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/shared/services/github.service';
import { GitHubCommits, IGitHubCommit } from 'src/app/shared/services/github.model';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

    public tableColumnDefs: any[];
    public tableRowData: any[];


    public commits: GitHubCommits[];
    private httpErrors: any;
    constructor(
        private _gitService: GithubService
    ) {
        this.tableColumnDefs = [
            { headerName: 'Autori', field: 'commit.author.name' },
            { headerName: 'Data', field: 'commit.author.date' },
            { headerName: 'message', field: 'commit.message' },
            { headerName: 'url', field: 'url' },
        ]
    }

    ngOnInit() {
        this._gitService.getCommits().subscribe((res: GitHubCommits[]) => {
            console.log(res);
            this.commits = res;
            this.tableRowData = res;
        }, (err) => {
            this.httpErrors = err;
        })
    }

}
