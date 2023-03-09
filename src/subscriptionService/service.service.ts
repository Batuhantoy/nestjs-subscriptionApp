import { Injectable, NotFoundException } from "@nestjs/common";
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
        const amount =60;
        const addressId:string=name[1]+surname[2]+phone[6]+city[2]+district[2];
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
        const startDate = new Date();
        const endDate= new Date();
        endDate.setMonth(startDate.getMonth()+1);
        //console.log(startDate.toLocaleDateString()+"---"+endDate.toLocaleDateString());
        const newSubscription = new this.subscriptionModel({
            addressId:addressId,
            startDate:startDate.toLocaleDateString().toString(),
            endDate:endDate.toLocaleDateString().toString(),
            isActive:true,            
        });
        await newSubscription.save();
        const newOrder = new this.orderModel({
            userId:result.id,
            addressId:addressId,
            amount:amount,        
        });
        await newOrder.save();
    }

    async getUsers(){
        const users = await this.userModel.find().exec();
        const addresses = await this.addressModel.find().exec();
        const subscriptions = await this.subscriptionModel.find().exec();

        const usersArray= [];
        for(let i=0;i<users.length&&addresses.length; i++){
            usersArray.push(
                {
                id:users[i].id,
                name:users[i].name,
                surname:users[i].surname,
                email:users[i].email,
                phone:users[i].phone,
                city:addresses[i].city,
                district:addresses[i].district,
                street:addresses[i].street,
                startDate:subscriptions[i].startDate.toDateString(),
                endDate:subscriptions[i].endDate.toDateString(),
                isActive:subscriptions[i].isActive
            })
        }
        return usersArray;
    }

    async getSingleUser(userId:string){
        const user= await this.getUser(userId);
        return user;
    }
    async getUser(id:string){
        //let user;
        try{
            const user = await this.userModel.findById(id);
            const addresses = await this.addressModel.findOne({addressId:user.addressId});
            const subscriptions = await this.subscriptionModel.findOne({addressId:user.addressId});
            if(!user){
                throw new NotFoundException('Böyle bir kullanıcı yok!!!');
            }

            return {id:user.id,
                name:user.name,
                surname:user.surname,
                email:user.email,
                phone:user.phone,
                addressId:user.addressId,
                city:addresses.city,
                district:addresses.district,
                street:addresses.street,
                startDate:subscriptions.startDate.toDateString(),
                endDate:subscriptions.endDate.toDateString(),
                isActive:subscriptions.isActive};
        }catch(err){
            throw new NotFoundException('Böyle bir kullanıcı yok!!!');
        }
        
    }
    async cancelSubscription(userId:string){
        try{
            const user = await this.getUser(userId);
            const userSubscription = await this.subscriptionModel.findOne({addressId:user.addressId});
            userSubscription.isActive=false;            
        }catch(err){
            throw new NotFoundException('Böyle bir kullanıcı yok!!!');
        }
    }
    async extendSubscription(userId:string){
        try{
            const user = await this.userModel.findById(userId);
            const userSubscription = await this.subscriptionModel.findOne({addressId:user.addressId});
            //ödeme olsaydı ödeme onaylandımı diye bekleyip ondan sonra üyelik tarihlerini güncellerdik
            const newOrder = new this.orderModel({
                userId:user.id,
                addressId:user.addressId,
                amount:60,        
            });
            await newOrder.save();
            const date=new Date();
            
            userSubscription.startDate.setDate(date.getDate());
            userSubscription.startDate.setMonth(date.getMonth());
            userSubscription.startDate.setFullYear(date.getFullYear());
            
            userSubscription.endDate.setDate(date.getDate());
            userSubscription.endDate.setMonth(date.getMonth()+1);
            userSubscription.endDate.setFullYear(date.getFullYear());
            userSubscription.isActive=true;
            userSubscription.save();

        }catch(err){
            throw new NotFoundException('Böyle bir kullanıcı yok!!!');
        }

    }
    async makeOrder(date:Date){
        const Subscriptions = await this.subscriptionModel.find({endDate:date});

        Subscriptions.forEach(async sub => {
            const user = await this.userModel.findOne({addressId:sub.addressId});
            const newOrder = new this.orderModel({
                userId:user.id,
                addressId:user.addressId,
                amount:60,
            });
            newOrder.save();
        });
    }

}