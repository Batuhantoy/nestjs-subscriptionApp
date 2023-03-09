import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { Service } from './service.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, addressSchema, subscriptionSchema, orderSchema } from './service.model';
@Module({
    imports: [MongooseModule.forFeature([
        {name:'user', schema:userSchema},
        {name:'address', schema:addressSchema},
        {name:'subscription', schema:subscriptionSchema},
        {name:'order', schema:orderSchema}
    ])],
    controllers:[ServiceController],
    providers:[Service],
})
export class ServiceModule{}