import { NextResponse } from "next/server";
import { Exp } from "@/models/Expense";

export async function DELETE(request, { params }) {
  const { expId } = params;

  try {
    const user = await Exp.findOneAndDelete(expId);
    console.log("Expense deleted successfully");
  } catch (error) {
    return NextResponse.json({ message: "Expense could not be deleted" });
  }
  return NextResponse.json({ message: "Expense deleted successfully" });
}

export async function PUT(request , params){
    const { expId } = params;
    const { description, amount, category } = await request.json();
    try {
        const user = await Exp.findOneAndUpdate(expId, { description, amount, category });
        console.log("Expense updated successfully");
    }   
    catch (error) {
        return NextResponse.json({ message: "Expense could not be updated" });
    }
    return NextResponse.json({ message: "Expense updated successfully" });
}
