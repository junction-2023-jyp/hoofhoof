import { Category } from '../gmail';

export type SearchQueryOptions = {
  isPromotion?: boolean;
  isSocial?: boolean;
  startDate?: Date;
  endDate?: Date;
  categories?: Category[];
  isUnread?: boolean;
  isImportant?: boolean;
  isStarred?: boolean;
};

export class SearchQuery {
  private options: SearchQueryOptions;

  constructor(options: SearchQueryOptions) {
    this.options = options;
  }

  public get() {
    return this.options;
  }

  public buildQuery(): string {
    const queryParts: string[] = [];

    // Add date range query if present
    if (this.options.startDate) queryParts.push(`after:${this.formatDate(this.options.startDate)}`);
    if (this.options.endDate) queryParts.push(`before:${this.formatDate(this.options.endDate)}`);

    // Add categories query if present
    if (this.options.categories?.length) {
      const categoryQuery = this.options.categories.map(category => `category:${category}`).join(' OR ');
      queryParts.push(categoryQuery);
    }

    // Add flags based on their presence and value
    this.addFlagQuery(queryParts, 'is:unread', this.options.isUnread);
    this.addFlagQuery(queryParts, 'is:important', this.options.isImportant);
    this.addFlagQuery(queryParts, 'is:starred', this.options.isStarred);

    return queryParts.join(' ') || 'in:anywhere'; // Default to 'in:anywhere' if no conditions are specified
  }

  private addFlagQuery(queryParts: string[], flag: string, option: boolean | undefined, negate = false): void {
    if (option !== undefined) {
      queryParts.push(option !== negate ? flag : `-${flag}`);
    }
  }

  private formatDate(date: Date): string {
    // The date should be non-null as checked by calling methods
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }
}
