import { Injectable } from "@nestjs/common";
import { } from './service.model';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { USER, ADDRESS, SUBSCRİPTİON, ORDER } from "./service.model";

@Injectable()
export class Service{

    constructor(
        @InjectModel('user') private userModel: Model<USER>,
        @InjectModel('address') private addressModel: Model<ADDRESS>,
        @InjectModel('subscription') private subscriptionModel: Model<SUBSCRİPTİON>,
        @InjectModel('order') private orderModel: Model<ORDER>
        ){}

    async insertUser(name:string,surname:string,email:string,phone:string,city:string,district:string,street:string){
        const addressId:string=phone[4]+city[4]+district[3];
        const amount =60;

        const newUser = new this.userModel({
            name:name,
            surname:surname,
            email:email,
            phone:phone,
            addressId:addressId,
        });
        const result = await newUser.save();//result.id

        const newAddress = new this.addressModel({
            addressId:addressId,
            city:city,
            district:district,
            street:street,            
        });
        newAddress.save();
        const now = new Date();
        const newSubscription = new this.subscriptionModel({
            addressId:addressId,
            startDate:now.toLocaleDateString(),
            endDate:now.setMonth(now.getMonth()+1),
            isActive:true,            
        });
        await newSubscription.save();
        const newOrder = new this.orderModel({
            userId:result.id,
            addressId:addressId,
            amount:amount,        
        });
        await newOrder.save();
        console.log("OLDUUUU");
    }
}