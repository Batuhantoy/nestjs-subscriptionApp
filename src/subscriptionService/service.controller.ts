import { Controller, Post, Body, Get, Param, Patch, Delete, Put } from "@nestjs/common";
import { Service } from "./service.service";

@Controller('subscription')
export class ServiceController {
    constructor(private Service: Service){

    }
    
    @Post()
    async addUser(
        @Body('name') name:string,
        @Body('surname') surname:string,
        @Body('email') email:string,
        @Body('phone') phone:string,
        @Body('city') city:string,
        @Body('district') district:string,
        @Body('street') street:string,
    ){
        await this.Service.insertUser(name,surname,email,phone,city,district,street);
    }

    @Get()
    async getUsers(){
        const users= await this.Service.getUsers();
        return users;
    }


    @Put()
    async makeOrder(
        @Body('date') date:Date,
    ){
        await this.Service.makeOrder(date);
    }

    @Get(':id')
    async getUser(@Param('id') userId: string){
        return await this.Service.getSingleUser(userId);
    }

    @Patch(':id')
    async extendSubscription(@Param('id') userId: string){
        return await this.Service.extendSubscription(userId);
    }

    @Delete(':id')
    async cancelSubscription(@Param('id') userId: string){
        return await this.Service.cancelSubscription(userId);
    }

}