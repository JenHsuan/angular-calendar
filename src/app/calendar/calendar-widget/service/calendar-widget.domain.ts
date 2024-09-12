export const CALENDAR_DATES_ITEM_STYLE = `
  font-size: 1.07rem; 
  cursor: pointer; 
  width: 2em;
  height: 2em;
  line-height: 2em; 
  margin-top: 1.7em; 
  margin-left: calc((100% / 7 - 2em) / 2);
  margin-right: calc((100% / 7 - 2em) / 2);
  border-radius: 10em; 
  text-align: center;
`;

export const INACTIVE_CALENDAR_DATES_ITEM_STYLE = `
  color: #aaa;
`;

export const ACTIVE_CALENDAR_DATES_ITEM_STYLE = `
  color: #fff;
  background-color: #007bff;
`;

export const YEAR_CALENDAR_DATES_ITEM_STYLE = `
  font-size: 1.07rem; 
  cursor: pointer; 
  width: 2.8em;
  height: 2em;
  line-height: 2em; 
  margin-top: 1.7em; 
  margin-left: calc((100% / 5 - 2.8em) / 2);
  margin-right: calc((100% / 5 - 2.8em) / 2);
  border-radius: .2em;
  text-align: center;
`;

export const INACTIVE_YEAR_CALENDAR_DATES_ITEM_STYLE = `
  color: #aaa;
`;

export const ACTIVE_YEAR_CALENDAR_DATES_ITEM_STYLE = `
  color: #fff;
  background-color: #007bff;
`;

export enum CalendarWidgetItemType {
  INACTIVE,
  ACTIVE,
  NONE
}

export const CALENDAR_DATES_ITEM_STYLE_MAP = new Map<CalendarWidgetItemType, string>([
  [ CalendarWidgetItemType.INACTIVE, `${CALENDAR_DATES_ITEM_STYLE}${INACTIVE_CALENDAR_DATES_ITEM_STYLE}`],
  [ CalendarWidgetItemType.ACTIVE, `${CALENDAR_DATES_ITEM_STYLE}${ACTIVE_CALENDAR_DATES_ITEM_STYLE}`],
  [ CalendarWidgetItemType.NONE, CALENDAR_DATES_ITEM_STYLE]
]);

export const YEAR_CALENDAR_ITEM_STYLE_MAP = new Map<CalendarWidgetItemType, string>([
  [ CalendarWidgetItemType.INACTIVE, `${YEAR_CALENDAR_DATES_ITEM_STYLE}${INACTIVE_YEAR_CALENDAR_DATES_ITEM_STYLE}`],
  [ CalendarWidgetItemType.ACTIVE, `${YEAR_CALENDAR_DATES_ITEM_STYLE}${ACTIVE_YEAR_CALENDAR_DATES_ITEM_STYLE}`],
  [ CalendarWidgetItemType.NONE, YEAR_CALENDAR_DATES_ITEM_STYLE]
]);