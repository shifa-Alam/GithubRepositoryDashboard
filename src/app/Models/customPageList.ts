import { Item } from "./item";

export class CustomPageList {
  total_count: number = 0;
  incomplete_results: boolean = false;
  items: Item[] = [];
  page: number = 0;
  per_page: number = 0;
}
