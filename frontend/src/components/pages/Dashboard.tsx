import React from "react";
import cn from "classnames";

import styles from "../../styles/dashboard.module.scss";
import Statistic from "../dashboardItems/Statistic";
import Transactions from "../dashboardItems/Transactions";
import NavBar from "../common/Navbar";
import Plans from "../dashboardItems/Plans";

const Dashboard: React.FC = () => {
  return (
    <div className={cn(styles.dasboardContent)}>
      <NavBar />
      <Statistic />
      <Transactions />
      <Plans/>
    </div>
  );
};

export default Dashboard;
