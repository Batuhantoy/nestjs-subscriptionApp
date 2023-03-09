import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    addressId: { type: String, required: true },
});

export const addressSchema = new mongoose.Schema({
    addressId: {type:String, required:true},
    city:{type:String, required:true},
    district:{type:String, required:true},
    street:{type:String, required:true},
});

export const subscriptionSchema = new mongoose.Schema({
    addressId:{type:String, required:true},
    startDate: {type:Date, required:true},
    endDate:{type:Date, required:true},
    isActive:{type:Boolean, required:true},
});

export const orderSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    addressId:{type:String, required:true},
    amount:{type:Number, required:true},
});
//extends mongoose.Document
export interface USER{
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    addressId:string;   
}
export interface ADDRESS{
    addressId: string;
    city: string;
    district: string;
    street: string;
}
export interface SUBSCRİPTİON{
    addressId: string;
    startDate: Date;
    endDate: Date;
    isActive:boolean;
}
export interface ORDER{
    userId: string;
    amount: number;
    addressId:string;   
}