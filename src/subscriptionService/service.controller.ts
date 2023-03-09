import { Controller, Post, Body } from "@nestjs/common";
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
}