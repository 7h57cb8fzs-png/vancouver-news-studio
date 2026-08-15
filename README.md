# Vancouver News Studio

A focused Persian-language Vancouver newsroom studio for turning Vancouver’s daily events and local news into a two-slide Instagram post.

## What it does

- ranks story ideas with a transparent **hotness score**
- lets you add a custom Vancouver story, source, time, location, and photo direction
- generates separate Persian copy for two Instagram slides
- copies each slide independently, ready for a design template
- works as a responsive static site with no API key or server required

## Daily workflow

1. Review the suggested stories or add a new verified source.
2. Select the strongest story.
3. Verify the date, time, address, and official link.
4. Review and copy the generated Persian draft.
5. Place the copy and photo in the Instagram template.

## Deployment

Cloudflare Pages settings:

- Production branch: `main`
- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`
- Root directory: leave blank

Every new commit to `main` should trigger a production deployment.

## Next phase

Connect official and local feeds, introduce an editor review queue, add scheduled daily discovery, and export the final two-slide post as an image.
