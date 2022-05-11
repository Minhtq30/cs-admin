export default interface IPagination {
  current: number;
  total: number;
  pageSize: number;
  pageSizeOptions: Array<string>;
}
