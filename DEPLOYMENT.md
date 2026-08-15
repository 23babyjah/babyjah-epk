# Deploying the babyjah EPK

## Recommended setup

Use **GitHub** for version control, **Cloudflare Pages** for hosting, and **Cloudflare Registrar** for the domain when the desired name is available.

Estimated recurring cost:

- Static hosting: **$0** on Cloudflare Pages.
- Git repository: **$0** on GitHub; the repository can remain private.
- HTTPS certificate: **$0**, issued automatically.
- Domain: the only required expense. Price depends on the exact name and extension and must be checked immediately before purchase. Cloudflare Registrar charges the registry and ICANN cost without an added markup.

This combination is preferable to GitHub Pages because Cloudflare Pages accepts private GitHub repositories on its free plan, provides automatic preview deployments, and keeps hosting separate from source control.

## What each part does

### Domain registrar

The registrar records ownership of a name such as `babyjah.com`. Registration is normally renewed annually. It does not store the website.

### DNS

DNS connects the domain to the host. Cloudflare manages this automatically when the domain is registered there. DNS changes can take time to propagate.

### GitHub repository

The repository stores the website and its history. A **commit** is a named snapshot. A **branch** isolates work from the live version. A **pull request** previews and reviews a branch before merging it into `main`.

### Cloudflare Pages

Pages copies the static files to Cloudflare's global network. Every push to `main` publishes production automatically. Other branches receive temporary preview URLs. Previous deployments can be inspected or rolled back.

### HTTPS

HTTPS encrypts traffic and proves the visitor reached the correct domain. Cloudflare provisions and renews the certificate automatically after DNS is connected.

## Files that must be published

Use this folder as the repository root:

```text
babyjah-epk/
├── index.html
├── styles.css
├── script.js
├── DESIGN.md
├── DEPLOYMENT.md
└── assets/
    ├── downloads/
    ├── fonts/
    └── images/
```

`index.html` must remain at the top level. The `assets/` directory contains every image, font, QR code, and downloadable press asset referenced by the page.

## Initial GitHub setup

1. Create a private GitHub repository named `babyjah-epk` without adding starter files.
2. In Terminal, enter the finished site folder:

   ```bash
   cd "/Users/admin/Documents/Codex/2026-08-10/li/outputs/babyjah-epk"
   ```

3. Initialize and publish the repository:

   ```bash
   git init
   git add .
   git commit -m "Launch babyjah electronic press kit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/babyjah-epk.git
   git push -u origin main
   ```

If GitHub asks for authentication, use GitHub Desktop, the GitHub CLI, or a personal access token; account passwords are not accepted for Git operations over HTTPS.

## Cloudflare Pages deployment

1. Sign in to Cloudflare and open **Workers & Pages**.
2. Select **Create application → Pages → Import an existing Git repository**.
3. Authorize access only to the `babyjah-epk` repository.
4. Use these settings:

   ```text
   Production branch: main
   Framework preset: None
   Build command: exit 0
   Build output directory: .
   Root directory: leave blank
   ```

5. Select **Save and Deploy**.
6. Check the generated `*.pages.dev` address on desktop and mobile before connecting the domain.

## Domain connection

1. Search Cloudflare Registrar for the exact desired domain.
2. Confirm spelling, first-year price, renewal price, and whether it is a premium domain.
3. Add billing and registrant information, then complete the purchase. Domain purchases are billable and generally irreversible.
4. In the Pages project, open **Custom domains → Set up a domain**.
5. Enter the apex domain, such as `babyjah.com`, and let Cloudflare create the DNS record.
6. Add `www.babyjah.com` as a second custom domain if desired and redirect one version to the other.
7. Confirm HTTPS is active before publicly sharing the address.

If the domain was purchased elsewhere, either point its nameservers to Cloudflare or connect a subdomain with the CNAME record specified by Pages.

## Safe update workflow

For a small text or image update:

```bash
git switch -c update/short-description
git add .
git commit -m "Update booking copy"
git push -u origin update/short-description
```

Open a pull request on GitHub and inspect Cloudflare's preview URL. Merge into `main` only after the preview is correct. Cloudflare will then publish production automatically.

Useful commands:

```bash
git status                 # See changed files
git diff                   # Review changes before committing
git log --oneline          # View saved versions
git switch main            # Return to production branch
git pull                   # Download the latest production version
```

Never commit passwords, API tokens, billing details, or domain-transfer codes. Keep the QR email and visible booking address synchronized whenever either is changed.

## Browser-assisted deployment

Codex can operate the deployment pages after browser control is connected and you are signed in. You must personally complete CAPTCHAs, two-factor authentication, account creation, payment confirmation, and the final approval for a domain purchase. Before any billable registration, Codex should show you the exact domain and current registration and renewal prices and wait for confirmation.

To enable control of an external browser, open **Codex Settings → Computer use**, install or enable the ChatGPT browser extension, then sign in to GitHub and Cloudflare in that browser. Return to this task and say that the browser is connected. Keep the deployment tabs open.
