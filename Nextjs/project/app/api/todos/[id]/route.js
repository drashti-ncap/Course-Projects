import { NextResponse } from "next/server";
import Todo from "@/src/models/Todo";
import connectDB from "@/src/utils/dbConnect";

// Get single todo
export async function GET(request, { params }) {
  await connectDB();

  const { id } = await params;

  const todo = await Todo.findById(id);

  return NextResponse.json(todo);
}

// Delete todo
export async function DELETE(request, { params }) {
  await connectDB();

  const { id } = await params;

  await Todo.findByIdAndDelete(id);

  return NextResponse.json({
    message: "Todo Deleted",
  });
}

// Update todo
export async function PUT(request, { params }) {
  await connectDB();

  const { id } = await params;

  const data = await request.json();

  const todo = await Todo.findByIdAndUpdate(id, data, {
    new: true,
  });

  return NextResponse.json(todo);
}