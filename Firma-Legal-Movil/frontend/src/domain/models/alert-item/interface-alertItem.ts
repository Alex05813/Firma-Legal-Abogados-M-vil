export interface AlertItem {
  id: string;
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}