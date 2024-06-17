import React from "react";
import { motion } from "framer-motion";
import { Button } from "antd";
import cn from "classnames";

import styles from "../../styles/welcome.module.scss";
import { useNavigate } from "react-router-dom";
import { REGISTRATION } from "../../routes/public";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={cn(styles.welcomeContainer)}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <header className="welcomeTitle">
        <h1>Управляйте финансами легко и просто.</h1>
      </header>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <section>
          <p>Начните эффективно управлять своими финансами.</p>
          <p>
            Отслеживайте свои расходы, устанавливайте бюджеты и достигайте
            финансовых целей.
          </p>
        </section>
        <Button type="primary" onClick={() => navigate(REGISTRATION.route)}>
          Начать
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
