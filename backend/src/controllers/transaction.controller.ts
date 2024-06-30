import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
// import { validate } from "class-validator";
// import { Category } from "../models/category.model";
// import { Transaction } from "../models/transaction.model";
// import { UserService } from "../services/user.service";

const prisma = new PrismaClient();

export class TransactionController {
  /**
   * Создание новой транзакции
   */
  static async createTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { amount, description, date, categoryId } = req.body;
      const userId = req.user.id; // Получаем ID пользователя из аутентификации

      // Проверяем, существует ли категория с указанным categoryId
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!categoryExists) {
        return res.status(404).json({ message: "Категория не найдена" });
      }

      // Создаем новую транзакцию
      const newTransaction = await prisma.transaction.create({
        data: {
          amount,
          description,
          date,
          category: { connect: { id: categoryId } },
          user: { connect: { id: userId } },
        },
      });

      return res.status(201).json(newTransaction);
    } catch (error: any) {
      return res.status(error.code || 400).json({ message: error.message });
    }
  }

  /**
   * Получение списка транзакций пользователя
   */
  static async getTransactions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId = req.user.id; // Получаем ID пользователя из аутентификации

      // Получаем список всех транзакций пользователя
      const transactions = await prisma.transaction.findMany({
        where: { userId },
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });

      return res.json(transactions);
    } catch (error: any) {
      return res.status(error.code || 400).json({ message: error.message });
    }
  }

  /**
   * Удаление транзакции по ID
   */
  static async deleteTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const transactionId = parseInt(req.params.id);
      const userId = req.user.id; // Получаем ID пользователя из аутентификации

      // Проверяем, существует ли транзакция с указанным ID и принадлежит ли она пользователю
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
      });
      if (!transaction || transaction.userId !== userId) {
        return res.status(404).json({ message: "Транзакция не найдена" });
      }

      // Удаляем транзакцию
      await prisma.transaction.delete({
        where: { id: transactionId },
      });

      return res.json({ message: "Транзакция успешно удалена" });
    } catch (error: any) {
      return res.status(error.code || 400).json({ message: error.message });
    }
  }
}
