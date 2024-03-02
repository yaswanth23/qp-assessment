import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IdGeneratorService } from "../idGenerator/idgenerator.service";
import { STATUS_CODES } from "../../constants";
import {
  AddItemDto,
  UpdateItemDto,
  UpdateInventoryDto,
} from "../../models/dto/admin.dto";

@Injectable()
export class AdminService {
  constructor(
    private prismaService: PrismaService,
    private idGeneratorService: IdGeneratorService
  ) {}

  async addItem(addItemDto: AddItemDto) {
    const groceryId = this.idGeneratorService.generateId();

    await this.prismaService.groceris.create({
      data: {
        groceryId: groceryId,
        groceryName: addItemDto.groceryName,
        price: addItemDto.price,
        inventoryQuantity: addItemDto.inventoryQuantity,
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
      },
    });

    return {
      statusCode: STATUS_CODES.STATUS_CODE_201,
      message: "Grocery item added successfully.",
      data: { groceryId },
    };
  }

  async getItems() {
    const data = await this.prismaService.groceris.findMany();

    return {
      statusCode: STATUS_CODES.STATUS_CODE_200,
      data: data,
    };
  }

  async removeItem(groceryId: string) {
    await this.prismaService.groceris.delete({
      where: {
        groceryId: BigInt(groceryId),
      },
    });

    return {
      statusCode: STATUS_CODES.STATUS_CODE_200,
      message: "Grocery item deleted successfully",
      deletedGroceryId: groceryId,
    };
  }

  async updateItem(groceryId: string, updateItemDto: UpdateItemDto) {
    const data = await this.prismaService.groceris.findFirst({
      where: {
        groceryId: BigInt(groceryId),
      },
    });

    if (!data) {
      throw new HttpException("Grocery item not found", HttpStatus.NOT_FOUND);
    }

    await this.prismaService.groceris.update({
      where: {
        groceryId: BigInt(groceryId),
      },
      data: {
        groceryName: updateItemDto.groceryName
          ? updateItemDto.groceryName
          : data.groceryName,
        price: updateItemDto.price ? updateItemDto.price : data.price,
        updatedOn: new Date().toISOString(),
      },
    });

    return {
      statusCode: STATUS_CODES.STATUS_CODE_200,
      message: "data updated",
    };
  }

  async updateInventory(
    groceryId: string,
    updateInventoryDto: UpdateInventoryDto
  ) {
    const data = await this.prismaService.groceris.findFirst({
      where: {
        groceryId: BigInt(groceryId),
      },
    });

    if (!data) {
      throw new HttpException("Grocery item not found", HttpStatus.NOT_FOUND);
    }

    await this.prismaService.groceris.update({
      where: {
        groceryId: BigInt(groceryId),
      },
      data: {
        inventoryQuantity: updateInventoryDto.inventoryQuantity,
        updatedOn: new Date().toISOString(),
      },
    });

    return {
      statusCode: STATUS_CODES.STATUS_CODE_200,
      message: "data updated",
    };
  }
}
