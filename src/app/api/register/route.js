import { connectMongoDB } from "../../../../lib/mongodb";
import users from "../../../../models/user";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export async function POST(req) {
    console.log(req)
    try {
      const data = await req.json();
      const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds
      
      // Replace the plain text password with the hashed password
      data.password = hashedPassword;
      console.log(data.password);
      // Insert new user data into the database
      const user = await users.create(data);
  
    
  
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }