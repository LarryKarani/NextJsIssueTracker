import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { error } from "console";
 export async function PATCH(
  request: NextRequest, 
  {params}: {params: {id: string}}) {

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const issue = await prisma.issue.findUnique({
      where: {id: parseInt(params.id)},
    });

    if (!issue) {
      return NextResponse.json({error: "Issue not found"}, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: {id: parseInt(params.id)},
      data: body,
    });

    return NextResponse.json(updatedIssue, {status: 200});

 }