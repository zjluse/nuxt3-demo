export interface BuyFinancialProjectRequest {
  /**
   * 1-自动复利 2-自动延期 3-自动停止
   */
  auto_type: string;
  project_id: string;
  volume: string;
  [property: string]: any;
}
