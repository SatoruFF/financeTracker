import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  sum: number | string;
  date: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    key: 'sum',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Машина',
    sum: "357 тысяч",
    date: '21 февраля',
  },
  {
    key: '2',
    name: 'Поездка на море',
    sum: "56 тысяч",
    date: '6 ноября',
  },
  {
    key: '3',
    name: 'Покупка одежды',
    sum: "18 тысяч",
    date: '17 июня',
  },
];

const App: React.FC = () => <Table style={{width: "90%", height: "100%"}} columns={columns} dataSource={data} />;

export default App;