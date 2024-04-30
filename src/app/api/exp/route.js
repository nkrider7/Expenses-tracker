import { NextResponse } from "next/server";
import dbConnect from "@/helper/db.js";

import { Exp } from "@/models/Expense";

// taking input from the user and sending it to the server
export async function POST(request) {
  const conn = await dbConnect();
  console.log(`MongoDB Connected:`);

  const { description, amount, category } = await request.json();
  try {
    const user = await new Exp({ description, amount, category });
    let data = await user.save();
    console.log("Expense added successfully", data);
  } catch (error) {
    return NextResponse.json({ message: "Expense could not be added" });
  }
  return NextResponse.json(
    { message: "Expense added successfully" },
    { status: 201 }
  );
}

// get all Expenses
export async function GET(request) {
  let exps = [];
  const conn = await dbConnect();
  console.log(`MongoDB Connected:`);
  try {
    exps = await Exp.find();
    console.log("Expenses fetched successfully");
  } catch (error) {
    return NextResponse.json({ message: "Expenses could not be fetched" });
  }
  return NextResponse.json(exps);
}

export async function PUT(request) {
  const conn = await dbConnect();
  console.log(`MongoDB Connected:`);
  const { description, amount, category } = await request.json();
  try {
    const user = await Exp.findOneAndUpdate({ description, amount, category });
    console.log("Expense updated successfully");
  } catch (error) {
    return NextResponse.json({ message: "Expense could not be updated" });
  }
  return NextResponse.json({ message: "Expense updated successfully" });
}
