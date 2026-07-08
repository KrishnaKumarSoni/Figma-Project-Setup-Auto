<h1 align="center">Figma Project Setup Auto</h1>
<p align="center"><b>Fill in your brand once, and a fresh Figma file scaffolds itself.</b></p>
<p align="center">
  <code>◐ Working</code> &nbsp;·&nbsp; Figma Plugin · React · TypeScript
</p>

> Instead of hand-building pages, frames, grids, and style placeholders every time you start a design, describe your brand in a short form and let the plugin lay the whole project out for you.

Figma Project Setup Auto is a Figma plugin that turns a handful of brand inputs into a ready-to-work file. You pick a design type, colors, fonts, corner radius, shadow style, and layout, hit generate, and it builds out structured pages and frames so you can start designing instead of setting up.

## Why it exists
Every new Figma project starts with the same chore: create pages, size frames for mobile or web, set up layout grids, and stub out a style guide. It is repetitive, easy to do inconsistently, and a poor use of a designer's time. This plugin standardizes that first hour into a form you fill out once.

## How it works
```
Fill brand form  ->  Inputs become a config  ->  Plugin generates pages + frames  ->  Grids + layout applied
```
| Step | What happens |
|------|--------------|
| Fill brand form | Choose design type, primary/secondary/accent colors, fonts, corner radius, shadow style, and layout. |
| Build config | Inputs are validated and transformed into a structured design-system config. |
| Generate | The plugin creates Design System, Style Guide, and Components pages with their main frames. |
| Apply layout | Frames are sized for the chosen layout and given column grids and auto-layout. |

## What you get
| Feature | What it does |
|---------|--------------|
| Brand input form | One panel for design type, colors, fonts, radius, shadow, layout, and brand voice notes. |
| Page scaffolding | Auto-creates Design System, Style Guide, and Components pages. |
| Layout presets | Sizes frames mobile-first or web-first and sets up grids and auto-layout. |
| Font picker | Choose primary and secondary families from the fonts available in Figma. |
| Config validation | Inputs are checked and normalized before anything touches the canvas. |

## Under the hood
Figma Plugin API · React · TypeScript · Zustand for state · Zod for validation · Vite build.
