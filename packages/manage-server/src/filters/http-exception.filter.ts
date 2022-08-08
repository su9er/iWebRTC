import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const req = ctx.getRequest(); //  获取请求上下文中的 request对象
    const res = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    // 设置错误信息
    // TODO: 定义不同的错误输出
    let message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;

    if (status === 401) {
      message = '身份过期，请重新登录';
    }

    const errorResponse = {
      code: status,
      data: null,
      message,
      path: req.url,
      error: res.error,
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(errorResponse);
  }
}
