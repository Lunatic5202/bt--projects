Preparation for GitHub → Vercel deployment

1) Create a Vercel token (on your machine):

```bash
npm i -g vercel
vercel login
vercel tokens create
```

Copy the token value.

2) Add repository secrets on GitHub:

- Go to the repository Settings → Secrets → Actions.
- Add `VERCEL_TOKEN` with the token value.
- (Optional) Add `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` to pin deployments to a specific project.

3) What the workflow does

- The workflow `.github/workflows/vercel-deploy.yml` runs on pushes to `main`.
- It installs dependencies, runs `pnpm build`, and calls `vercel --prod --token $VERCEL_TOKEN --confirm`.

4) Triggering a deploy

- Push a commit to `main` (or merge a PR). The workflow will run and deploy.
- Check the Actions tab for the workflow run and logs.

5) Notes and alternatives

- If you prefer Vercel's Git integration, connect the GitHub repo in the Vercel dashboard instead — that will handle deployments automatically without a workflow.
- To enable preview deployments on PRs, I can add a workflow that runs on `pull_request` and uses the Vercel preview mode.

That's it — create the secret and push to `main` to deploy.
