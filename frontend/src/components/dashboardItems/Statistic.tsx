import _ from "lodash";
import cn from "classnames";
import Chart from "react-apexcharts";

import styles from "../../styles/statistic.module.scss";
import { Divider, Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;

const Statistic = () => {
  const options = {
    series: [44, 88],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Расходы", "Доходы"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const forBar = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Январь",
          "Февраль",
          "Март",
          "Апрель",
          "Май",
          "Июнь",
          "Июль",
          "Август",
          "Сентябрь",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: ["30", "28", "45", "50", "55", "39", "70", "95", "110"],
      },
    ],
  };

  return (
    <div className={cn(styles.statsWrapper)}>
      <Title>Общая статистика</Title>
      <div className={cn(styles.mainBoard)}>
        <div className={cn(styles.pieOfMonth)}>
        <Title level={3}>Месячная оценка</Title>
          <Chart
            options={options}
            series={options.series}
            type="pie"
            width="500"
          />
        </div>
        <div className={cn(styles.barOfYear)}>
        <Title level={3}>Статистика прибыли за год</Title>
          <Chart
            options={forBar.options}
            series={forBar.series}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default Statistic;
