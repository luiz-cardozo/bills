import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email/password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect email/password');
    }

    const token = sign({}, process.env.APP_SECRET, {
      subject: user.id,
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
