import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  sum: number | string;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Наименование',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Комментарий',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Тип',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    key: 'sum',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'Стипендия',
    sum: "12 тысяч",
    address: 'Пришло чуть больше за счет успеваемости',
    tags: ["Доход"],
  },
  {
    key: '2',
    name: 'Покупка подарка',
    sum: "2 тысячи",
    address: 'Подарок Алексею на день рождения',
    tags: ['Расход'],
  },
  {
    key: '3',
    name: 'Доработки по сайту',
    sum: "18 тысяч",
    address: 'Нужно было исправить данные для отображения',
    tags: ['Доход'],
  },
];

const App: React.FC = () => <Table style={{width: "90%", height: "100%"}} columns={columns} dataSource={data} />;

export default App;