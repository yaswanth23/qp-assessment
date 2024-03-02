import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Put,
  Patch,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminService } from "../../services/admin/admin.service";
import {
  AddItemDto,
  UpdateItemDto,
  UpdateInventoryDto,
} from "../../models/dto/admin.dto";

@ApiTags("Admin APIs")
@Controller("v1/admin/items")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  addItem(@Body() addItemDto: AddItemDto) {
    return this.adminService.addItem(addItemDto);
  }

  @Get()
  getItems() {
    return this.adminService.getItems();
  }

  @Delete(":id")
  removeItem(@Param("id") id: string) {
    return this.adminService.removeItem(id);
  }

  @Put(":id")
  updateItem(@Param("id") id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.adminService.updateItem(id, updateItemDto);
  }

  @Patch(":id/inventory")
  updateInventory(
    @Param("id") id: string,
    @Body() updateInventoryDto: UpdateInventoryDto
  ) {
    return this.adminService.updateInventory(id, updateInventoryDto);
  }
}
