import mongoose from "mongoose";
import {Password} from "../services/password";


// An interface that describes the properties that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Document has (a single user)
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

// An interface that describes the properties that a User Model has (functions)
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

},
{ toJSON: {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
    delete ret.__v;
  }
}}
);

// we add done as mongoose doesn't have proper support for async await
// Using an error function, the value of this will be referring to the context of the entire file
userSchema.pre('save', async function (done){

  // this here refers to an instance of the mongoose model
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  };
  // to mark the completion of our async work
  done();
})

// How we add a function to a mongoose model
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// The generics <> symbol indicates the type will be returned by a function. The first is the type being used inside and the second is the type being returned
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);



export { User };
