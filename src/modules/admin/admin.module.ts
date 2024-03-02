import { Module } from "@nestjs/common";
import { AdminController } from "../../controllers/admin/admin.controller";
import { AdminService } from "../../services/admin/admin.service";
import { PrismaModule } from "../prisma/prisma.module";
import { IdGeneratorService } from "../../services/idGenerator/idgenerator.service";

@Module({
  controllers: [AdminController],
  providers: [AdminService, IdGeneratorService],
  imports: [PrismaModule],
})
export class AdminModule {}
