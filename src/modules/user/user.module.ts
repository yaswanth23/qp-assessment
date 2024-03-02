import { Module } from "@nestjs/common";
import { UserController } from "../../controllers/user/user.controller";
import { UserService } from "../../services/user/user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { IdGeneratorService } from "../../services/idGenerator/idgenerator.service";

@Module({
  controllers: [UserController],
  providers: [UserService, IdGeneratorService],
  imports: [PrismaModule],
})
export class UserModule {}
