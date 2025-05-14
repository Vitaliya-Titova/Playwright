export interface IRequestOptions {
  baseURL?: string;
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: object; //тело запроса необязательное
  headers?: Record<string, string>; //headers необязательное
}

export interface IResponse<T extends object | null> {
  status: number;
  headers: Record<string, string>;
  body: T; //дженерик > для каждого endpoint body будет затипизировано по своему
}

//встречаются в каждом endpoint поэтому вынесли их отдельно сюда
export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}

export type sortDirection = "asc" | "desc";

export type customersSortField = "createdOn" | "email" | "name" | "country";
