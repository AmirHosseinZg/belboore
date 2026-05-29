# Admin Panel Phase 2

## Goal
Enable non-developer content management for tool listings and platform curation.

## Desired Features
- add redirect tools
- edit descriptions
- manage featured flags
- manage sponsored flags
- review submissions
- track submitted tools

## MVP Decision
Not included in MVP runtime.
MVP uses file-based content management.

## Recommended Future Architecture
- FastAPI backend
- PostgreSQL
- admin auth
- content moderation workflow
- audit history

## Why Deferred
Keeps MVP fast, stable, and lightweight while preserving future extensibility.
