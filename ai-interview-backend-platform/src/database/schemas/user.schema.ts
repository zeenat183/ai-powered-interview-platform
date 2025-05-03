import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';//uuidv4 is used to generate userId (install it via npm i uuid).

export type UserDocument = User & Document;

@Schema({ timestamps: true })//@Schema({ timestamps: true }) automatically adds createdAt and updatedAt.
export class User {
  @Prop({ unique: true, default: uuidv4 })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  password: string;  

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: 'user' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);