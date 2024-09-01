import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from '@/prisma/client';
import { issueSchema } from '@/app/validationSchema';


export async function POST(request: NextRequest) {
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