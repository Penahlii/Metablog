import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Blog deleted successfully" });
}
