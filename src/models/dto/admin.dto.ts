import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class AddItemDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  groceryName: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  inventoryQuantity: number;
}

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  groceryName: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ type: Number })
  price: number;
}

export class UpdateInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  inventoryQuantity: number;
}
