import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  //mongoose default timestamps for date
  {
    timestamps: true,
  },
)

// mongoose pre save middleware/hook: will work on create()/save()
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this // doc
  // hashing password and save in to DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// mongoose post save middleware/hook
userSchema.post('save', async function (doc, next) {
  // console.log('post: after the save data ', doc)
  doc.password = ''
  next()
})

export const UserModel = model<IUser>('User', userSchema)
