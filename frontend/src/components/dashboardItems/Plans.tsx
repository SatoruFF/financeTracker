import React, { useState } from "react";
import {
  DatePicker,
  InputNumber,
  Button,
  Form,
  notification,
  Typography,
} from "antd";
import moment from "moment";
import cn from "classnames";
import styles from "../../styles/plans.module.scss";
const { Title, Paragraph, Text, Link } = Typography;

const { RangePicker } = DatePicker;

const Plans = () => {
  const [goalAmount, setGoalAmount] = useState(0);
  const [targetDate, setTargetDate] = useState(null);

  const handleGoalAmountChange = (value: any) => {
    setGoalAmount(value);
  };

  const handleDateChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setTargetDate(dates[1]);
    } else {
      setTargetDate(null);
    }
  };

  const handleSubmit = () => {
    if (!targetDate || goalAmount <= 0) {
      notification.error({
        message: "Ошибка",
        description:
          "Пожалуйста, выберите сумму и дату для вашей финансовой цели.",
      });
      return;
    }

    notification.success({
      message: "Успех",
      description: `Ваша финансовая цель на сумму ${goalAmount} на ${moment(
        targetDate
      ).format("LL")} была установлена!`,
    });

    setGoalAmount(0);
    setTargetDate(null);
  };

  return (
    <div className={cn(styles.statsWrapper)}>
      <Title>Финансовые цели</Title>
      <div className={cn(styles.mainBoard)}>
        <Form layout="vertical">
          <Form.Item label="Сумма финансовой цели">
            <InputNumber
              value={goalAmount}
              onChange={handleGoalAmountChange}
              style={{ width: "100%" }}
              placeholder="Введите сумму"
            />
          </Form.Item>
          <Form.Item label="Выберите дату достижения цели">
            <RangePicker
              onChange={handleDateChange}
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current < moment().endOf("day")
              }
              format="DD.MM.YYYY"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Установить цель
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Plans;
