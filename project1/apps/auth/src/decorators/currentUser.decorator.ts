import { createParamDecorator, ExecutionContext, Logger } from "@nestjs/common";
import { UserDocument } from "../users/model/user.schema";

const getCurrentUserContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user
}

export const CurrentUserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => getCurrentUserContext(context)
)