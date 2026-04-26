# Security Policy

Driven by STEM is a Microsoft MakeCode Arcade project for classroom and live-event use. Security work in this repository focuses on keeping the project safe to open, remix, facilitate, and run in MakeCode Arcade.

## Supported Scope

This project does not use traditional release branches. Security fixes are supported on the current `main` branch and the current published MakeCode Arcade skillmap experience.

| Project surface | Supported |
| --- | --- |
| Current `main` branch | Yes |
| Current MakeCode Arcade skillmap content | Yes |
| Old forks, remixes, or downloaded copies | No |
| Unofficial deployments or modified mirrors | No |

## What To Report

Please report issues that could affect learners, facilitators, or contributors, including:

- malicious or unexpected code in Arcade project files, tutorials, assets, or generated resources
- unsafe dependencies or extension URLs in `pxt.json`
- links in README, tutorials, skillmap nodes, assets, or docs that lead to unsafe or inappropriate content
- tutorial or skillmap behavior that could expose private student information
- persistent saved-state behavior that could leak personal information across shared devices
- workflow or automation behavior that could expose repository secrets or contributor credentials

Regular bugs, content edits, accessibility issues, and gameplay tuning requests can be opened as normal GitHub issues unless they have a safety or privacy impact.

## Reporting A Vulnerability

If the issue is sensitive, do not open a public issue. Use GitHub's private vulnerability reporting for this repository when available. If private reporting is unavailable, contact the repository owner through GitHub and ask for a private reporting channel.

When reporting, include:

- the affected file, tutorial, skillmap node, dependency, or link
- steps to reproduce or inspect the issue
- the potential impact on students, facilitators, contributors, or live-event use
- any suggested fix, if you have one

Please do not include student personal information in reports. If an example needs data, use fake names and fake values.

## Response Expectations

The project maintainer will review security reports as soon as practical. Accepted issues will be fixed in the smallest reasonable change and, when relevant, the MakeCode Arcade skillmap or documentation will be updated after the repository fix.

If a report is declined, the maintainer will explain why it does not fit this security policy and may suggest filing it as a normal issue instead.

## Classroom And Student Privacy

This project should not ask students for sensitive personal information. Student-facing prompts should avoid collecting full names, contact details, school IDs, precise locations, or private account information.

Some activities may use local MakeCode settings to save game state, team names, car names, setup choices, or results across skillmap nodes. Keep those values classroom-safe, easy to reset, and appropriate for shared devices.

## Dependency And Extension Guidance

Only add MakeCode Arcade dependencies or extensions that are understandable, necessary, and appropriate for classroom use. Before adding a new dependency:

- prefer built-in Arcade blocks when they teach the concept clearly
- check the extension source and import URL
- avoid deprecated, abandoned, or unclear extensions when a safer option exists
- keep `pxt.json` changes intentional and reviewable

Do not add secrets, tokens, credentials, private URLs, or personal data to project files, tutorials, generated assets, workflow files, or documentation.
