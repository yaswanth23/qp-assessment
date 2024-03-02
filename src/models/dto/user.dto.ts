// create-order.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";

class OrderItemDto {
  @ApiProperty()
  @IsNotEmpty()
  groceryId: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  groceries: OrderItemDto[];
}
