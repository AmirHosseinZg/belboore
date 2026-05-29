# Analytics Plan

## MVP Principle
Prepare event architecture without coupling to a third-party platform.

## Desired Events
- `tool_view`
- `tool_use`
- `redirect_click`
- `search_use`
- `language_switch`
- `category_click`

## Event Shape
- event name
- timestamp
- language
- page type
- tool slug if applicable
- category slug if applicable

## MVP Implementation
- create analytics utility abstraction
- no required backend ingestion yet
- keep hooks easy to connect later

## Future Direction
- self-hosted event collector
- FastAPI ingestion endpoint
- storage and dashboard later
