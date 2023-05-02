import type { Request, Response } from 'express';

import { DefaultErrorMessages } from '@/constants';
import type { ApplicationError } from '@/errors';
import type { Controller } from '@/interfaces';
import type { UpdateUserService } from '@/services/user';
import { validate } from '@/validation';
import { UpdateUserSchema } from '@/validation/schema';

export class UpdateUserController implements Controller {
  private static INSTANCE: UpdateUserController;
  private readonly updateUserService: UpdateUserService;

  private constructor(updateUserService: UpdateUserService) {
    this.updateUserService = updateUserService;
  }

  static getInstance(updateUserService: UpdateUserService) {
    if (!UpdateUserController.INSTANCE)
      UpdateUserController.INSTANCE = new UpdateUserController(
        updateUserService
      );

    return UpdateUserController.INSTANCE;
  }

  async handle(req: Request, res: Response) {
    const { user, body } = req;

    try {
      const { name, oldPassword, newPassword } = await validate(
        UpdateUserSchema,
        body
      );

      const result = await this.updateUserService.execute({
        user,
        name,
        oldPassword,
        newPassword
      });

      return res.status(200).json(result);
    } catch (e) {
      const {
        status = 500,
        name = 'InternalServerError',
        message = DefaultErrorMessages.INTERNAL_SERVER_ERROR
      } = e as ApplicationError;

      return res.status(status).json({ name, message });
    }
  }
}
