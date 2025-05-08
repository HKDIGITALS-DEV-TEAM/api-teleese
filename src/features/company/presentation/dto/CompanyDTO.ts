/*eslint-disable @typescript-eslint/no-explicit-any*/
/**
 * DTO représentant une compagnie.
 */
export class CompanyDTO {
  id: string;
  name: string;
  description?: string;
  category: string;
  owner: string;
  users: { user: string; role: string }[];
  configurations?: Record<string, any>;
  aiOptions?: Record<string, any>[];

  constructor(data: Partial<CompanyDTO>) {
    this.id = data.id!;
    this.name = data.name!;
    this.description = data.description;
    this.category = data.category!;
    this.owner = data.owner!;
    this.users = data.users ?? [];
    this.configurations = data.configurations ?? {};
    this.aiOptions = data.aiOptions ?? [];
  }
}
