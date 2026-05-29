export type EventName='tool_view'|'tool_use'|'redirect_click'|'search_use'|'language_switch'|'category_click';
export function trackEvent(event: EventName, payload: Record<string, string> = {}) {
  if (typeof window !== 'undefined') console.info('[analytics]', event, { timestamp: new Date().toISOString(), ...payload });
}
