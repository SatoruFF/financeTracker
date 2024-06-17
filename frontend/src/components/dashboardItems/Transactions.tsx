import _ from "lodash";
import cn from "classnames";
import MyTable from "../common/MyTable";
import styles from "../../styles/transaction.module.scss";
import { Divider, Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;

const Transactions = () => {
  return (
    <div className={cn(styles.statsWrapper)}>
      <Title>Таблица финансов</Title>
      <div className={cn(styles.mainBoard)}>
        <MyTable />
      </div>
    </div>
  );
};

export default Transactions;
