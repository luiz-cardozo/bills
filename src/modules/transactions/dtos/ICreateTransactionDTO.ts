export default interface ICreateTransactionDTO {
  title: string;
  description?: string;
  type: 'income' | 'outcome';
  value: number;
  category_id: string;
  user_id: string;
  apportionment: 'personal' | 'shared';
  date: Date;
}
