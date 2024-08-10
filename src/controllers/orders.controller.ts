import { Request, Response } from "express";
import OrdersModel from "@/models/orders.model";
import ProductsModel from "@/models/products.model";
import { IReqUser } from "@/utils/interfaces";
import * as Yup from "yup";

const itemValidation = Yup.object().shape({
  name: Yup.string().required(),
  productId: Yup.string().required(),
  price: Yup.number().required(),
  quantity: Yup.number().required().min(1).max(5),
});

const orderValidation = Yup.object().shape({
  grandTotal: Yup.number().required(),
  orderItems: Yup.array().of(itemValidation).required(),
  createdBy: Yup.string().required(),
  status: Yup.string().oneOf(["pending", "completed", "cancelled"]).default("pending"),
});

interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
};

interface IProduct {
  product: {
    name: string,
    productId: string,
    price: number,
    quantity: number,
  };
};

export default {
  async create(req: Request, res: Response) {
    const createdBy = (req as IReqUser).user.id;
    const { orderItems, status } = req.body

    const session = await OrdersModel.startSession();
    session.startTransaction();
    
    try {
      const itemArray: { productId: string; quantity: number }[] = [];
      let grandTotal: number = 0;
      
      for (const item of orderItems) {
        const product = await ProductsModel.findById(item.productId).session(session);
        if (!product) {
          await session.abortTransaction();
          await session.endSession();

          return res.status(400).json({
            message: "Product not found"
          });
        }

        if(item.quantity > product.qty) {
          await session.abortTransaction();
          await session.endSession();

          return res.status(400).json({
            message: "quantity insufficient"
          });
        }

        const orderProduct: IProduct['product'] = {
          name: product?.name,
          productId: product?._id.toString(),
          price: product?.price,
          quantity: item.quantity,
        };
        
        product.qty -= item.quantity;
        await product.save({ session });

        grandTotal += orderProduct.price * orderProduct.quantity;
        itemArray.push(orderProduct);
        
      }

      const validatedOrder = await orderValidation.validate({
        grandTotal: grandTotal,
        createdBy: createdBy,
        orderItems: itemArray,
        status: status,
      });

      const newOrder = await OrdersModel.create([validatedOrder], { session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        data: newOrder,
        message: "Success create order"
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      if (error instanceof Yup.ValidationError) {
        res.status(400).json({
          data: error.errors,
          message: "Failed create order",
        });
        return;
      }

      const err = error as Error;

      res.status(500).json({
        message: "Failed create order",
        detail: err.message,
      });
    }
  },

  async findAll(req: Request, res: Response) {
    try {
      const {
        limit = 10,
        page = 1,
        search = "",
      } = req.query as unknown as IPaginationQuery;

      const query = {};

      if (search) {
        Object.assign(query, {
          $text: { $search: search },
        });
      }

      const result = await OrdersModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .populate('orderItems.productId')
        .populate('createdBy');

      const total = await OrdersModel.countDocuments(query);

      res.status(200).json({
        data: result,
        message: "Success get all orders",
        page: +page,
        limit: +limit,
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get all orders",
      });
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const result = await OrdersModel.findById(req.params.id)
        .populate('orderItems.productId')  
        .populate('createdBy');

      if (!result) {
        return res.status(404).json({
          data: null,
          message: "Order not found",
        });
      }

      res.status(200).json({
        data: result,
        message: "Success get one order",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed get one order",
      });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const result = await OrdersModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      .populate('orderItems.productId')
      .populate('createdBy');

      if (!result) {
        return res.status(404).json({
          data: null,
          message: "Order not found",
        });
      }

      res.status(200).json({
        data: result,
        message: "Success update order",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed update order",
      });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await OrdersModel.findByIdAndDelete(req.params.id);

      if (!result) {
        return res.status(404).json({
          data: null,
          message: "Order not found",
        });
      }

      res.status(200).json({
        data: result,
        message: "Success delete order",
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({
        data: err.message,
        message: "Failed delete order",
      });
    }
  },
};
