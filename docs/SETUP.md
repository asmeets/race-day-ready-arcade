# Local Jekyll Development Setup

## Quick Start (GitHub Actions)

Since you've configured GitHub Actions to build and deploy the site, you don't need to build locally. Just push your changes and GitHub will handle the build automatically.

## Local Development (Optional)

If you want to preview changes locally before pushing:

### Requirements

- Ruby 3.0 or higher
- Bundler

### Check Your Ruby Version

```bash
ruby --version
```

If you have Ruby 2.x, you'll need to upgrade. On macOS:

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Ruby via Homebrew
brew install ruby

# Or use rbenv for version management
brew install rbenv ruby-build
rbenv install 3.2.0
rbenv global 3.2.0
```

### Install Dependencies

```bash
cd docs
bundle install
```

### Run Local Server

```bash
bundle exec jekyll serve
```

Then visit `http://localhost:4000/driven-by-stem/`

### Build Only (No Server)

```bash
bundle exec jekyll build
```

The built site will be in `docs/_site/`

## Files Overview

### Configuration
- **Gemfile** - Ruby gem dependencies
- **_config.yml** - Jekyll site configuration
- **assets/css/app.scss** - Bulma Clean Theme stylesheet entrypoint and local docs overrides

### Content Pages
- **index.md** - Homepage and educator hub page
- **_layouts/educator-page.html** - Shared educator page layout with right-side section navigation
- **_pages/educators-*.md** - Individual educator lesson plan sections
- **_pages/about.md** - About the project

Current educator section names are Summary, Goals, Requirements, Standards, Foundations, Accessibility, Definitions, Agenda, Run of Show, Supplementals, and Feedback.

Student-facing guidance is intentionally kept in the MakeCode Arcade skillmap flow rather than in this docs site.

### Theme
Using [Bulma Clean Theme](https://github.com/chrisrhymes/bulma-clean-theme/) - A Bulma-based Jekyll theme with flexible layouts and navigation options.

The site uses `remote_theme` plus `jekyll-remote-theme` for GitHub Pages compatibility, and local style overrides live in `assets/css/app.scss`.

## GitHub Pages Deployment

Your site will be automatically built and deployed to:
**https://asmeets.github.io/driven-by-stem/**

Every push to the main branch triggers a new build via GitHub Actions.

## Troubleshooting

### Build Errors on GitHub

Check the Actions tab in your GitHub repository to see build logs.

### Missing Images

Images are optional. See `assets/images/README.md` for guidance on adding visual assets.

### Theme Not Loading

Ensure your GitHub Actions workflow is set up to build with Jekyll and that `jekyll-remote-theme` is enabled in both `_config.yml` and the docs Gemfile.

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Bulma Clean Theme](https://github.com/chrisrhymes/bulma-clean-theme/)
- [GitHub Pages Jekyll Docs](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)
