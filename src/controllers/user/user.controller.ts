import { Body, Controller, Post, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../../services/user/user.service";
import { CreateOrderDto } from "../../models/dto/user.dto";

@ApiTags("Users APIs")
@Controller("v1/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/items")
  getItems() {
    return this.userService.getItems();
  }

  @Post("/orders")
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.userService.createOrder(createOrderDto);
  }
}
