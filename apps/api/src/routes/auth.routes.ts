import { prisma } from '@gym-manager/db';
import bcrypt from 'bcryptjs';
import { Router } from 'express';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Введите email и пароль',
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        message: 'Неверный email или пароль',
      });
    }

    req.session.regenerate(err => {
      if (err) {
        return next(err);
      }

      req.session.userId = user.id;

      req.session.save(err => {
        if (err) {
          return next(err);
        }

        return res.json({
          message: 'Вход выполнен успешно',
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        });
      });
    });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      return next(err);
    }

    res.clearCookie('connect.sid');

    return res.json({
      message: 'Выход выполнен успешно',
    });
  });
});
export default router;
