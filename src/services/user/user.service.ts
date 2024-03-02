import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IdGeneratorService } from "../idGenerator/idgenerator.service";
import { STATUS_CODES } from "../../constants";
import { CreateOrderDto } from "../../models/dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private idGeneratorService: IdGeneratorService
  ) {}

  async getItems() {
    const data = await this.prismaService.groceris.findMany({
      where: {
        inventoryQuantity: {
          gt: 0,
        },
      },
    });

    return {
      statusCode: STATUS_CODES.STATUS_CODE_200,
      data: data,
    };
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const orderId = this.idGeneratorService.generateId();
    let totalAmount = 0;

    const order = await this.prismaService.order.create({
      data: {
        orderId,
        totalAmount,
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
      },
    });

    for (const item of createOrderDto.groceries) {
      const itemData = await this.prismaService.groceris.findUnique({
        where: {
          groceryId: item.groceryId,
        },
      });

      if (itemData) {
        const unitPrice = itemData.price;
        const subtotal = item.quantity * unitPrice;
        totalAmount += subtotal;

        await this.prismaService.orderItem.create({
          data: {
            orderId,
            groceryId: item.groceryId,
            quantity: item.quantity,
            unitPrice,
          },
        });

        await this.prismaService.groceris.update({
          where: {
            groceryId: item.groceryId,
          },
          data: {
            inventoryQuantity: itemData.inventoryQuantity - item.quantity,
          },
        });
      }
    }

    await this.prismaService.order.update({
      where: {
        orderId: orderId,
      },
      data: {
        totalAmount: totalAmount,
      },
    });

    return {
      statusCode: STATUS_CODES.STATUS_CODE_201,
      message: "Order created",
      orderId: order.orderId,
    };
  }
}
