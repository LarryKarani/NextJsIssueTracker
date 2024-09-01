import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@/prisma/client';
import { issueSchema } from '@/app/validationSchema';
import { getServerSession } from "next-auth";
import autOptions from "@/app/auth/authOptions";


export async function POST(request: NextRequest) {
  const session = await  getServerSession(autOptions);

  if (!session) {
    return new Response(JSON.stringify({error: 'Unauthorized'}), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return new Response(JSON.stringify(validation.error.format()), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  } 

  const newIssue =  await prisma.issue.create({
    data: {title: body.title, description: body.description}
  });


  return NextResponse.json(newIssue, {status: 201});

}