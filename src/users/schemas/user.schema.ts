import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
  },
})
export class User {


  @Prop({ })
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;


  @Prop({default:'user'})
  roles: string;

}

export const user_schema = SchemaFactory.createForClass(User);
