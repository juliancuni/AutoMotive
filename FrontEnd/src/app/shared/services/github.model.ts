declare var Object: any;

export interface IGitHubCommit {
    "commit": {},
    "committer": {},
    "message": {},
    "url": {}
}

export class GitHubCommits implements IGitHubCommit {
    
    "commit": {};
    "committer": {};
    "message": {};
    "url": {};

    constructor(data?: IGitHubCommit) {
        Object.assign(this, data);
    }
}